const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Importa módulos
const MessageHandler = require('./src/handlers/MessageHandler');
const LeadManager = require('./src/leadManager');
const Analytics = require('./src/analytics');
const Logger = require('./src/utils/Logger');

class CommercialBot {
    constructor() {
        this.leadManager = new LeadManager();
        this.analytics = new Analytics();
        this.messageHandler = new MessageHandler(this.leadManager, this.analytics);
        
        this.client = new Client({
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

        this.setupEventHandlers();
    }

    setupEventHandlers() {
        this.client.on('qr', qr => {
            Logger.info('QR Code gerado - Escaneie para conectar');
            qrcode.generate(qr, {small: true});
        });

        this.client.on('ready', () => {
            Logger.success('Bot Comercial conectado e ativo!');
            Logger.info('Sistema de vendas iniciado com sucesso');
        });

        this.client.on('message', async msg => {
            await this.handleIncomingMessage(msg);
        });

        this.client.on('disconnected', (reason) => {
            Logger.warning('Bot desconectado', { reason });
        });
    }

    async handleIncomingMessage(msg) {
        try {
            // Filtra apenas mensagens de contatos individuais
            if (!msg.from.endsWith('@c.us') || !msg.body) {
                return;
            }

            const phoneNumber = msg.from.replace('@c.us', '');
            const isFirstInteraction = !this.leadManager.hasLead(phoneNumber);
            
            Logger.info('Nova mensagem recebida', {
                from: phoneNumber,
                message: msg.body.substring(0, 50),
                isFirstInteraction
            });

            // Obtém nome do contato
            const name = await this.getContactName(msg);
            
            // Simula digitação
            const chat = await msg.getChat();
            await chat.sendStateTyping();
            await this.delay(1500);

            // Processa mensagem
            const response = await this.messageHandler.handleMessage(
                msg, name, phoneNumber, isFirstInteraction
            );

            // Envia resposta se houver
            if (response) {
                await msg.reply(response);
                Logger.success('Resposta enviada', { 
                    to: phoneNumber, 
                    responseLength: response.length 
                });
            }

            // Comando de estatísticas
            if (msg.body === '!stats') {
                await this.sendStats(msg);
            }

        } catch (error) {
            Logger.error('Erro ao processar mensagem', error);
            try {
                await msg.reply('❌ Ocorreu um erro. Tente novamente em alguns instantes.');
            } catch (replyError) {
                Logger.error('Erro ao enviar mensagem de erro', replyError);
            }
        }
    }

    async getContactName(msg) {
        try {
            const contact = await msg.getContact();
            if (contact && contact.pushname && typeof contact.pushname === 'string') {
                return contact.pushname.trim().split(' ')[0] || 'Cliente';
            }
            return 'Cliente';
        } catch (error) {
            Logger.warning('Erro ao obter nome do contato, usando padrão');
            return 'Cliente';
        }
    }

    async sendStats(msg) {
        try {
            const report = this.analytics.generateReport();
            const statsMessage = `📊 *Estatísticas do Bot:*\n\n📈 Mensagens: ${report.summary.totalMessages}\n👥 Leads: ${report.summary.totalLeads}\n💰 Conversões: ${report.summary.conversions}\n📊 Taxa de Conversão: ${report.summary.conversionRate}\n\n🕐 Horário de Pico: ${report.insights.peakHour}\n📊 Média Diária: ${report.insights.dailyAverage} mensagens`;
            
            await msg.reply(statsMessage);
            Logger.info('Estatísticas enviadas');
        } catch (error) {
            Logger.error('Erro ao enviar estatísticas', error);
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async start() {
        try {
            Logger.info('Iniciando Bot Comercial...');
            Logger.info('Recursos: Leads, Vendas, Analytics, Demonstrações');
            
            // Carrega métricas existentes
            this.analytics.loadMetrics();
            
            await this.client.initialize();
        } catch (error) {
            Logger.error('Erro ao iniciar bot', error);
            process.exit(1);
        }
    }

    async stop() {
        try {
            Logger.info('Parando bot...');
            this.analytics.saveMetrics();
            await this.client.destroy();
            Logger.success('Bot parado com sucesso');
        } catch (error) {
            Logger.error('Erro ao parar bot', error);
        }
    }
}

// Inicialização
const bot = new CommercialBot();

// Handlers de processo
process.on('SIGINT', async () => {
    Logger.info('Recebido SIGINT, parando bot...');
    await bot.stop();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    Logger.info('Recebido SIGTERM, parando bot...');
    await bot.stop();
    process.exit(0);
});

// Inicia o bot
bot.start();