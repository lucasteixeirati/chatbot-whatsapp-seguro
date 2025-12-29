const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

// Sistema de leads simplificado
const leads = new Map();
const analytics = {
    totalMessages: 0,
    totalLeads: 0,
    conversions: 0
};

// Casos de profissionais para demonstração
const professionalCases = {
    dentista: {
        name: 'Dr. Carlos Silva',
        specialty: 'Odontologia',
        crm: 'CRO-SP 12345',
        phone: '(11) 99999-1234',
        email: 'contato@drcarlossilva.com.br',
        address: 'Rua das Flores, 123 - Vila Madalena, São Paulo',
        services: [
            { name: 'Limpeza Dental', price: 120.00 },
            { name: 'Clareamento', price: 450.00 },
            { name: 'Implante Dentário', price: 2500.00 },
            { name: 'Aparelho Ortodôntico', price: 180.00 }
        ],
        schedule: 'Segunda a Sexta: 8h às 18h | Sábado: 8h às 12h',
        banner: `🦷 *Dr. Carlos Silva - Odontologia*\n\n👨‍⚕️ CRO-SP 12345\n📍 Vila Madalena - São Paulo\n⭐ 15 anos de experiência\n\n🔹 Especialista em Implantes\n🔹 Ortodontia Moderna\n🔹 Clareamento a Laser\n🔹 Atendimento Humanizado`
    },
    medico: {
        name: 'Dra. Ana Costa',
        specialty: 'Clínica Geral',
        crm: 'CRM-SP 67890',
        phone: '(11) 99999-5678',
        email: 'dra.ana@clinicacosta.com.br',
        address: 'Av. Paulista, 456 - Bela Vista, São Paulo',
        services: [
            { name: 'Consulta Geral', price: 200.00 },
            { name: 'Check-up Completo', price: 350.00 },
            { name: 'Exames Laboratoriais', price: 150.00 },
            { name: 'Telemedicina', price: 120.00 }
        ],
        schedule: 'Segunda a Sexta: 7h às 19h',
        banner: `👩‍⚕️ *Dra. Ana Costa - Clínica Geral*\n\n🏥 CRM-SP 67890\n📍 Av. Paulista - São Paulo\n⭐ 20 anos de experiência\n\n🔹 Medicina Preventiva\n🔹 Telemedicina Disponível\n🔹 Check-ups Executivos\n🔹 Atendimento Personalizado`
    },
    advogado: {
        name: 'Dr. Roberto Lima',
        specialty: 'Direito Civil e Trabalhista',
        oab: 'OAB-SP 123456',
        phone: '(11) 99999-9012',
        email: 'contato@robertolima.adv.br',
        address: 'Rua Augusta, 789 - Consolação, São Paulo',
        services: [
            { name: 'Consultoria Jurídica', price: 300.00 },
            { name: 'Ação Trabalhista', price: 1500.00 },
            { name: 'Divórcio Consensual', price: 2000.00 },
            { name: 'Revisão Contratual', price: 500.00 }
        ],
        schedule: 'Segunda a Sexta: 9h às 18h',
        banner: `⚖️ *Dr. Roberto Lima - Advocacia*\n\n👨‍💼 OAB-SP 123456\n📍 Consolação - São Paulo\n⭐ 18 anos de experiência\n\n🔹 Direito Civil e Trabalhista\n🔹 Consultoria Empresarial\n🔹 Mediação e Arbitragem\n🔹 Atendimento Estratégico`
    },
    psicologo: {
        name: 'Dra. Maria Santos',
        specialty: 'Psicologia Clínica',
        crp: 'CRP-SP 06/12345',
        phone: '(11) 99999-3456',
        email: 'maria@psicologiasantos.com.br',
        address: 'Rua dos Jardins, 321 - Jardins, São Paulo',
        services: [
            { name: 'Terapia Individual', price: 180.00 },
            { name: 'Terapia de Casal', price: 250.00 },
            { name: 'Terapia Familiar', price: 300.00 },
            { name: 'Sessão Online', price: 150.00 }
        ],
        schedule: 'Segunda a Sábado: 8h às 20h',
        banner: `🧠 *Dra. Maria Santos - Psicologia*\n\n👩‍⚕️ CRP-SP 06/12345\n📍 Jardins - São Paulo\n⭐ 12 anos de experiência\n\n🔹 Terapia Cognitivo-Comportamental\n🔹 Atendimento Online\n🔹 Especialista em Ansiedade\n🔹 Ambiente Acolhedor`
    },
    fisioterapeuta: {
        name: 'Dr. João Oliveira',
        specialty: 'Fisioterapia Ortopédica',
        crefito: 'CREFITO-3 12345',
        phone: '(11) 99999-7890',
        email: 'joao@fisiooliveira.com.br',
        address: 'Rua da Saúde, 654 - Vila Mariana, São Paulo',
        services: [
            { name: 'Sessão de Fisioterapia', price: 120.00 },
            { name: 'RPG', price: 150.00 },
            { name: 'Pilates Clínico', price: 100.00 },
            { name: 'Avaliação Postural', price: 80.00 }
        ],
        schedule: 'Segunda a Sexta: 6h às 20h | Sábado: 8h às 14h',
        banner: `🏃‍♂️ *Dr. João Oliveira - Fisioterapia*\n\n👨‍⚕️ CREFITO-3 12345\n📍 Vila Mariana - São Paulo\n⭐ 10 anos de experiência\n\n🔹 Fisioterapia Ortopédica\n🔹 RPG e Pilates Clínico\n🔹 Reabilitação Esportiva\n🔹 Equipamentos Modernos`
    },
    engenheiro: {
        name: 'Eng. Pedro Almeida',
        specialty: 'Engenharia Civil',
        crea: 'CREA-SP 123456789',
        phone: '(11) 99999-2468',
        email: 'pedro@almeida.eng.br',
        address: 'Av. Faria Lima, 987 - Itaim Bibi, São Paulo',
        services: [
            { name: 'Projeto Estrutural', price: 5000.00 },
            { name: 'Laudo Técnico', price: 800.00 },
            { name: 'Consultoria Técnica', price: 400.00 },
            { name: 'Acompanhamento de Obra', price: 200.00 }
        ],
        schedule: 'Segunda a Sexta: 8h às 17h',
        banner: `🏗️ *Eng. Pedro Almeida - Engenharia Civil*\n\n👨‍💼 CREA-SP 123456789\n📍 Itaim Bibi - São Paulo\n⭐ 15 anos de experiência\n\n🔹 Projetos Estruturais\n🔹 Laudos e Vistorias\n🔹 Consultoria Técnica\n🔹 Tecnologia BIM`
    }
};

// Função para enviar mensagem com imagem
async function sendProfessionalCard(msg, professionalType) {
    const prof = professionalCases[professionalType];
    const imagePath = path.join(__dirname, 'assets', 'images', `${professionalType}.jpg`);
    
    try {
        // Verifica se a imagem existe
        if (fs.existsSync(imagePath)) {
            const media = MessageMedia.fromFilePath(imagePath);
            const caption = `${prof.banner}\n\n📞 *Contatos:*\n📱 ${prof.phone}\n📧 ${prof.email}\n📍 ${prof.address}\n\n🕰️ *Horários:*\n${prof.schedule}\n\n💰 *Serviços:*\n${prof.services.map(s => `• ${s.name} - R$ ${s.price}`).join('\n')}\n\n📱 *Agende sua consulta!*`;
            
            await msg.reply(media, undefined, { caption });
            console.log(`🖼️ Imagem enviada: ${professionalType}.jpg`);
        } else {
            // Se não houver imagem, envia apenas o texto
            const textOnly = `${prof.banner}\n\n📞 *Contatos:*\n📱 ${prof.phone}\n📧 ${prof.email}\n📍 ${prof.address}\n\n🕰️ *Horários:*\n${prof.schedule}\n\n💰 *Serviços:*\n${prof.services.map(s => `• ${s.name} - R$ ${s.price}`).join('\n')}\n\n📱 *Agende sua consulta!*`;
            await msg.reply(textOnly);
            console.log(`⚠️ Imagem não encontrada: ${professionalType}.jpg - enviando apenas texto`);
        }
    } catch (error) {
        console.error(`❌ Erro ao enviar imagem ${professionalType}:`, error.message);
        // Fallback para texto apenas
        const textOnly = `${prof.banner}\n\n📞 *Contatos:*\n📱 ${prof.phone}\n📧 ${prof.email}\n📍 ${prof.address}\n\n🕰️ *Horários:*\n${prof.schedule}\n\n💰 *Serviços:*\n${prof.services.map(s => `• ${s.name} - R$ ${s.price}`).join('\n')}\n\n📱 *Agende sua consulta!*`;
        await msg.reply(textOnly);
    }
}
async function getContactName(msg) {
    try {
        const contact = await msg.getContact();
        if (contact && contact.pushname && typeof contact.pushname === 'string') {
            return contact.pushname.trim().split(' ')[0] || 'Cliente';
        }
        return 'Cliente';
    } catch (error) {
        console.log('⚠️ Erro ao obter nome do contato, usando padrão');
        return 'Cliente';
    }
}

// Respostas comerciais
function getResponse(input, name, phoneNumber, isFirstInteraction = false) {
    const userInput = input.toLowerCase();
    
    // Captura lead se novo
    if (!leads.has(phoneNumber)) {
        leads.set(phoneNumber, {
            name,
            phoneNumber,
            createdAt: new Date(),
            interactions: []
        });
        analytics.totalLeads++;
        console.log('🆕 Novo lead capturado!');
    }
    
    // Menu principal com demonstrações
    if (userInput.includes('oi') || userInput.includes('olá') || userInput.includes('menu')) {
        const greeting = isFirstInteraction || userInput.includes('menu') 
            ? `Olá ${name}! 👋\n\nSeja bem-vindo(a)! Sou seu assistente virtual.` 
            : 'Olá! 👋\n\nSou seu assistente virtual.';
        
        return `${greeting}\n\n📋 *Menu Principal:*\n\n💼 *Demonstrações por Profissão:*\n🦷 5 - Dentista\n👩⚕️ 6 - Médico\n⚖️ 7 - Advogado\n🧠 8 - Psicólogo\n🏃♂️ 9 - Fisioterapeuta\n🏗️ 0 - Engenheiro\n\n🛍️ *Opções Gerais:*\n1️⃣ Nossos Produtos\n2️⃣ Fazer Pedido\n3️⃣ Suporte\n4️⃣ Falar com Atendente\n\nDigite o número da opção desejada!`;
    }
    
    // Demonstrações dos profissionais
    if (userInput === '5' || userInput.includes('dentista')) {
        const prof = professionalCases.dentista;
        return `${prof.banner}\n\n📞 *Contatos:*\n📱 ${prof.phone}\n📧 ${prof.email}\n📍 ${prof.address}\n\n🕰️ *Horários:*\n${prof.schedule}\n\n💰 *Serviços:*\n${prof.services.map(s => `• ${s.name} - R$ ${s.price}`).join('\n')}\n\n📱 *Agende sua consulta!*`;
    }
    
    if (userInput === '6' || userInput.includes('medico') || userInput.includes('médico')) {
        const prof = professionalCases.medico;
        return `${prof.banner}\n\n📞 *Contatos:*\n📱 ${prof.phone}\n📧 ${prof.email}\n📍 ${prof.address}\n\n🕰️ *Horários:*\n${prof.schedule}\n\n💰 *Serviços:*\n${prof.services.map(s => `• ${s.name} - R$ ${s.price}`).join('\n')}\n\n📱 *Agende sua consulta!*`;
    }
    
    if (userInput === '7' || userInput.includes('advogado')) {
        const prof = professionalCases.advogado;
        return `${prof.banner}\n\n📞 *Contatos:*\n📱 ${prof.phone}\n📧 ${prof.email}\n📍 ${prof.address}\n\n🕰️ *Horários:*\n${prof.schedule}\n\n💰 *Serviços:*\n${prof.services.map(s => `• ${s.name} - R$ ${s.price}`).join('\n')}\n\n📱 *Agende sua consulta!*`;
    }
    
    if (userInput === '8' || userInput.includes('psicologo') || userInput.includes('psicólogo')) {
        const prof = professionalCases.psicologo;
        return `${prof.banner}\n\n📞 *Contatos:*\n📱 ${prof.phone}\n📧 ${prof.email}\n📍 ${prof.address}\n\n🕰️ *Horários:*\n${prof.schedule}\n\n💰 *Serviços:*\n${prof.services.map(s => `• ${s.name} - R$ ${s.price}`).join('\n')}\n\n📱 *Agende sua consulta!*`;
    }
    
    if (userInput === '9' || userInput.includes('fisioterapeuta')) {
        const prof = professionalCases.fisioterapeuta;
        return `${prof.banner}\n\n📞 *Contatos:*\n📱 ${prof.phone}\n📧 ${prof.email}\n📍 ${prof.address}\n\n🕰️ *Horários:*\n${prof.schedule}\n\n💰 *Serviços:*\n${prof.services.map(s => `• ${s.name} - R$ ${s.price}`).join('\n')}\n\n📱 *Agende sua consulta!*`;
    }
    
    if (userInput === '0' || userInput.includes('engenheiro')) {
        const prof = professionalCases.engenheiro;
        return `${prof.banner}\n\n📞 *Contatos:*\n📱 ${prof.phone}\n📧 ${prof.email}\n📍 ${prof.address}\n\n🕰️ *Horários:*\n${prof.schedule}\n\n💰 *Serviços:*\n${prof.services.map(s => `• ${s.name} - R$ ${s.price}`).join('\n')}\n\n📱 *Agende sua consulta!*`;
    }
    
    // Produtos gerais (mantido para compatibilidade)
    if (userInput.includes('produtos') || userInput === '1') {
        return `🛍️ *Sistema de Chatbot para Profissionais:*\n\n🤖 *Bot Comercial WhatsApp*\n💰 R$ 297,00/mês\n📝 Sistema completo de atendimento\n\n🔹 Captura de leads automática\n🔹 Menu personalizável\n🔹 Analytics de conversão\n🔹 Integração com agenda\n\nPara contratar, digite *"pedido"* ou *"2"*`;
    }
    
    // Pedidos (sem nome)
    if (userInput.includes('pedido') || userInput.includes('comprar') || userInput === '2') {
        analytics.conversions++;
        return `🛒 *Fazer Pedido:*\n\nPara contratar nosso sistema:\n\n1. Escolha seu plano\n2. Informe seus dados\n3. Confirme o pagamento\n\n📱 Digite: *"Quero o plano mensal"*\n\nOu fale com nosso atendente digitando *"4"*`;
    }
    
    // Suporte (sem nome)
    if (userInput.includes('suporte') || userInput.includes('ajuda') || userInput === '3') {
        return `🆘 *Suporte Técnico:*\n\nEstou aqui para ajudar!\n\n❓ *Dúvidas Frequentes:*\n• Como personalizar o bot?\n• Formas de pagamento\n• Integração com sistemas\n• Suporte técnico\n\nDescreva sua dúvida ou digite *"4"* para falar com atendente humano.`;
    }
    
    // Atendente (sem nome)
    if (userInput.includes('atendente') || userInput.includes('humano') || userInput === '4') {
        return `👨💼 *Transferindo para Atendente:*\n\nVocê será conectado com um de nossos atendentes em breve.\n\n⏰ Horário de atendimento:\n🕐 Segunda a Sexta: 8h às 18h\n\n*Aguarde um momento...*`;
    }
    
    // Contato (sem nome)
    if (userInput.includes('contato') || userInput.includes('telefone')) {
        return `📞 *Nossos Contatos:*\n\n📱 WhatsApp: (11) 99999-9999\n📧 Email: contato@chatbotpro.com.br\n🌐 Site: www.chatbotpro.com.br\n📍 Endereço: São Paulo - SP\n\n🕐 Atendimento: Seg-Sex 8h às 18h`;
    }
    
    // Resposta padrão (sem nome)
    return `Não entendi sua mensagem. 🤔\n\nDigite *"menu"* para ver as opções disponíveis ou *"4"* para falar com atendente.`;
}

// Cliente WhatsApp
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
    console.log('✅ Bot Comercial conectado!');
    console.log('🚀 Sistema de vendas ativo');
});

client.on('message', async msg => {
    try {
        console.log('📨 Mensagem:', msg.body);
        console.log('📞 De:', msg.from);
        
        // Apenas mensagens de contatos individuais
        if (!msg.from.endsWith('@c.us') || !msg.body) {
            console.log('❌ Ignorando mensagem');
            return;
        }
        
        analytics.totalMessages++;
        
        const phoneNumber = msg.from.replace('@c.us', '');
        const userInput = msg.body.toLowerCase();
        
        // Verifica se é primeira interação
        const isFirstInteraction = !leads.has(phoneNumber);
        
        // Obtém nome com tratamento de erro
        console.log('🔍 Obtendo nome do contato...');
        const name = await getContactName(msg);
        console.log('👤 Nome obtido:', name);
        
        // Simula digitação
        const chat = await msg.getChat();
        await chat.sendStateTyping();
        
        // Delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Verifica se é demonstração de profissional (envia com imagem)
        if (userInput === '5' || userInput.includes('dentista')) {
            await sendProfessionalCard(msg, 'dentista');
        }
        else if (userInput === '6' || userInput.includes('medico') || userInput.includes('médico')) {
            await sendProfessionalCard(msg, 'medico');
        }
        else if (userInput === '7' || userInput.includes('advogado')) {
            await sendProfessionalCard(msg, 'advogado');
        }
        else if (userInput === '8' || userInput.includes('psicologo') || userInput.includes('psicólogo')) {
            await sendProfessionalCard(msg, 'psicologo');
        }
        else if (userInput === '9' || userInput.includes('fisioterapeuta')) {
            await sendProfessionalCard(msg, 'fisioterapeuta');
        }
        else if (userInput === '0' || userInput.includes('engenheiro')) {
            await sendProfessionalCard(msg, 'engenheiro');
        }
        else {
            // Para outras opções, usa a função normal
            const response = getResponse(msg.body, name, phoneNumber, isFirstInteraction);
            console.log('📤 Enviando:', response.substring(0, 50) + '...');
            await msg.reply(response);
        }
        
        console.log('---');
        
    } catch (error) {
        console.error('❌ Erro:', error.message);
    }
});

// Comando de relatório
client.on('message', async msg => {
    if (msg.body === '!stats') {
        const conversionRate = analytics.totalLeads > 0 
            ? ((analytics.conversions / analytics.totalLeads) * 100).toFixed(2)
            : 0;
            
        const report = `📊 *Estatísticas:*\n\n📈 Mensagens: ${analytics.totalMessages}\n👥 Leads: ${analytics.totalLeads}\n💰 Conversões: ${analytics.conversions}\n📊 Taxa: ${conversionRate}%`;
        
        await msg.reply(report);
    }
});

client.initialize();

console.log('🤖 Iniciando Bot Comercial...');
console.log('💼 Recursos: Leads, Vendas, Analytics');