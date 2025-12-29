// Sistema de respostas comerciais
class CommercialResponses {
    constructor(leadManager) {
        this.leadManager = leadManager;
        this.responses = {
            // Saudações e captura de lead
            greetings: {
                keywords: ['oi', 'olá', 'ola', 'menu', 'começar'],
                response: (name, phoneNumber) => {
                    this.leadManager.captureLead(phoneNumber, name);
                    return `Olá ${name}! 👋\n\nSeja bem-vindo(a)! Sou seu assistente virtual.\n\n📋 *Menu Principal:*\n1️⃣ Nossos Produtos\n2️⃣ Fazer Pedido\n3️⃣ Suporte\n4️⃣ Falar com Atendente\n\nDigite o número da opção desejada!`;
                }
            },

            // Catálogo de produtos
            products: {
                keywords: ['produtos', 'catálogo', '1'],
                response: (name) => {
                    const products = this.leadManager.getProducts();
                    let message = `🛍️ *Nossos Produtos:*\n\n`;
                    products.forEach(product => {
                        message += `📦 *${product.name}*\n💰 R$ ${product.price}\n📝 ${product.description}\n\n`;
                    });
                    message += `Para fazer pedido, digite *"pedido"* ou *"2"*`;
                    return message;
                }
            },

            // Processo de pedido
            order: {
                keywords: ['pedido', 'comprar', '2'],
                response: (name) => {
                    return `🛒 *Fazer Pedido:*\n\n${name}, para fazer seu pedido:\n\n1. Escolha o produto\n2. Informe a quantidade\n3. Confirme seus dados\n\n📱 Digite: *"Produto A - 2 unidades"*\n\nOu fale com nosso atendente digitando *"4"*`;
                }
            },

            // Suporte
            support: {
                keywords: ['suporte', 'ajuda', 'problema', '3'],
                response: (name) => {
                    return `🆘 *Suporte Técnico:*\n\n${name}, estou aqui para ajudar!\n\n❓ *Dúvidas Frequentes:*\n• Como fazer pedido?\n• Formas de pagamento\n• Prazo de entrega\n• Política de troca\n\nDescreva sua dúvida ou digite *"4"* para falar com atendente humano.`;
                }
            },

            // Transferir para humano
            human: {
                keywords: ['atendente', 'humano', 'pessoa', '4'],
                response: (name) => {
                    return `👨‍💼 *Transferindo para Atendente:*\n\n${name}, você será conectado com um de nossos atendentes em breve.\n\n⏰ Horário de atendimento:\n🕐 Segunda a Sexta: 8h às 18h\n\n*Aguarde um momento...*`;
                }
            },

            // Informações de contato
            contact: {
                keywords: ['contato', 'telefone', 'endereço'],
                response: () => {
                    return `📞 *Nossos Contatos:*\n\n📱 WhatsApp: (11) 99999-9999\n📧 Email: contato@empresa.com\n🌐 Site: www.empresa.com\n📍 Endereço: Rua Exemplo, 123\n\n🕐 Atendimento: Seg-Sex 8h às 18h`;
                }
            }
        };
    }

    findResponse(userInput, name, phoneNumber) {
        // Adiciona interação ao lead
        this.leadManager.addInteraction(phoneNumber, userInput, 'received');

        for (const [key, responseData] of Object.entries(this.responses)) {
            const hasKeyword = responseData.keywords.some(keyword => 
                userInput.includes(keyword.toLowerCase())
            );
            if (hasKeyword) {
                const response = responseData.response(name, phoneNumber);
                this.leadManager.addInteraction(phoneNumber, response, 'sent');
                return response;
            }
        }

        // Resposta padrão para mensagens não reconhecidas
        const defaultResponse = `${name}, não entendi sua mensagem. 🤔\n\nDigite *"menu"* para ver as opções disponíveis ou *"4"* para falar com atendente.`;
        this.leadManager.addInteraction(phoneNumber, defaultResponse, 'sent');
        return defaultResponse;
    }

    // Verifica horário comercial
    isBusinessHours() {
        const now = new Date();
        const hour = now.getHours();
        return hour >= 8 && hour < 18;
    }
}

module.exports = CommercialResponses;