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
                backupSyncIntervalMs: 60000
            })
        });

        // console.log(mongoose.connection.readyState)
        
        const generateQR = client.on('qr',(qr) => {
            console.log('🔄 Generando QR')
            setTimeout(() => {
                qrCode.generate(qr,{small: true})
            }, 4000);
        })

        const session = await store.sessionExists({session: 'cuchoBot'})

        if(session){
            console.log('✔️ sesion encontrada...')
        }else{
            console.log('🚀 Iniciando CuchoBot 🤖')
            generateQR
        }
        

        client.on('remote_session_saved',() => {
            console.log('session guardada con exito ✅')
            console.log('CuchoBot Listo 🤖')
        })

        client.on('ready',() => {
            console.log('CuchoBot Listo 🤖')
        })
        
        client.on('disconnected',async (state) =>{
            console.log('❌ Usuario cerro sesion')
            if(state === 'LOGOUT'){
                await store.delete({session: 'cuchoBot'})
                console.log('✔️ Sesion eliminada')
                console.log('🔄 Esperando nueva autenticación...')
                // client.logout()
                // generateQR
            }
        })
        

        client.initialize()

    })
    .catch((error) => console.log(error))
