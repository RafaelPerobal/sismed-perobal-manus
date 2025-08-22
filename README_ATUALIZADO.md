# SISMED Perobal — Sistema Atualizado v2.0

## Visão Geral das Atualizações

O sistema SISMED Perobal foi completamente atualizado com novas funcionalidades e melhorias na interface. As principais mudanças incluem:

### 🆕 Novas Funcionalidades

1. **Tela de Identificação Inicial**
   - Nova tela de login/identificação como primeira página
   - Suporte para diferentes tipos de usuários: Médico, Enfermeiro, Farmacêutico, Fisioterapeuta, Visitante, Outro
   - Campo de especialidade para médicos
   - Opção de visitante (sem necessidade de registro profissional)

2. **Sistema de Receitas Múltiplas**
   - Geração de receitas para 1 a 6 meses
   - Sempre gera 2 vias (farmácia e paciente) automaticamente
   - Datas automáticas para cada mês (ex: 21/08/2025, 21/09/2025, etc.)
   - PDF único com todas as receitas e vias

3. **Tela de Configurações**
   - Personalização de temas (5 cores disponíveis)
   - Upload de logos personalizados
   - Backup e restauração de dados
   - Informações do sistema

4. **Melhorias na Interface**
   - Busca aprimorada em pacientes e medicamentos
   - Botão "Gerar Receita" direto na lista de pacientes
   - Informações de busca e contadores
   - Interface responsiva melhorada

### 🔧 Melhorias Técnicas

- Validação aprimorada de dados
- Notificações visuais para ações do usuário
- Histórico de receitas da sessão
- Posologia obrigatória para medicamentos controlados
- Cabeçalho de receitas simplificado (removido email, número, QR code)

## Estrutura de Arquivos Atualizada

```
SISMED_Perobal/
│
├── 📄 identificacao.html      # NOVO: Tela de identificação inicial
├── 📄 index.html             # Tela principal (dashboard)
├── 📄 pacientes.html         # Gestão de pacientes (melhorada)
├── 📄 medicamentos.html      # Gestão de medicamentos (melhorada)
├── 📄 receitas.html          # Emissão de receitas (atualizada)
├── 📄 configuracoes.html     # NOVO: Tela de configurações
│
├── 📄 style.css              # Estilos atualizados
│
├── 📁 js/ (scripts JavaScript)
│   ├── 📄 common.js          # Funções comuns (atualizado)
│   ├── 📄 identificacao.js   # NOVO: Lógica da tela de identificação
│   ├── 📄 main.js            # Lógica da tela principal (atualizada)
│   ├── 📄 pacientes.js       # Lógica de pacientes (melhorada)
│   ├── 📄 medicamentos.js    # NOVO: Lógica de medicamentos
│   ├── 📄 receitas.js        # Lógica de receitas (completamente reescrita)
│   └── 📄 configuracoes.js   # NOVO: Lógica de configurações
│
├── 🖼️ logo_sis_med.png       # Logo do sistema
└── 🖼️ logo_adminstr.png      # Logo da prefeitura (receitas)
```

## Fluxo de Uso Atualizado

### 1. Primeira Utilização
1. Abra `identificacao.html` no navegador
2. Selecione seu tipo de usuário
3. Preencha nome completo e registro profissional
4. Para visitantes, o registro é opcional
5. Clique em "Entrar no Sistema"

### 2. Navegação Principal
- **Início**: Dashboard com resumo e acesso rápido
- **Pacientes**: Gestão completa com busca e botão "Gerar Receita"
- **Medicamentos**: Cadastro e gestão de medicamentos
- **Receitas**: Emissão de receitas múltiplas
- **Configurações**: Personalização do sistema

### 3. Geração de Receitas
1. Selecione o paciente
2. Escolha quantos meses (1-6)
3. Selecione medicamentos da lista
4. Preencha posologia (obrigatória para controlados)
5. Adicione observações se necessário
6. Clique em "Gerar e Imprimir"

## Funcionalidades Específicas

### Tipos de Usuário
- **Médico**: Pode prescrever todos os medicamentos, campo de especialidade
- **Enfermeiro**: Prescrições conforme protocolo
- **Farmacêutico**: Gestão de medicamentos
- **Fisioterapeuta**: Prescrições específicas
- **Visitante**: Acesso limitado, sem registro obrigatório
- **Outro**: Outros profissionais de saúde

### Sistema de Receitas
- **1 mês**: 1 receita com 2 vias (data atual)
- **2 meses**: 2 receitas com 2 vias cada (atual + 30 dias)
- **3 meses**: 3 receitas com 2 vias cada (atual + 30 + 60 dias)
- E assim por diante até 6 meses

### Medicamentos Controlados
- Identificação visual especial
- Posologia obrigatória
- Alertas específicos na geração de receitas

## Instalação e Configuração

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Não requer servidor ou internet após download

### Instalação
1. Extraia todos os arquivos em uma pasta
2. Mantenha a estrutura de pastas
3. Abra `identificacao.html` no navegador
4. Faça sua identificação inicial

### Configuração Inicial
1. Acesse "Configurações" no menu
2. Personalize o tema se desejar
3. Altere logos se necessário
4. Configure backup automático

## Backup e Segurança

### Backup Automático
- Exporte dados regularmente via "Configurações"
- Arquivo JSON com todos os dados
- Inclui: pacientes, medicamentos, configurações, logos

### Restauração
- Importe arquivo de backup via "Configurações"
- Substitui todos os dados atuais
- Confirmação dupla para segurança

## Suporte e Manutenção

### Dados Armazenados
- Todos os dados ficam no navegador (localStorage)
- Não há transmissão para servidores externos
- Dados persistem entre sessões

### Limpeza de Dados
- Opção de limpar todos os dados em "Configurações"
- Ação irreversível com confirmação dupla
- Retorna sistema ao estado inicial

## Versão e Compatibilidade

- **Versão**: 2.0.0
- **Data**: 21/08/2025
- **Compatibilidade**: Navegadores modernos
- **Responsivo**: Funciona em desktop e mobile

## Principais Melhorias da v2.0

1. ✅ Tela de identificação com suporte a visitantes
2. ✅ Receitas múltiplas (1-6 meses) sempre em 2 vias
3. ✅ Busca aprimorada em pacientes e medicamentos
4. ✅ Tela de configurações completa
5. ✅ Interface responsiva melhorada
6. ✅ Validações e notificações visuais
7. ✅ Histórico de receitas da sessão
8. ✅ Cabeçalho de receitas simplificado
9. ✅ Sistema de temas personalizáveis
10. ✅ Upload de logos personalizados

---

**Desenvolvido para a Prefeitura de Perobal - Secretaria Municipal de Saúde**

