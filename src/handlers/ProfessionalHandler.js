const Professional = require('../models/Professional');
const ImageService = require('../services/ImageService');
const professionalsData = require('../../config/data/professionals.json');

class ProfessionalHandler {
    constructor() {
        this.professionals = new Map();
        this.imageService = new ImageService();
        this.loadProfessionals();
    }

    loadProfessionals() {
        Object.entries(professionalsData).forEach(([key, data]) => {
            this.professionals.set(key, new Professional(data));
        });
    }

    async handleProfessionalDemo(msg, professionalId) {
        const professional = this.professionals.get(professionalId);
        
        if (!professional) {
            await msg.reply('❌ Profissional não encontrado. Digite *"menu"* para ver as opções.');
            return false;
        }

        try {
            await this.imageService.sendProfessionalCard(msg, professional);
            console.log(`✅ Demonstração enviada: ${professional.name}`);
            return true;
        } catch (error) {
            console.error(`❌ Erro ao enviar demonstração ${professionalId}:`, error.message);
            await msg.reply('❌ Erro ao enviar demonstração. Tente novamente.');
            return false;
        }
    }

    getProfessional(professionalId) {
        return this.professionals.get(professionalId);
    }

    getAllProfessionals() {
        return Array.from(this.professionals.values());
    }

    getProfessionalsList() {
        return Array.from(this.professionals.entries()).map(([id, prof]) => ({
            id,
            name: prof.name,
            specialty: prof.specialty
        }));
    }
}

module.exports = ProfessionalHandler;