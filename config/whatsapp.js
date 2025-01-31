import whatsappPKG from 'whatsapp-web.js'
import mongoose from 'mongoose'
import { MongoStore } from 'wwebjs-mongo'
import Descripcion from '../models/Descripcion.js'
import Fechas from '../models/Fechas.js'


const { Client, RemoteAuth } = whatsappPKG


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


mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO)
    .then(async () => {
        
        
        client.on('disconnected',async (state) =>{
            console.log('❌ Usuario cerro sesion')
            if(state === 'LOGOUT'){
                await store.delete({session: 'cuchoBot'})
                console.log('✔️ Sesion eliminada')
                setTimeout(() => {
                    console.log('🔄 Esperando nueva autenticación...')
                }, 2000);
            }
        })
        
        
        client.on('message', async(mssg) => {

            
            if(mssg.from.endsWith('@c.us')){
                const delay = ms => new Promise(res => setTimeout(res,ms))
                const contact = await mssg.getContact()
                const name = contact.pushname
                const chat = await mssg.getChat()
                const descripcion = await Descripcion.findOne()
                const fechas = await Fechas.findOne()

                if(new RegExp(descripcion?.destino, 'i').test(mssg.body)){
                    await delay(400)
                    await chat.sendStateTyping()
                    await delay(400)
                    await client.sendMessage(mssg.from,`hola ${name} bienvenid@ a multidestinos!!! \n ${descripcion?.descripcion}`)
                }

                if(mssg.body === '1'){
                    await delay(400)
                    await chat.sendStateTyping()
                    await delay(400)
                    await client.sendMessage(mssg.from, fechas?.fechas)
                }
            }
        })


        client.initialize()
        
    })
    .catch((error) => console.log(error))
    
    

export default client

    
    