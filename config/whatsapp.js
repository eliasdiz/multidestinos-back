import pkg from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'
// import controller from '../Controllers/Chatbot.js'


// const { handleTextMessage } = controller
const { Client, LocalAuth} = pkg

const whatsappCliente = new Client({
    authStrategy: new LocalAuth({
        clientId: 'multidesnitos-session'
    })
})


whatsappCliente.on('qr',(qr) => {
    console.log('Escanea el codigo para conectarte')
    qrcode.generate(qr, {small: true})
})

whatsappCliente.on('ready',() => {
    try {
        console.log('CuchoBot esta listo!!!')
    } catch (error) {
        console.log(error)
    }
})

whatsappCliente.on('authenticated',() => {
    try {
        console.log('CuchoBot autenticado')
    } catch (error) {
        console.log(error)
    }
})

whatsappCliente.on('auth_failure',() => {
    console.error('error de autenticacion')
})

whatsappCliente.on('disconnected',(reason) => {
    console.log('CuchoBot desconectado', reason)
    console.log('Reconectando...')
    whatsappCliente.initialize()
})

whatsappCliente.on('message', async (msg) => {
    try {
        console.log(`Mensaje recibido de ${msg.from}: ${msg.body}`);

        const respuesta = await handleIncomingMessage(msg);

        if (respuesta) {
            await msg.reply(respuesta);
        }
    } catch (error) {
        console.log('Error al procesar el mensaje:', error);
    }
});

async function handleIncomingMessage(msg) {
    const body = msg.body.toLowerCase();
    
    if (body === 'hola') {
        return '¡Hola! Soy el CuchoBot, ¿en qué puedo ayudarte?';
    } else if (body === 'test1') {
        return 'Probando respuestas automáticas. ¡Todo está funcionando correctamente!';
    } else {
        return 'Lo siento, no entendí tu mensaje. Prueba con "hola" o "test1".';
    }
}


export default whatsappCliente