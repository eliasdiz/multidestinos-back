import whatsappCliente from "../config/whatsapp.js";



const controller = {
    
    sendMessage: async (req,res,next) => {
        const {to,message} = req.body
        
        try {
            await whatsappCliente.sendMessage(to,message)
            return res
            .status(200)
            .json({ 
                success: true,
                message: 'mensaje enviado'
            })
        } catch (error) {
            next(error)
        }
    },
    
    handleTextMessage: async (msg) => {
        const body = msg.body.toLowerCase();
    
        if (body === 'hola') {
            return '¡Hola! Soy el CuchoBot, ¿en qué puedo ayudarte?';
        } else if (body === 'test1') {
            return 'Probando respuestas automáticas. ¡Todo está funcionando correctamente!';
        } else {
            return 'Lo siento, no entendí tu mensaje. Prueba con "hola" o "test1".';
        }
    },
}

export default controller