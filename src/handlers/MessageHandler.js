const MenuHandler = require('./MenuHandler');
const ProfessionalHandler = require('./ProfessionalHandler');

class MessageHandler {
    constructor(leadManager, analytics) {
        this.menuHandler = new MenuHandler();
        this.professionalHandler = new ProfessionalHandler();
        this.leadManager = leadManager;
        this.analytics = analytics;
    }

    async handleMessage(msg, name, phoneNumber, isFirstInteraction) {
        const userInput = msg.body.toLowerCase().trim();
        
        // Registra interação
        this.analytics.trackMessage(phoneNumber, msg.body);
        
        // Captura lead se novo
        if (isFirstInteraction) {
            this.leadManager.captureLead(phoneNumber, name);
            this.analytics.trackLead(phoneNumber);
        }

        // Verifica ação do menu
        const menuAction = this.menuHandler.getMenuAction(userInput);
        
        if (menuAction) {
            return await this.processAction(msg, menuAction, name, phoneNumber);
        }

        // Resposta padrão
        return this.getDefaultResponse(name);
    }

    async processAction(msg, action, name, phoneNumber) {
        switch (action.action) {
            case 'menu':
                const isFirstInteraction = !this.leadManager.hasLead(phoneNumber);
                return this.menuHandler.generateMainMenu(name, isFirstInteraction);

            case 'professional':
                await this.professionalHandler.handleProfessionalDemo(msg, action.professional);
                return null; // Imagem já foi enviada

            case 'pricing':
                return this.getPricingResponse();

            case 'products':
                return this.getProductsResponse();

            case 'order':
                this.analytics.trackConversion(phoneNumber);
                return this.getOrderResponse(name);

            case 'support':
                return this.getSupportResponse(name);

            default:
                return this.getDefaultResponse(name);
        }
    }

    getPricingResponse() {
        return `💰 *Valores Bot WhatsApp:*\n\n🤖 *Planos Disponíveis:*\n\n🎆 **Básico** - R$ 97/mês\n• 1 WhatsApp conectado\n• Menu personalizável\n• Respostas automáticas\n• Suporte por email\n\n🚀 **Profissional** - R$ 197/mês\n• 3 WhatsApps conectados\n• Sistema de leads\n• Analytics detalhado\n• Suporte prioritário\n\n🏆 **Enterprise** - R$ 397/mês\n• WhatsApps ilimitados\n• Customização completa\n• Integrações avançadas\n• Suporte 24/7\n\n📱 *Entre em contato para contratar!*`;
    }

    getProductsResponse() {
        return `🛍️ *Sistema de Chatbot para Profissionais:*\n\n🤖 *Bot Comercial WhatsApp*\n💰 R$ 297,00/mês\n📝 Sistema completo de atendimento\n\n🔹 Captura de leads automática\n🔹 Menu personalizável\n🔹 Analytics de conversão\n🔹 Integração com agenda\n\nPara contratar, digite *"pedido"* ou *"2"*`;
    }

    getOrderResponse(name) {
        return `🛒 *Fazer Pedido:*\n\n${name}, para contratar nosso sistema:\n\n1. Escolha seu plano\n2. Informe seus dados\n3. Confirme o pagamento\n\n📱 Digite: *"Quero o plano mensal"*\n\nOu digite *"0"* para ver nossos valores`;
    }

    getSupportResponse(name) {
        return `🆘 *Suporte Técnico:*\n\n${name}, estou aqui para ajudar!\n\n❓ *Dúvidas Frequentes:*\n• Como personalizar o bot?\n• Formas de pagamento\n• Integração com sistemas\n• Suporte técnico\n\nDescreva sua dúvida ou digite *"0"* para ver valores.`;
    }

    getDefaultResponse(name) {
        return `${name}, não entendi sua mensagem. 🤔\n\nDigite *"menu"* para ver as opções disponíveis ou *"0"* para ver valores.`;
    }
}

module.exports = MessageHandler;