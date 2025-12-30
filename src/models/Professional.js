class Professional {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.specialty = data.specialty;
        this.registration = data.registration;
        this.phone = data.phone;
        this.email = data.email;
        this.address = data.address;
        this.services = data.services || [];
        this.schedule = data.schedule;
        this.banner = data.banner;
        this.image = data.image;
    }

    getBanner() {
        return `${this.banner}\n\n📞 *Contatos:*\n📱 ${this.phone}\n📧 ${this.email}\n📍 ${this.address}\n\n🕰️ *Horários:*\n${this.schedule}\n\n💰 *Serviços:*\n${this.services.map(s => `• ${s.name} - R$ ${s.price}`).join('\n')}\n\n📱 *Agende sua consulta!*`;
    }

    getServicesList() {
        return this.services.map(service => ({
            name: service.name,
            price: service.price,
            description: service.description || ''
        }));
    }
}

module.exports = Professional;