import whatsappPKG from 'whatsapp-web.js'
import qrCode from 'qrcode-terminal'
import mongoose from 'mongoose'
import { MongoStore } from 'wwebjs-mongo'

const { Client, RemoteAuth } = whatsappPKG


mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO)
    .then(async () => {
        const store = new MongoStore({ mongoose: mongoose });

        const client = new Client({
            authStrategy: new RemoteAuth({
                clientId: 'cuchoBot',
                store: store,
                backupSyncIntervalMs: 1800000
            }),
            puppeteer: {
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
        });
        
        const session = await store.sessionExists({session: 'cuchoBot'})

        if(session){
            console.log('✔️ sesion encontrada...')
        }else{
            console.log('🚀 Iniciando CuchoBot 🤖')     
            client.on('qr',(qr) => {
                console.log('🔄 Generando QR')
                setTimeout(() => {
                    qrCode.generate(qr,{small: true})
                }, 4000);
            })
        }
        

        client.on('remote_session_saved',() => {
            console.log('session guardada con exito ✅')
            console.log('CuchoBot Listo 🤖')
        })

        // client.on('ready',() => {
        //     console.log('CuchoBot Listo 🤖')
        // })
        
        client.on('disconnected',async (state) =>{
            console.log('❌ Usuario cerro sesion')
            if(state === 'LOGOUT'){
                await mongoose.connection.db.collection('RemoteAuth').deleteMany({});
                await store.delete({session: 'cuchoBot'})
                console.log('✔️ Sesion eliminada')
                setTimeout(() => {
                    console.log('🔄 Esperando nueva autenticación...')
                }, 2000);
                // client.logout()
            }
        })
        

        client.initialize()

    })
    .catch((error) => console.log(error))
