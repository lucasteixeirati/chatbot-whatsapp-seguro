const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('WhatsApp conectado.✅');
});

client.initialize();

const delay = ms => new Promise(res => setTimeout(res, ms));

// Sistema de respostas do chatbot
const responses = {
    greetings: {
        keywords: ['oi', 'olá', 'ola', 'menu'],
        response: (name) => `Olá! ${name} 👋 Como posso ajudar você hoje?`
    },
    timeGreetings: {
        keywords: ['dia', 'tarde', 'noite'],
        response: (name) => `Olá! ${name} 👋 Como posso ajudar você hoje?`
    },
    yasmim: {
        keywords: ['quem é yasmim', 'yasmim', 'quem e yasmim'],
        response: () => 'Yasmim é o amor da minha vida! S2 💕'
    }
};

// Função para obter nome do contato de forma segura
function getContactName(contact) {
    if (contact.pushname && typeof contact.pushname === 'string') {
        return contact.pushname.trim().split(' ')[0] || 'usuário';
    }
    return 'usuário';
}

// Função para encontrar resposta apropriada
function findResponse(userInput) {
    for (const [key, responseData] of Object.entries(responses)) {
        const hasKeyword = responseData.keywords.some(keyword => 
            userInput.includes(keyword.toLowerCase())
        );
        if (hasKeyword) {
            return responseData;
        }
    }
    return null;
}

client.on('message', async msg => {
    try {
        // Validação de entrada - previne injeção de código
        if (!msg.body || typeof msg.body !== 'string') return;
        if (!msg.from.endsWith('@c.us')) return;
        
        const userInput = msg.body.toLowerCase().trim();
        
        // Busca resposta apropriada
        const responseData = findResponse(userInput);
        
        if (responseData) {
            const chat = await msg.getChat();
            
            await delay(2000);
            await chat.sendStateTyping();
            await delay(2000);
            
            const contact = await msg.getContact();
            const name = getContactName(contact);
            
            const message = responseData.response(name);
            await client.sendMessage(msg.from, message);
        }
    } catch (error) {
        console.error('Erro ao processar mensagem:', error.message);
    }
});