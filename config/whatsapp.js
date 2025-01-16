import pkg from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal';
import handleMessage from '../Controllers/handleMessage.js';


const { Client, LocalAuth } = pkg


const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'multidestinos-session'
    })
})    


client.on('qr', (qr) => {
    console.log('Escanea el codigo para conectarte')
    qrcode.generate(qr, { small: true });
});

client.on('authenticated',() => {
    console.log('CuchoBot autenticado')
})

client.on('ready', () => {
console.log('CuchoBot conectado y listo!!!');
});

client.on('disconnected', (reason) => {
    console.log('CuchoBot se desconectó:', reason);
    if (reason === 'UNPAIRED' || reason === 'UNPAIRED_IDLE') {
        console.log('Parece que se cerró la sesión en el dispositivo móvil.');
    } else {
        console.log('Intentando reconectar...');
        client.initialize();
    }
});

// Monitorear cambios de estado
client.on('change_state', (state) => {
    console.log('Estado de conexión:', state);
    if (state === 'DISCONNECTED') {
        console.log('CuchoBot está desconectado. Verifica si el dispositivo móvil tiene conexión a internet o está encendido.');
    }else if(state === 'CONNECTED'){
        console.log('CuchoBot conectado y listo!!!');
    }
});



client.on('message', (message) => handleMessage(message,client) )

client.initialize();

export default client;
