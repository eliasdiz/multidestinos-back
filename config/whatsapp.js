import pkg from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'

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

export default whatsappCliente