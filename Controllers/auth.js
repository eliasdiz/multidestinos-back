// import SessionAuth from "../models/SessionAuth.js";

// const controller = {

//     saveSession: async (clientId,session) => {
//         try {
//             const existingSession = await SessionAuth.findOne({ clientId });
//             if (existingSession) {
//                 // Si ya existe la sesión, la actualizamos
//                 existingSession.sessionData = session;
//                 await existingSession.save();
//             } else {
//                 // Si no existe, creamos una nueva
//                 const newSession = new SessionAuth({
//                     clientId,
//                     sessionData: session,
//                 });
//                 await newSession.save();
//             }
//             console.log('Sesión guardada con éxito');
//         } catch (error) {
//             console.error('Error al guardar la sesión:', error);
//         }
//     },

//     retrieveSession: async (sessionName) => {
//         try {
//             // Buscamos la sesión en la base de datos
//             const session = await SessionAuth.findOne({ clientId: sessionName });
    
//             // Si encontramos la sesión, la devolvemos directamente, de lo contrario, devolvemos null
//             if (session) {
//                 return session.sessionData;  // Asegúrate de devolver solo los datos de la sesión
//             } else {
//                 return null;  // Si no hay sesión, devolvemos null
//             }
//         } catch (error) {
//             console.log('❌ Error al recuperar la sesión:', error);
//             return null;
//         }
//     }
// }

// export default controller