document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formIdentificacao');
    const tipoUsuario = document.getElementById('tipoUsuario');
    const especialidadeField = document.getElementById('especialidadeField');
    const registroField = document.getElementById('registroField');
    const registroProfissional = document.getElementById('registroProfissional');
    const nomeCompleto = document.getElementById('nomeCompleto');
    const especialidade = document.getElementById('especialidade');
    const lembrarDados = document.getElementById('lembrarDados');
    const btnLimpar = document.getElementById('btnLimpar');

    // Carregar dados salvos se existirem
    const dadosSalvos = getProfessional();
    if (dadosSalvos) {
        tipoUsuario.value = dadosSalvos.tipo || '';
        nomeCompleto.value = dadosSalvos.nome || '';
        registroProfissional.value = dadosSalvos.registro || '';
        especialidade.value = dadosSalvos.especialidade || '';
        lembrarDados.checked = !!store.get(KEYS.prof);
        
        // Trigger change event to show/hide fields
        tipoUsuario.dispatchEvent(new Event('change'));
    }

    // Gerenciar visibilidade dos campos baseado no tipo de usuário
    tipoUsuario.addEventListener('change', (e) => {
        const tipo = e.target.value;
        
        // Campo de especialidade - apenas para médicos
        if (tipo === 'Médico') {
            especialidadeField.style.display = 'block';
            especialidade.required = false; // Opcional para médicos
        } else {
            especialidadeField.style.display = 'none';
            especialidade.required = false;
            especialidade.value = '';
        }
        
        // Campo de registro profissional - não obrigatório para visitantes
        if (tipo === 'Visitante') {
            registroField.style.display = 'none';
            registroProfissional.required = false;
            registroProfissional.value = 'VISITANTE';
        } else {
            registroField.style.display = 'block';
            registroProfissional.required = true;
            if (registroProfissional.value === 'VISITANTE') {
                registroProfissional.value = '';
            }
        }
    });

    // Submissão do formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const tipo = tipoUsuario.value.trim();
        const nome = nomeCompleto.value.trim().toUpperCase();
        const registro = registroProfissional.value.trim();
        const esp = especialidade.value.trim();
        const lembrar = lembrarDados.checked;
        
        // Validações
        if (!tipo || !nome) {
            showNotification('Preencha os campos obrigatórios.', 'warning');
            return;
        }
        
        if (tipo !== 'Visitante' && !registro) {
            showNotification('Registro profissional é obrigatório para este tipo de usuário.', 'warning');
            return;
        }
        
        // Preparar dados do profissional
        const dadosProfissional = {
            tipo: tipo,
            nome: nome,
            registro: tipo === 'Visitante' ? 'VISITANTE' : registro,
            especialidade: tipo === 'Médico' ? esp : ''
        };
        
        // Salvar dados
        setProfessional(dadosProfissional, lembrar);
        
        showNotification('Identificação realizada com sucesso!', 'success');
        
        // Redirecionar para a tela principal após um breve delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });

    // Limpar dados
    btnLimpar.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja limpar todos os dados salvos?')) {
            store.del(KEYS.prof);
            sessionStorage.removeItem(KEYS.prof);
            form.reset();
            tipoUsuario.dispatchEvent(new Event('change'));
            showNotification('Dados limpos com sucesso.', 'info');
        }
    });
});

