import { Server } from 'socket.io';
import client from './whatsapp.js';


const setupSocket = (server) => {
    
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("Usuario conectado:", socket.id);

        socket.on("disconnect", () => {
            console.log("Usuario desconectado:", socket.id);
        });

        socket.on('generateQr', () => {
            client.on('qr',(qr) => {
                // console.log(qr)
                io.emit('qrCode',qr)
            })
        })

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
