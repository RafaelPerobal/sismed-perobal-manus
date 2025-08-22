function renderRecentItems() {
    const recentPacBody = document.getElementById('recentPacBody');
    const recentMedBody = document.getElementById('recentMedBody');

    if (recentPacBody) {
        const patients = (store.get(KEYS.patients, []) || []).slice(-5).reverse(); // Last 5
        recentPacBody.innerHTML = '';
        patients.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div>${p.nome}</div>
                    <div class="text-sm text-secondary">${p.data_nascimento}</div>
                </td>
                <td>${p.cns}</td>
                <td class="actions-inline">
                    <a class="btn" href="receitas.html?pacienteId=${p.id}">Receita</a>
                </td>`;
            recentPacBody.appendChild(tr);
        });
    }

    if (recentMedBody) {
        const meds = (store.get(KEYS.meds, []) || []).slice(-5).reverse(); // Last 5
        recentMedBody.innerHTML = '';
        meds.forEach(m => {
            const tr = document.createElement('tr');
            const tipo = m.controlado ? '<span class="controlled-text">Controlado</span>' : 'Comum';
            tr.innerHTML = `
                <td>
                    <div>${m.nome}</div>
                    <div class="text-sm text-secondary">${m.dosagem}</div>
                </td>
                <td>${tipo}</td>
                <td class="actions-inline">
                    <a class="btn" href="medicamentos.html">Ver</a>
                </td>`;
            recentMedBody.appendChild(tr);
        });
    }
}

function updateUserInterface() {
    const prof = getProfessional();
    const userInitial = document.getElementById('userInitial');
    const userName = document.getElementById('userName');
    const userType = document.getElementById('userType');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const hdrProf = document.getElementById('hdr-prof');
    
    if (prof && prof.nome) {
        // Usuário logado
        if (userInitial) userInitial.textContent = prof.nome.charAt(0).toUpperCase();
        if (userName) userName.textContent = prof.nome;
        if (userType) userType.textContent = `${prof.tipo}${prof.especialidade ? ' - ' + prof.especialidade : ''}${prof.registro !== 'VISITANTE' ? ' - ' + prof.registro : ''}`;
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-flex';
        if (hdrProf) hdrProf.textContent = prof.nome;
    } else {
        // Usuário não logado
        if (userInitial) userInitial.textContent = '?';
        if (userName) userName.textContent = 'Usuário não identificado';
        if (userType) userType.textContent = 'Faça login para acessar o sistema';
        if (loginBtn) loginBtn.style.display = 'inline-flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (hdrProf) hdrProf.textContent = 'Não identificado';
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const kpiPac = document.getElementById('kpiPac');
  const kpiMed = document.getElementById('kpiMed');
  if (kpiPac) kpiPac.textContent = (store.get(KEYS.patients, []) || []).length;
  if (kpiMed) kpiMed.textContent = (store.get(KEYS.meds, []) || []).length;

  renderRecentItems();
  updateUserInterface();

  // Logout functionality
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja sair do sistema?')) {
        store.del(KEYS.prof);
        sessionStorage.removeItem(KEYS.prof);
        updateUserInterface();
        showNotification('Logout realizado com sucesso.', 'info');
      }
    });
  }

  // Backup functionality
  const btnBackup = document.getElementById('btnBackup');
  if (btnBackup) {
    btnBackup.addEventListener('click', () => {
      const data = {
        professional: getProfessional(),
        patients: store.get(KEYS.patients, []),
        medicines: store.get(KEYS.meds, []),
        theme: store.get(KEYS.theme),
        logoSistema: store.get(KEYS.logoSistema),
        logoReceita: store.get(KEYS.logoReceita)
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sismed_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showNotification('Backup exportado com sucesso.', 'success');
    });
  }

  // Import functionality
  const importFile = document.getElementById('import-file');
  if (importFile) {
    importFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          
          if (data.professional) setProfessional(data.professional, true);
          if (data.patients) store.set(KEYS.patients, data.patients);
          if (data.medicines) store.set(KEYS.meds, data.medicines);
          if (data.theme) store.set(KEYS.theme, data.theme);
          if (data.logoSistema) store.set(KEYS.logoSistema, data.logoSistema);
          if (data.logoReceita) store.set(KEYS.logoReceita, data.logoReceita);
          
          updateUserInterface();
          if (kpiPac) kpiPac.textContent = (store.get(KEYS.patients, []) || []).length;
          if (kpiMed) kpiMed.textContent = (store.get(KEYS.meds, []) || []).length;
          
          showNotification('Backup importado com sucesso.', 'success');
          
          // Reload page to apply all changes
          setTimeout(() => location.reload(), 1000);
        } catch (error) {
          showNotification('Erro ao importar backup. Verifique o arquivo.', 'error');
        }
      };
      reader.readAsText(file);
      
      // Reset input
      e.target.value = '';
    });
  }
});