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
            await client.sendMessage(message.from,`Hola ${name} bienvenido a multidestinos, escoge un numero para ser atentito por uno de nuestros asesores:\n 1. FlaquiFley \n 2. CuchoBot 🤖 \n 3. Brandi  `)
            
        }
        await delay(400)
        if(clientMessage === '1'){
            await chat.sendStateTyping()
            await client.sendMessage(message.from,`Hola soy FlaquiFley tu asistente virtual en que te puedo ayudar el dia de hoy?`)
        }else if(clientMessage === '2'){
            await chat.sendStateTyping()
            await client.sendMessage(message.from,`Hola soy CuchoBot 🤖 tu asistente virtual en que te puedo ayudar el dia de hoy?`)
        }else if(clientMessage === '3'){
            await chat.sendStateTyping()
            await client.sendMessage(message.from,`Hola soy Brandi 🥚 to to te... tu asistente virtual en que te puedo ayudar el dia de hoy?`)
        }      
    }

    
}

export default handleMessage