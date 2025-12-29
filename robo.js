const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Cliente com configurações de segurança aprimoradas
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

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

// Função para validar entrada de forma segura
function validateInput(input) {
    if (!input || typeof input !== 'string') return false;
    if (input.length > 1000) return false; // Limite de tamanho
    // Remove caracteres potencialmente perigosos
    const sanitized = input.replace(/[<>"'&]/g, '');
    return sanitized.toLowerCase().trim();
}

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
        // Validação rigorosa de entrada
        if (!msg.body || typeof msg.body !== 'string') return;
        if (!msg.from.endsWith('@c.us')) return;
        
        const userInput = validateInput(msg.body);
        if (!userInput) return; // Input inválido
        
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
        // Log completo do erro para debugging
        console.error('Erro ao processar mensagem:', error);
        console.error('Stack trace:', error.stack);
    }
});