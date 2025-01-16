import openai from "../config/openai.js"

const delay = (ms) => new Promise( res => setTimeout(res,ms))

const handleMessage = async (message,client) => {

    const chat = await message.getChat()
    const contact = await message.getContact()
    const name = contact.pushname
    const clientMessage = message.body.trim()

    if(message.from.endsWith('@c.us')){
        
        
        if (/^(hola|buenas|informacion)$/i.test(clientMessage)){
            await delay(400)
            await chat.sendStateTyping()
            await client.sendMessage(message.from,`Hola ${name} bienvenido a multidestinos, escoge un numero para ser atentito por CuchoBot 🤖 `)
        }else {
            await delay(400);
            await chat.sendStateTyping();

            // let prompt = clientMessage
            // Generar respuesta con OpenAI
            try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{role: 'user', content: clientMessage }],
                max_tokens: 150,
                temperature: 0.7,
            });

            const botResponse = response.data.choices[0].text.trim();

            await client.sendMessage(message.from, botResponse);
            } catch (error) {
                console.log(error)
            console.error('Error al interactuar con OpenAI:', error.message);
            await client.sendMessage(
                message.from,
                'Lo siento, hubo un problema al procesar tu solicitud. Intenta de nuevo más tarde.'
            );
            }
        }
    }

    
}

export default handleMessage