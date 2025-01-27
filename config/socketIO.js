import { Server } from 'socket.io';
import client from './whatsapp.js';
import mongoose from 'mongoose';



const setupSocket = (server) => {
    
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", async (socket) => {
        console.log("Usuario conectado:", socket.id);

        socket.on("disconnect", () => {
            console.log("Usuario desconectado:", socket.id);
        });


        const sessionExists = async () => {
            try {
                if (mongoose.connection.readyState !== 1) {  
                    console.log("⏳ Esperando conexión a MongoDB...");
                    await mongoose.connection.asPromise();  // 🔹 Esperar conexión
                }
        
                const db = mongoose.connection.db;
                if (!db) {
                    console.error("❌ Error: La conexión con MongoDB no está disponible.");
                    return false;
                }
        
                const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'whatsapp-RemoteAuth-cuchoBot' });
                const cursor = bucket.find({ filename: 'RemoteAuth-cuchoBot.zip' });
                const files = await cursor.toArray();
        
                return files.length > 0;
            } catch (error) {
                console.error("❌ Error verificando sesión:", error);
                return false;
            }
        };

        if (await sessionExists()) {
            console.log("✔️ Sesión encontrada...");
        } else {
            console.log("🚀 Iniciando CuchoBot 🤖");
            socket.on('generateQr', () => {
                client.on('qr', (qr) => {
                    io.emit('qrCode', qr);
                });
            });
        }        

    });

    client.on('ready',() => {
        io.emit('autenticando',{state: true})
    })

    client.on('remote_session_saved',() => {
        console.log('session guardada con exito ✅')
        console.log('CuchoBot Listo 🤖')
        io.emit('autenticado',{state: true})
    })

    
};


export default setupSocket;
