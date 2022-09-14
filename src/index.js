/**
 * Após clicar no ficheiro start.vbs,
 * irá ser iniciado um Processo no seu computador
 * (assim como se inicia-se um Programa qualquer).
 */

const config = require('../src/config.json')
const discordRPC = require('discord-rpc')
let clientId = config.rpcId;

const rpc = new discordRPC.Client({ transport: 'ipc' });
discordRPC.register(clientId);

async function activity() {
    if(!rpc) return;
    rpc.setActivity({
        details: config.detailsTxt,
        state: config.stateTxt,
        startTimestamp: Date.now(),
        /**
         * Para desativar o Tempo, basta substituir Date.now() por 0 
         */
        largeImageKey: config.largeImageKey,
        largeImageText: config.largeImageText,
        smallImageKey: config.smallImageKey,
        smallImageText: config.smallImageText,
        instance: false,
        buttons: [
            {
                label: `📷 Instagram`,
                url: `https://instagram.com/robertoo.valente`,
            },
            {
                label: `🤩 Crie o seu Custom-RPC`,
                url: `https://github.com/RobertoValente/Discord-RPC`,
            }
        ]
    })
}

rpc.on('ready', async () => {
    console.log(`✅ DiscordRPC iniciado no Id: ${clientId}!`)
    activity();

    setInterval(() => {
        activity();
    }, 15*1000);
});

rpc.login({ clientId }).catch(err => console.log(err));