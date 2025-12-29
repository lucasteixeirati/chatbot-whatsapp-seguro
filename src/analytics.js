// Sistema de Analytics
class Analytics {
    constructor() {
        this.metrics = {
            totalMessages: 0,
            totalLeads: 0,
            conversions: 0,
            popularKeywords: new Map(),
            hourlyActivity: new Array(24).fill(0),
            dailyStats: new Map()
        };
    }

    // Registra mensagem
    trackMessage(phoneNumber, message, type = 'received') {
        this.metrics.totalMessages++;
        
        const hour = new Date().getHours();
        this.metrics.hourlyActivity[hour]++;

        const today = new Date().toDateString();
        if (!this.metrics.dailyStats.has(today)) {
            this.metrics.dailyStats.set(today, { messages: 0, leads: 0, conversions: 0 });
        }
        this.metrics.dailyStats.get(today).messages++;

        // Analisa palavras-chave populares
        if (type === 'received') {
            const words = message.toLowerCase().split(' ');
            words.forEach(word => {
                if (word.length > 3) {
                    const count = this.metrics.popularKeywords.get(word) || 0;
                    this.metrics.popularKeywords.set(word, count + 1);
                }
            });
        }
    }

    // Registra novo lead
    trackLead(phoneNumber) {
        this.metrics.totalLeads++;
        
        const today = new Date().toDateString();
        if (this.metrics.dailyStats.has(today)) {
            this.metrics.dailyStats.get(today).leads++;
        }
    }

    // Registra conversão
    trackConversion(phoneNumber) {
        this.metrics.conversions++;
        
        const today = new Date().toDateString();
        if (this.metrics.dailyStats.has(today)) {
            this.metrics.dailyStats.get(today).conversions++;
        }
    }

    // Gera relatório
    generateReport() {
        const conversionRate = this.metrics.totalLeads > 0 
            ? ((this.metrics.conversions / this.metrics.totalLeads) * 100).toFixed(2)
            : 0;

        const topKeywords = Array.from(this.metrics.popularKeywords.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const peakHour = this.metrics.hourlyActivity.indexOf(
            Math.max(...this.metrics.hourlyActivity)
        );

        return {
            summary: {
                totalMessages: this.metrics.totalMessages,
                totalLeads: this.metrics.totalLeads,
                conversions: this.metrics.conversions,
                conversionRate: `${conversionRate}%`
            },
            insights: {
                peakHour: `${peakHour}:00`,
                topKeywords: topKeywords.map(([word, count]) => ({ word, count })),
                dailyAverage: Math.round(this.metrics.totalMessages / this.metrics.dailyStats.size)
            }
        };
    }

    // Salva métricas (simulação - em produção usar banco de dados)
    saveMetrics() {
        const fs = require('fs');
        const data = JSON.stringify(this.metrics, null, 2);
        fs.writeFileSync('./database/analytics.json', data);
    }

    // Carrega métricas
    loadMetrics() {
        try {
            const fs = require('fs');
            const data = fs.readFileSync('./database/analytics.json', 'utf8');
            this.metrics = JSON.parse(data);
        } catch (error) {
            console.log('Criando novo arquivo de métricas...');
        }
    }
}

module.exports = Analytics;