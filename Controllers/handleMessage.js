
const delay = (ms) => new Promise( res => setTimeout(res,ms))

const handleMessage = async (message,client) => {

    const chat = await message.getChat()
    const contact = await message.getContact()
    const name = contact.pushname
    const clientMessage = message.body.trim().toLowerCase()

    if(message.from.endsWith('@c.us')){
        if (/^(hola|buenas|informacion)$/i.test(clientMessage)){
            await delay(400)
            await chat.sendStateTyping()
            await client.sendMessage(message.from,`Hola ${name} bienvenido a multidestinos, soy CuchoBot 🤖 tu asistente virtual `)
        }
    
    }

    
}

export default handleMessage