// Sistema de leads e vendas
class LeadManager {
    constructor() {
        this.leads = new Map();
        this.conversations = new Map();
    }

    // Captura lead
    captureLead(phoneNumber, name, source = 'whatsapp') {
        const lead = {
            id: Date.now().toString(),
            phoneNumber,
            name,
            source,
            status: 'new',
            createdAt: new Date(),
            interactions: []
        };
        
        this.leads.set(phoneNumber, lead);
        return lead;
    }

    // Atualiza status do lead
    updateLeadStatus(phoneNumber, status) {
        const lead = this.leads.get(phoneNumber);
        if (lead) {
            lead.status = status;
            lead.updatedAt = new Date();
        }
    }

    // Adiciona interação
    addInteraction(phoneNumber, message, type = 'received') {
        const lead = this.leads.get(phoneNumber);
        if (lead) {
            lead.interactions.push({
                message,
                type,
                timestamp: new Date()
            });
        }
    }

    // Produtos/Serviços
    getProducts() {
        return [
            { id: 1, name: 'Produto A', price: 99.90, description: 'Descrição do produto A' },
            { id: 2, name: 'Serviço B', price: 199.90, description: 'Descrição do serviço B' }
        ];
    }

    // Funil de vendas
    getSalesFunnel(phoneNumber) {
        const lead = this.leads.get(phoneNumber);
        if (!lead) return 'prospect';
        
        const interactionCount = lead.interactions.length;
        if (interactionCount >= 5) return 'hot';
        if (interactionCount >= 3) return 'warm';
        return 'cold';
    }
}

module.exports = LeadManager;