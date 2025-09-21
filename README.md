# 🤖 ChatBot WhatsApp Seguro

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Security](https://img.shields.io/badge/Security-Hardened-brightgreen.svg)](#recursos-de-segurança)

Bot simples e seguro para WhatsApp desenvolvido com foco em **boas práticas de segurança** e **código limpo**. Este projeto demonstra implementação segura de automação para WhatsApp, prevenindo vulnerabilidades comuns como injeção de código e tratamento inadequado de erros.

## 📋 Índice

- [Recursos de Segurança](#-recursos-de-segurança)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Deploy](#-deploy-gratuito)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## 🔒 Recursos de Segurança

- ✅ **Validação rigorosa de entrada** - Previne injeção de código malicioso
- ✅ **Sanitização de dados** - Filtragem de comandos permitidos
- ✅ **Tratamento de erros** - Try/catch adequado para estabilidade
- ✅ **Dependências atualizadas** - Correção de vulnerabilidades conhecidas
- ✅ **Tipagem segura** - Verificação de tipos antes do processamento
- ✅ **Logs de segurança** - Monitoramento de tentativas maliciosas

## 🛠 Tecnologias

- **Node.js** 16+
- **whatsapp-web.js** - API não oficial do WhatsApp
- **qrcode-terminal** - Geração de QR Code no terminal

## 🚀 Instalação

### Pré-requisitos
- Node.js 16 ou superior
- NPM ou Yarn

### Passos

1. **Clone o repositório:**
```bash
git clone https://github.com/lucasteixeirati/chatbot-whatsapp-seguro.git
cd chatbot-whatsapp-seguro
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o bot:**
```bash
npm start
```

4. **Escaneie o QR Code** que aparecerá no terminal com seu WhatsApp

## 💬 Uso

### Comandos Disponíveis

O bot responde aos seguintes comandos:
- `oi` / `olá` - Saudação inicial
- `menu` - Exibe opções disponíveis
- `dia` / `tarde` / `noite` - Saudações por período

### Exemplo de Interação
```
Usuário: oi
Bot: Olá! João 👋 Como posso ajudar você hoje?
```

## 📁 Estrutura do Projeto

```
chatbot-whatsapp-seguro/
├── robo.js              # Arquivo principal do bot
├── package.json         # Dependências e scripts
├── .gitignore          # Arquivos ignorados pelo Git
├── README.md           # Documentação
└── .wwebjs_auth/       # Dados de sessão (não versionado)
```

## 🌐 Deploy Gratuito

### Opções Recomendadas

| Plataforma | Horas Gratuitas | Facilidade | Recomendação |
|------------|----------------|------------|-------------|
| **Railway** | 500h/mês | ⭐⭐⭐⭐⭐ | ✅ Recomendado |
| **Render** | 750h/mês | ⭐⭐⭐⭐ | ✅ Boa opção |
| **Heroku** | Limitado | ⭐⭐⭐ | ⚠️ Plano pago |

### Deploy no Railway (Recomendado)

1. Crie conta no [Railway](https://railway.app)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente (se necessário)
4. Deploy automático! 🚀

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## ⚠️ Avisos Importantes

- 🔐 **Nunca compartilhe credenciais** em repositórios públicos
- 🔄 **Mantenha dependências atualizadas** regularmente
- 🛡️ **Use em ambiente seguro** para produção
- 📱 **Respeite os Termos de Uso** do WhatsApp

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

*Se este projeto foi útil, considere dar uma ⭐!*

Autor Lucas Teixeira