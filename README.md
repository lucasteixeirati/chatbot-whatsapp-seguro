# 🤖 ChatBot WhatsApp Seguro

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Security](https://img.shields.io/badge/Security-Hardened-brightgreen.svg)](#recursos-de-segurança)
[![Commercial](https://img.shields.io/badge/Commercial-Ready-orange.svg)](#versão-comercial)

Bot completo para WhatsApp com **foco em segurança** e **recursos comerciais avançados**. Inclui sistema de leads, vendas automatizadas, analytics e muito mais.

## 📋 Índice

- [Recursos](#-recursos)
- [Versões Disponíveis](#-versões-disponíveis)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Funcionalidades Comerciais](#-funcionalidades-comerciais)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Expansão Comercial](#-expansão-comercial)
- [Segurança](#-segurança)
- [Contribuição](#-contribuição)

## 🚀 Recursos

### Versão Básica
- ✅ **Respostas automáticas** por palavras-chave
- ✅ **Validação de entrada** segura
- ✅ **Autenticação local** persistente
- ✅ **Logs de segurança** completos

### Versão Comercial
- 💼 **Sistema completo de vendas**
- 👥 **Captura e gestão de leads**
- 📊 **Analytics avançado** com métricas
- 🛍️ **Catálogo de produtos** interativo
- 📱 **Menu comercial** profissional
- 🎯 **Funil de vendas** automatizado
- 📈 **Relatórios de performance**
- 🏥 **Demonstrações por profissão** com imagens
- 📸 **Cartões profissionais** personalizados

## 📦 Versões Disponíveis

| Versão | Comando | Descrição |
|--------|---------|----------|
| **Básica** | `npm start` | Bot simples com respostas básicas |
| **Comercial** | `npm run commercial` | Sistema completo de vendas |
| **Relatórios** | `npm run report` | Gera relatórios de performance |

## 🛠 Instalação

### Pré-requisitos
- Node.js 16 ou superior
- NPM ou Yarn
- WhatsApp instalado no celular

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
# Versão básica
npm start

# OU versão comercial (recomendado)
npm run commercial
```

4. **Escaneie o QR Code** que aparecerá no terminal

## 💬 Como Usar

### Comandos da Versão Básica
- `oi` / `olá` - Saudação inicial
- `menu` - Exibe opções
- `dia` / `tarde` / `noite` - Saudações por período

### Menu da Versão Comercial

**Demonstrações Profissionais:**
- 🦷 `5` - Dentista (Dr. Carlos Silva)
- 👩⚕️ `6` - Médico (Dra. Ana Costa)
- ⚖️ `7` - Advogado (Dr. Roberto Lima)
- 🧠 `8` - Psicólogo (Dra. Maria Santos)
- 🏃♂️ `9` - Fisioterapeuta (Dr. João Oliveira)
- 🏗️ `0` - Engenheiro (Eng. Pedro Almeida)

**Opções Gerais:**
- `1` - Ver catálogo de produtos
- `2` - Fazer pedido
- `3` - Suporte técnico
- `4` - Falar com atendente humano
- `contato` - Informações de contato
- `!stats` - Estatísticas do bot

### Exemplo de Interação Comercial
```
Usuário: oi
Bot: Olá João! 👋

     Seja bem-vindo(a)! Sou seu assistente virtual.
     
     📋 Menu Principal:
     
     💼 Demonstrações por Profissão:
     🦷 5 - Dentista
     👩⚕️ 6 - Médico
     ⚖️ 7 - Advogado
     🧠 8 - Psicólogo
     🏃♂️ 9 - Fisioterapeuta
     🏗️ 0 - Engenheiro
     
     Digite o número da opção desejada!

Usuário: 5
Bot: [Envia imagem + texto do dentista]
     🦷 Dr. Carlos Silva - Odontologia
     
     👨⚕️ CRO-SP 12345
     📍 Vila Madalena - São Paulo
     ⭐ 15 anos de experiência
     
     📞 Contatos:
     📱 (11) 99999-1234
     📧 contato@drcarlossilva.com.br
     
     💰 Serviços:
     • Limpeza Dental - R$ 120
     • Clareamento - R$ 450
     • Implante Dentário - R$ 2500
     
     📱 Agende sua consulta!
```

## 💼 Funcionalidades Comerciais

### Demonstrações Profissionais
- 📸 **Cartões visuais** com imagem + informações
- 🦷 **6 profissões** pré-configuradas
- 📞 **Dados completos** (CRM, endereço, contatos)
- 💰 **Lista de serviços** com preços
- 🕰️ **Horários de funcionamento**
- 📱 **Call-to-action** para agendamento

### Sistema de Leads
- **Captura automática** de dados do cliente
- **Histórico completo** de interações
- **Classificação** por engajamento (cold/warm/hot)
- **Status de conversão** em tempo real

### Analytics e Métricas
- 📈 **Total de mensagens** processadas
- 👥 **Número de leads** capturados
- 💰 **Taxa de conversão** calculada
- 📊 **Relatórios detalhados** de performance

### Catálogo de Produtos
- 🛍️ **Apresentação automática** de produtos
- 💰 **Preços atualizados**
- 📝 **Descrições detalhadas**
- 🛒 **Processo de pedido** guiado

## 📁 Estrutura do Projeto

```
chatbot-whatsapp-seguro/
├── robo.js                 # Bot básico
├── bot-comercial.js        # Bot comercial completo
├── bot-teste.js            # Bot para testes
├── assets/
│   └── images/             # Imagens dos profissionais
│       ├── dentista.jpg
│       ├── medico.jpg
│       ├── advogado.jpg
│       ├── psicologo.jpg
│       ├── fisioterapeuta.jpg
│       └── engenheiro.jpg
├── config/
│   └── business.js         # Configurações comerciais
├── src/
│   ├── leadManager.js      # Gestão de leads
│   ├── commercialResponses.js # Respostas comerciais
│   └── analytics.js        # Sistema de métricas
├── database/
│   └── analytics.json      # Dados de analytics
├── package.json            # Dependências e scripts
├── .gitignore             # Arquivos ignorados
└── README.md              # Esta documentação
```

## 🚀 Expansão Comercial

### Próximos Passos para Escalar

**1. Integrações de Pagamento:**
- 💳 Stripe, PagSeguro, Mercado Pago
- 🏦 PIX automático
- 💰 Checkout integrado

**2. CRM e Automação:**
- 📊 HubSpot, Pipedrive, RD Station
- 📧 Email marketing automático
- 🎯 Segmentação avançada

**3. IA e Machine Learning:**
- 🤖 Processamento de linguagem natural
- 🎯 Recomendações personalizadas
- 📈 Previsão de vendas

**4. Multi-canal:**
- 📱 Instagram, Telegram, Facebook
- 🌐 Integração com site/e-commerce
- 📞 Central de atendimento

### Modelos de Monetização
- 💰 **SaaS** - Venda como serviço
- 🏢 **White Label** - Licenciamento
- 🎯 **Consultoria** - Implementação personalizada
- 📈 **Comissões** - Parcerias estratégicas

## 🔒 Segurança

- ✅ **Validação rigorosa** de entrada
- ✅ **Sanitização** de dados
- ✅ **Tratamento de erros** robusto
- ✅ **Dependências atualizadas**
- ✅ **Logs de segurança** detalhados
- ✅ **Autenticação local** segura

## 📊 Comandos Úteis

```bash
# Executar versão básica
npm start

# Executar versão comercial (recomendado)
npm run commercial

# Executar bot de teste
node bot-teste.js

# Gerar relatório de performance
npm run report

# Ver estatísticas em tempo real
# (envie !stats no WhatsApp)

# Instalar dependências
npm install

# Verificar vulnerabilidades
npm audit
```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## ⚠️ Avisos Importantes

- 🔐 **Nunca compartilhe credenciais** em repositórios públicos
- 🔄 **Mantenha dependências atualizadas** regularmente
- 🛡️ **Use em ambiente seguro** para produção
- 📱 **Respeite os Termos de Uso** do WhatsApp
- 💼 **Teste em ambiente de desenvolvimento** antes de usar comercialmente

## 📈 Performance

- ⚡ **Resposta rápida** (< 2 segundos)
- 🔄 **Processamento assíncrono**
- 💾 **Baixo uso de memória**
- 📊 **Métricas em tempo real**
- 🛡️ **Tratamento de erros** robusto

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 🎯 Resultados Esperados

### Para Profissionais Autônomos:
- 📈 **Aumento de 300%** na captura de leads
- 💰 **Conversão de 15-25%** em agendamentos
- ⏱️ **Redução de 80%** no tempo de atendimento inicial
- 🤖 **Automação de 90%** das consultas básicas
- 📱 **Atendimento 24/7** sem intervenção manual

### Profissões Atendidas:
- 🦷 **Dentistas** - Agendamentos e informações
- 👩⚕️ **Médicos** - Consultas e telemedicina
- ⚖️ **Advogados** - Consultorias e processos
- 🧠 **Psicólogos** - Terapias e atendimentos
- 🏃♂️ **Fisioterapeutas** - Sessões e tratamentos
- 🏗️ **Engenheiros** - Projetos e consultorias

*Se este projeto foi útil, considere dar uma ⭐!*

**Desenvolvido por Lucas Teixeira** | [GitHub](https://github.com/lucasteixeirati)