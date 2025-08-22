document.addEventListener('DOMContentLoaded', () => {
    // Atualizar informações do sistema
    updateSystemInfo();
    
    // Configurar tema
    setupThemeSelector();
    
    // Configurar logos
    setupLogoManagement();
    
    // Configurar dados
    setupDataManagement();
    
    // Atualizar header com informações do profissional
    const prof = getProfessional();
    const hdrProf = document.getElementById('hdr-prof');
    if (hdrProf && prof && prof.nome) {
        hdrProf.textContent = prof.nome;
    }
});

function updateSystemInfo() {
    const totalPatients = document.getElementById('totalPatients');
    const totalMedicines = document.getElementById('totalMedicines');
    
    if (totalPatients) {
        totalPatients.textContent = (store.get(KEYS.patients, []) || []).length;
    }
    
    if (totalMedicines) {
        totalMedicines.textContent = (store.get(KEYS.meds, []) || []).length;
    }
}

function setupThemeSelector() {
    const colorOptions = document.querySelectorAll('.color-option');
    const currentTheme = store.get(KEYS.theme, '#2563eb');
    
    // Marcar tema atual
    colorOptions.forEach(option => {
        if (option.dataset.color === currentTheme) {
            option.classList.add('active');
        }
        
        option.addEventListener('click', () => {
            // Remover active de todos
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Adicionar active ao clicado
            option.classList.add('active');
            
            // Aplicar tema
            const color = option.dataset.color;
            applyTheme(color);
            store.set(KEYS.theme, color);
            
            showNotification('Tema alterado com sucesso!', 'success');
        });
    });
}

function setupLogoManagement() {
    // Logo do Sistema
    const logoSistemaFile = document.getElementById('logoSistemaFile');
    const logoSistemaPreview = document.getElementById('logoSistemaPreview');
    const resetLogoSistema = document.getElementById('resetLogoSistema');
    
    logoSistemaFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                logoSistemaPreview.src = dataUrl;
                store.set(KEYS.logoSistema, dataUrl);
                showNotification('Logo do sistema alterado com sucesso!', 'success');
            };
            reader.readAsDataURL(file);
        }
    });
    
    resetLogoSistema.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja restaurar o logo padrão do sistema?')) {
            logoSistemaPreview.src = 'logo_sis_med.png';
            store.del(KEYS.logoSistema);
            showNotification('Logo do sistema restaurado para o padrão.', 'info');
        }
    });
    
    // Logo das Receitas
    const logoReceitaFile = document.getElementById('logoReceitaFile');
    const logoReceitaPreview = document.getElementById('logoReceitaPreview');
    const resetLogoReceita = document.getElementById('resetLogoReceita');
    
    logoReceitaFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;
                logoReceitaPreview.src = dataUrl;
                store.set(KEYS.logoReceita, dataUrl);
                showNotification('Logo das receitas alterado com sucesso!', 'success');
            };
            reader.readAsDataURL(file);
        }
    });
    
    resetLogoReceita.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja restaurar o logo padrão das receitas?')) {
            logoReceitaPreview.src = 'logo_adminstr.png';
            store.del(KEYS.logoReceita);
            showNotification('Logo das receitas restaurado para o padrão.', 'info');
        }
    });
    
    // Carregar logos salvos
    const savedLogoSistema = store.get(KEYS.logoSistema);
    const savedLogoReceita = store.get(KEYS.logoReceita);
    
    if (savedLogoSistema) {
        logoSistemaPreview.src = savedLogoSistema;
    }
    
    if (savedLogoReceita) {
        logoReceitaPreview.src = savedLogoReceita;
    }
}

function setupDataManagement() {
    const exportData = document.getElementById('exportData');
    const importData = document.getElementById('importData');
    const clearAllData = document.getElementById('clearAllData');
    
    // Exportar dados
    exportData.addEventListener('click', () => {
        exportBackup();
    });
    
    // Importar dados
    importData.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                
                if (confirm('Tem certeza que deseja importar estes dados? Isso substituirá todos os dados atuais.')) {
                    // Importar dados
                    if (data.professional) setProfessional(data.professional, true);
                    if (data.patients) store.set(KEYS.patients, data.patients);
                    if (data.medicines) store.set(KEYS.meds, data.medicines);
                    if (data.theme) {
                        store.set(KEYS.theme, data.theme);
                        applyTheme(data.theme);
                        setupThemeSelector(); // Reconfigurar seletor de tema
                    }
                    if (data.logoSistema) store.set(KEYS.logoSistema, data.logoSistema);
                    if (data.logoReceita) store.set(KEYS.logoReceita, data.logoReceita);
                    
                    updateSystemInfo();
                    setupLogoManagement(); // Recarregar logos
                    
                    showNotification('Dados importados com sucesso!', 'success');
                    
                    // Recarregar página após um tempo
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                }
            } catch (error) {
                showNotification('Erro ao importar dados. Verifique se o arquivo é válido.', 'error');
            }
        };
        reader.readAsText(file);
        
        // Reset input
        e.target.value = '';
    });
    
    // Limpar todos os dados
    clearAllData.addEventListener('click', () => {
        if (confirm('ATENÇÃO: Esta ação irá apagar TODOS os dados do sistema (pacientes, medicamentos, configurações, etc.). Esta ação não pode ser desfeita. Tem certeza que deseja continuar?')) {
            if (confirm('Última confirmação: Todos os dados serão perdidos permanentemente. Continuar?')) {
                // Limpar localStorage
                Object.values(KEYS).forEach(key => {
                    store.del(key);
                });
                
                // Limpar sessionStorage
                sessionStorage.clear();
                
                showNotification('Todos os dados foram removidos. Recarregando sistema...', 'info');
                
                // Recarregar página
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        }
    });
}

