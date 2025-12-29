const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    }
});

client.on('qr', qr => {
    console.log('📱 Escaneie o QR Code:');
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('✅ Bot de TESTE conectado!');
    console.log('🔍 Aguardando mensagens...');
});

client.on('message', async msg => {
    console.log('📨 MENSAGEM RECEBIDA:');
    console.log('- Texto:', msg.body);
    console.log('- De:', msg.from);
    console.log('- Tipo:', msg.type);
    console.log('- É grupo?', msg.from.includes('@g.us'));
    console.log('---');

    // Responde apenas a mensagens de contatos individuais
    if (msg.from.endsWith('@c.us') && msg.body) {
        const input = msg.body.toLowerCase().trim();
        
        if (input.includes('oi') || input.includes('olá') || input.includes('menu')) {
            const response = `🤖 *Bot funcionando!*\n\nVocê disse: "${msg.body}"\n\nComandos disponíveis:\n• oi/olá/menu - Este menu\n• teste - Mensagem de teste\n• produtos - Lista produtos`;
            
            console.log('📤 ENVIANDO RESPOSTA:', response);
            await msg.reply(response);
        }
        else if (input.includes('teste')) {
            await msg.reply('✅ Teste realizado com sucesso!');
        }
        else if (input.includes('produtos')) {
            await msg.reply('🛍️ *Produtos:*\n\n📦 Produto A - R$ 99,90\n📦 Produto B - R$ 199,90');
        }
    }
});

client.initialize();

console.log('🚀 Iniciando bot de teste...');