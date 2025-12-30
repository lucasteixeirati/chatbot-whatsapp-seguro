# 🤖 ChatBot WhatsApp Seguro

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Security](https://img.shields.io/badge/Security-Hardened-brightgreen.svg)](#segurança)
[![Commercial](https://img.shields.io/badge/Commercial-Ready-orange.svg)](#funcionalidades-comerciais)

Bot completo para WhatsApp com **foco em segurança** e **recursos comerciais avançados**. Sistema de leads, vendas automatizadas, analytics e demonstrações profissionais.

## 🚀 Recursos Principais

- 💼 **Sistema completo de vendas** com captura de leads
- 📊 **Analytics avançado** com métricas de conversão
- 🏥 **Demonstrações profissionais** com imagens (6 especialidades)
- 📱 **Menu comercial** interativo e personalizado
- 🔒 **Segurança hardened** com validação rigorosa
- 📈 **Relatórios de performance** em tempo real

## 📦 Versões Disponíveis

| Versão | Comando | Descrição |
|--------|---------|----------|
| **Comercial** | `npm start` | Sistema completo de vendas (recomendado) |
| **Teste** | `npm run test` | Bot para testes e debug |

> 🚀 **Principal**: `npm start` executa a versão comercial otimizada!

## 🛠 Instalação Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/lucasteixeirati/chatbot-whatsapp-seguro.git
cd chatbot-whatsapp-seguro

# 2. Instale dependências
npm install

# 3. Execute o bot comercial
npm start

# 4. Escaneie o QR Code no terminal
```

## 💬 Menu da Versão Comercial

**Opções Gerais:**
- `1` - Nossos Produtos
- `2` - Fazer Pedido  
- `3` - Suporte

**Demonstrações Profissionais:**
- `4` - 🦷 Dentista (Dr. Carlos Silva)
- `5` - 👩⚕️ Médico (Dra. Ana Costa)
- `6` - ⚖️ Advogado (Dr. Roberto Lima)
- `7` - 🧠 Psicólogo (Dra. Maria Santos)
- `8` - 🏃♂️ Fisioterapeuta (Dr. João Oliveira)
- `9` - 🏗️ Engenheiro (Eng. Pedro Almeida)

**Valores:**
- `0` - 💰 Valores Bot WhatsApp (3 planos disponíveis)

## 💼 Funcionalidades Comerciais

### Demonstrações Profissionais
- 📸 **Cartões visuais** com imagem + informações completas
- 📞 **Dados de contato** (CRM, endereço, telefones)
- 💰 **Lista de serviços** com preços atualizados
- 🕰️ **Horários de funcionamento** detalhados

### Sistema de Leads & Analytics
- **Captura automática** de dados do cliente
- **Classificação** por engajamento (cold/warm/hot)
- **Métricas em tempo real** (mensagens, leads, conversões)
- **Comando `!stats`** para estatísticas instantâneas

## 📁 Estrutura do Projeto

```
chatbot-whatsapp-seguro/
├── src/                    # Módulos principais
│   ├── handlers/           # Gerenciadores de ações
│   │   ├── MessageHandler.js   # Handler principal
│   │   ├── MenuHandler.js      # Gerenciamento de menu
│   │   └── ProfessionalHandler.js # Demonstrações
│   ├── services/           # Serviços auxiliares
│   │   └── ImageService.js     # Gerenciamento de imagens
│   ├── models/             # Modelos de dados
│   │   └── Professional.js     # Modelo de profissional
│   ├── utils/              # Utilitários
│   │   └── Logger.js           # Sistema de logs
│   ├── analytics.js        # Analytics avançado
│   ├── leadManager.js      # Gestão de leads
│   └── commercialResponses.js # Respostas comerciais
├── config/                 # Configurações
│   ├── business.js         # Config comerciais
│   └── data/               # Dados estruturados
│       ├── professionals.json  # Dados dos profissionais
│       └── menu.json           # Estrutura do menu
├── assets/images/          # Imagens dos profissionais
├── database/               # Dados de analytics
├── bot-comercial-v2.js     # Bot comercial principal
├── bot-teste.js            # Bot para testes
```

## 🎯 Casos de Uso

**Para Profissionais Autônomos:**
- 🦷 **Dentistas** - Agendamentos e informações
- 👩⚕️ **Médicos** - Consultas e telemedicina  
- ⚖️ **Advogados** - Consultorias jurídicas
- 🧠 **Psicólogos** - Terapias e atendimentos
- 🏃♂️ **Fisioterapeutas** - Sessões e tratamentos
- 🏗️ **Engenheiros** - Projetos e consultorias

## 📊 Comandos Úteis

```bash
# Executar bot
npm start              # Comercial (principal)
npm run test          # Teste e debug

# Relatórios e stats
npm run report         # Relatório de performance
# !stats no WhatsApp   # Estatísticas em tempo real

# Manutenção
npm install           # Instalar dependências
npm audit            # Verificar vulnerabilidades
npm run validate     # Validar estrutura
```

## 🔒 Segurança

- ✅ **Validação rigorosa** de entrada com sanitização
- ✅ **Tratamento de erros** robusto e logs detalhados
- ✅ **Autenticação local** segura e persistente
- ✅ **Dependências atualizadas** sem vulnerabilidades

## 🚀 Deploy em Produção

**Opções de Hospedagem:**
- **VPS/Cloud**: AWS EC2, DigitalOcean, Google Cloud
- **Serverless**: Heroku, Railway, Render
- **Containers**: Docker + Kubernetes

**Modelos de Negócio:**
- 💰 **SaaS Hospedado**: R$ 97-397/mês (você hospeda)
- 🏠 **Self-Hosted**: R$ 1.997 + setup (cliente hospeda)

## 📈 Resultados Esperados

- 📈 **300% mais leads** capturados automaticamente
- 💰 **15-25% conversão** em agendamentos/vendas
- ⏱️ **80% menos tempo** de atendimento inicial
- 🤖 **90% automação** das consultas básicas
- 📱 **Atendimento 24/7** sem intervenção manual

## 🤝 Contribuição & Licença

Contribuições são bem-vindas! Este projeto está sob licença MIT.

**Desenvolvido por Lucas Teixeira** | [GitHub](https://github.com/lucasteixeirati)

---

*Se este projeto foi útil, considere dar uma ⭐!*