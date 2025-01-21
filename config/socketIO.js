// import { Server } from 'socket.io';


// const setupSocket = (server) => {
    
//     const io = new Server(server, {
//         cors: {
//             origin: "*",
//             methods: ["GET", "POST"]
//         }
//     });

//     io.on("connection", (socket) => {
//         console.log("Usuario conectado:", socket.id);

//         socket.on("disconnect", () => {
//             console.log("Usuario desconectado:", socket.id);
//         });

//         socket.on('generateQr',() =>{
//             // console.log('generando codigo qr')
//             client.once('qr',(qr) => io.emit('qrCode',qr))
//         })

//     });



// };


// export default setupSocket;
