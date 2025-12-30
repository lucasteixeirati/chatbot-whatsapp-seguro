const menuConfig = require('../../config/data/menu.json');

class MenuHandler {
    constructor() {
        this.menuConfig = menuConfig;
    }

    generateMainMenu(name, isFirstInteraction = false) {
        const greeting = isFirstInteraction 
            ? `Olá ${name}! 👋\n\nSeja bem-vindo(a)! Sou seu assistente virtual.` 
            : 'Olá! 👋\n\nSou seu assistente virtual.';
        
        let menu = `${greeting}\n\n${this.menuConfig.mainMenu.title}\n\n`;
        
        // Adiciona opções principais
        Object.entries(this.menuConfig.mainMenu.options).forEach(([key, option]) => {
            menu += `${option.emoji} ${option.label}\n`;
        });
        
        menu += `\n${this.menuConfig.professionalMenu.title}\n`;
        
        // Adiciona demonstrações profissionais
        Object.entries(this.menuConfig.professionalMenu.options).forEach(([key, option]) => {
            menu += `${option.emoji} ${option.label}\n`;
        });
        
        menu += `\n${this.menuConfig.specialOptions['0'].emoji} ${this.menuConfig.specialOptions['0'].label}\n\n`;
        menu += `Digite o número da opção desejada!`;
        
        return menu;
    }

    getMenuAction(userInput) {
        const input = userInput.toLowerCase().trim();
        
        // Verifica opções principais
        for (const [key, option] of Object.entries(this.menuConfig.mainMenu.options)) {
            if (input === key || input.includes(option.label.toLowerCase())) {
                return { action: option.action, key };
            }
        }
        
        // Verifica demonstrações profissionais
        for (const [key, option] of Object.entries(this.menuConfig.professionalMenu.options)) {
            if (input === key || input.includes(option.professional)) {
                return { 
                    action: option.action, 
                    professional: option.professional,
                    key 
                };
            }
        }
        
        // Verifica opções especiais
        for (const [key, option] of Object.entries(this.menuConfig.specialOptions)) {
            if (input === key || input.includes('valores') || input.includes('preço')) {
                return { action: option.action, key };
            }
        }
        
        // Verifica comandos de menu
        if (input.includes('oi') || input.includes('olá') || input.includes('menu')) {
            return { action: 'menu' };
        }
        
        return null;
    }
}

module.exports = MenuHandler;