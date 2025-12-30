const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

class ImageService {
    constructor() {
        this.imagesPath = path.join(__dirname, '..', '..', 'assets', 'images');
    }

    async sendProfessionalCard(msg, professional) {
        const imagePath = path.join(this.imagesPath, professional.image);
        
        try {
            if (fs.existsSync(imagePath)) {
                const media = MessageMedia.fromFilePath(imagePath);
                const caption = professional.getBanner();
                
                await msg.reply(media, undefined, { caption });
                console.log(`🖼️ Imagem enviada: ${professional.image}`);
                return true;
            } else {
                await msg.reply(professional.getBanner());
                console.log(`⚠️ Imagem não encontrada: ${professional.image} - enviando apenas texto`);
                return false;
            }
        } catch (error) {
            console.error(`❌ Erro ao enviar imagem ${professional.image}:`, error.message);
            await msg.reply(professional.getBanner());
            return false;
        }
    }

    imageExists(filename) {
        const imagePath = path.join(this.imagesPath, filename);
        return fs.existsSync(imagePath);
    }
}

module.exports = ImageService;