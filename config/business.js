// Configurações comerciais
module.exports = {
    businessHours: {
        start: '08:00',
        end: '18:00',
        timezone: 'America/Sao_Paulo'
    },
    
    attendance: {
        maxConcurrentChats: 50,
        responseDelay: { min: 1000, max: 3000 },
        autoTransferToHuman: true
    },
    
    crm: {
        enabled: false,
        apiUrl: process.env.CRM_API_URL,
        apiKey: process.env.CRM_API_KEY
    },
    
    analytics: {
        enabled: true,
        trackConversions: true,
        trackUserJourney: true
    }
};