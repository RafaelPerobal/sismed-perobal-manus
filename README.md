SISMED Perobal — Manual Técnico e de Arquitetura
Este documento fornece uma visão geral completa do sistema SISMED Perobal, detalhando a sua funcionalidade, arquitetura de ficheiros e as instruções necessárias para a sua correta instalação e utilização.

1. Visão Geral e Funcionalidades
O SISMED Perobal é um sistema de gestão de saúde local, desenvolvido para operar offline diretamente no navegador (cliente-side). Ele foi projetado para ser simples, rápido e seguro, armazenando todos os dados no computador do utilizador através do localStorage do navegador.

Principais Funcionalidades:

Identificação do Profissional: Permite que o profissional de saúde insira os seus dados, que serão utilizados para assinar digitalmente as receitas geradas.

Gestão de Pacientes (CRUD): Funcionalidade completa para Criar, Ler, Atualizar e Excluir (CRUD) registos de pacientes, incluindo nome, data de nascimento e CNS.

Gestão de Medicamentos (CRUD): Cadastro completo de medicamentos, com informações sobre nome, dosagem, apresentação e se é de controlo especial.

Emissão de Receitas: Ferramenta para gerar receitas médicas personalizadas, com um atalho direto da lista de pacientes para agilizar o processo.

Impressão Profissional: As receitas são formatadas para impressão em papel A4, incluindo o logótipo da prefeitura, dados do profissional e do paciente, e um identificador único.

Backup e Restauração: Funcionalidades para exportar todos os dados para um ficheiro JSON e importar dados a partir de um ficheiro de backup, garantindo a segurança e a recuperação das informações.

Pré-Cadastro: O sistema já vem com uma lista inicial de 35 pacientes e 36 medicamentos para facilitar o início da utilização.

2. Arquitetura do Projeto
O sistema foi construído com tecnologias web padrão (HTML, CSS e JavaScript puro), garantindo compatibilidade e eliminando a necessidade de um servidor ou acesso à internet.

Estrutura de Pastas e Ficheiros
SISMED_Perobal/
│
├── 📄 index.html             # Ecrã inicial, identificação e painel principal
├── 📄 pacientes.html         # Interface de gestão de pacientes
├── 📄 medicamentos.html      # Interface de gestão de medicamentos
├── 📄 receitas.html           # Interface para emissão de receitas
│
├── 📁 css/
│   └── 📄 style.css           # Folha de estilos global para toda a aplicação
│
├── 📁 js/
│   ├── 📄 common.js           # Funções utilitárias, gestão do localStorage e dados iniciais
│   ├── 📄 main.js             # Lógica do ecrã inicial (incluindo import/export)
│   ├── 📄 pacientes.js        # Lógica do CRUD de pacientes
│   ├── 📄 medicamentos.js     # Lógica do CRUD de medicamentos
│   └── 📄 receitas.js         # Lógica da geração e impressão de receitas
│
├── 🖼️ logo_sis_med.png        # Logótipo do sistema (usado na interface)
└── 🖼️ logo_adminstra.png      # Logótipo da prefeitura (usado nas receitas)

3. Instruções de Montagem e Instalação
Crie a Pasta Principal: Crie uma pasta no seu computador com o nome SISMED_Perobal.

Crie as Subpastas: Dentro da pasta SISMED_Perobal, crie as subpastas css e js.

Posicione os Ficheiros:

Coloque os ficheiros index.html, pacientes.html, medicamentos.html, receitas.html, logo_sis_med.png e logo_adminstra.png diretamente dentro de SISMED_Perobal.

Coloque o ficheiro style.css dentro da pasta css.

Coloque todos os ficheiros JavaScript (common.js, main.js, etc.) dentro da pasta js.

Execute a Aplicação: Para iniciar o sistema, basta abrir o ficheiro index.html no seu navegador de preferência.