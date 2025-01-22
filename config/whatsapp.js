import whatsappPKG from 'whatsapp-web.js'
import mongoose from 'mongoose'
import { MongoStore } from 'wwebjs-mongo'



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
                await mongoose.connection.db.collection('RemoteAuth').deleteMany({});
                await store.delete({session: 'cuchoBot'})
                console.log('✔️ Sesion eliminada')
                setTimeout(() => {
                    console.log('🔄 Esperando nueva autenticación...')
                }, 2000);
            }
        })
        
        client.initialize()
        
    })
    .catch((error) => console.log(error))
    
    

export default client

    
    