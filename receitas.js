let rxState = { patientId: null, months: 1, selectedMedIds: [], items: [] };

function loadPatients() { return store.get(KEYS.patients, []); }
function loadMeds() { return store.get(KEYS.meds, []); }

function renderRxSelect() {
  const psel = document.getElementById('rxPatient');
  const patients = loadPatients();
  psel.innerHTML = '<option value="">Selecione um paciente...</option>' + patients.map(p => `<option value="${p.id}">${p.nome} • CNS ${p.cns}</option>`).join('');
  
  const tbody = document.getElementById('rxMedBody');
  const meds = loadMeds();
  tbody.innerHTML = '';
  meds.forEach(m => {
    const tr = document.createElement('tr');
    const tipoMedicamento = m.controlado ? '<span class="controlled-text">CONTROLADO</span>' : 'Comum';
    tr.innerHTML = `
      <td><input type="checkbox" data-pick="${m.id}"></td>
      <td>${m.nome}</td>
      <td>${m.dosagem}</td>
      <td>${m.apresentacao}</td>
      <td>${tipoMedicamento}</td>`;
    tbody.appendChild(tr);
  });
}

function collectSelections() {
  const pid = +document.getElementById('rxPatient').value;
  if (!pid) { 
    showNotification('Por favor, selecione um paciente.', 'warning');
    return false; 
  }
  const months = +document.getElementById('rxMonths').value;
  const picked = Array.from(document.querySelectorAll('input[type="checkbox"][data-pick]:checked')).map(x => +x.dataset.pick);
  if (picked.length === 0) { 
    showNotification('Selecione pelo menos 1 medicamento.', 'warning');
    return false; 
  }
  rxState.patientId = pid;
  rxState.months = Math.max(1, Math.min(6, months));
  rxState.selectedMedIds = picked;
  rxState.items = loadMeds().filter(m => picked.includes(m.id));

  const hasControlled = rxState.items.some(item => item.controlado);
  if (hasControlled && rxState.months > 1) {
    showNotification(`Atenção: Está a gerar ${rxState.months} receitas mensais que incluem medicamento controlado.`, 'info');
  }

  return true;
}

function renderRxPoso() {
  const box = document.getElementById('rxPosoList');
  box.innerHTML = '';
  rxState.items.forEach(it => {
    const wrap = document.createElement('div');
    wrap.className = 'card posology-card';
    const tipoMedicamento = it.controlado ? '<span class="controlled-text">(CONTROLADO)</span>' : '';
    const posologyRequired = it.controlado ? 'Posologia *' : 'Posologia (Opcional)';
    
    wrap.innerHTML = `
      <div><strong>${it.nome} ${it.dosagem} • ${it.apresentacao}</strong> ${tipoMedicamento}</div>
      <div class="grid-2" style="margin-top:8px">
        <label class="field">
          <span>${posologyRequired}</span>
          <textarea data-poso="${it.id}" rows="2" placeholder="Ex.: 1 comprimido a cada 8 horas"></textarea>
        </label>
        <label class="field">
          <span>Quantidade *</span>
          <input data-qty="${it.id}" type="number" min="1" value="1">
        </label>
      </div>`;
    box.appendChild(wrap);
  });
}

function buildAndSaveRecipe() {
  const prof = getProfessional();
  if (!prof || !prof.nome || !prof.registro) {
    showNotification('Ação bloqueada: Por favor, identifique-se no ecrã inicial antes de gerar receitas.', 'error');
    return null;
  }

  const patient = loadPatients().find(p => p.id === rxState.patientId);
  const baseDate = new Date();
  const months = rxState.months;
  
  const items = rxState.items.map(m => ({
    ...m,
    poso: (document.querySelector(`textarea[data-poso="${m.id}"]`) || {}).value || '',
    qty: +((document.querySelector(`input[data-qty="${m.id}"]`) || {}).value || 1)
  }));

  // Validar posologia para medicamentos controlados
  for (const it of items) {
    if (it.controlado && (!it.poso || !it.poso.trim())) {
      showNotification('Por favor, informe a posologia para o medicamento controlado: ' + it.nome, 'warning');
      return null;
    }
  }

  const obs = (document.getElementById('rxObs').value || '').trim();
  const root = document.getElementById('printRoot');
  root.innerHTML = '';
  
  // Gerar receitas para cada mês
  for (let monthIndex = 0; monthIndex < months; monthIndex++) {
    const receiptDate = new Date(baseDate);
    receiptDate.setMonth(receiptDate.getMonth() + monthIndex);
    
    // Gerar 2 vias para cada receita (farmácia e paciente)
    for (let via = 1; via <= 2; via++) {
      const viaLabel = via === 1 ? 'VIA FARMÁCIA' : 'VIA PACIENTE';
      
      const receiptHtml = `
        <div class="receipt-page">
          <div class="receipt-header">
            <div class="logo-section">
              <img src="logo_adminstr.png" alt="Logo Prefeitura" class="receipt-logo">
            </div>
            <div class="header-info">
              <h1>PREFEITURA DE PEROBAL</h1>
              <h2>SECRETARIA MUNICIPAL DE SAÚDE</h2>
              <h3>RECEITUÁRIO MÉDICO</h3>
              <div class="via-label">${viaLabel}</div>
            </div>
          </div>
          
          <div class="receipt-content">
            <div class="patient-info">
              <p><strong>Paciente:</strong> ${patient.nome}</p>
              <p><strong>CNS:</strong> ${patient.cns}</p>
              <p><strong>Data de Nascimento:</strong> ${fmtDate(patient.data_nascimento)}</p>
              <p><strong>Data de Emissão:</strong> ${receiptDate.toLocaleDateString('pt-BR')}</p>
            </div>
            
            <div class="medications">
              <h4>Medicamentos Prescritos:</h4>
              ${items.map(item => `
                <div class="medication-item">
                  <p><strong>${item.nome}</strong> ${item.dosagem} - ${item.apresentacao}</p>
                  <p><strong>Quantidade:</strong> ${item.qty}</p>
                  ${item.poso ? `<p><strong>Posologia:</strong> ${item.poso}</p>` : ''}
                  ${item.controlado ? '<p class="controlled-med">MEDICAMENTO CONTROLADO</p>' : ''}
                </div>
              `).join('')}
            </div>
            
            ${obs ? `<div class="observations"><h4>Observações:</h4><p>${obs}</p></div>` : ''}
            
            <div class="signature-section">
              <div class="signature-line">
                <p><strong>${prof.nome}</strong></p>
                <p>${prof.tipo}${prof.especialidade ? ' - ' + prof.especialidade : ''}</p>
                <p>${prof.registro !== 'VISITANTE' ? prof.registro : ''}</p>
                <div class="signature-space">_________________________</div>
                <p>Assinatura e Carimbo</p>
              </div>
            </div>
          </div>
        </div>
      `;
      
      root.innerHTML += receiptHtml;
    }
  }

  // Salvar no histórico da sessão
  const history = JSON.parse(sessionStorage.getItem('sismed_session_recipes') || '[]');
  const recipeRecord = {
      id: uid(),
      patientName: patient.nome,
      timestamp: new Date().toISOString(),
      months: months,
      meds: items.map(i => i.nome).join(', '),
      html: root.innerHTML
  };
  history.unshift(recipeRecord);
  sessionStorage.setItem('sismed_session_recipes', JSON.stringify(history));
  renderSessionHistory();

  return { root, patient };
}

function doPrint() {
  const result = buildAndSaveRecipe();
  if (!result) return;
  
  const { root, patient } = result;
  
  // Nomenclatura dinâmica do ficheiro
  const originalTitle = document.title;
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-');
  document.title = `Receita_${patient.nome.replace(/ /g, '_')}_${timestamp}`;

  root.style.display = 'block';
  window.print();
  root.style.display = 'none';
  
  document.title = originalTitle; // Restaura o título original
}

// Função para renderizar o histórico da sessão
function renderSessionHistory() {
    const history = JSON.parse(sessionStorage.getItem('sismed_session_recipes') || '[]');
    const historySection = document.getElementById('sessionHistory');
    const historyBody = document.getElementById('historyBody');

    if (history.length === 0) {
        historySection.classList.add('hidden');
        return;
    }

    historySection.classList.remove('hidden');
    historyBody.innerHTML = '';

    history.forEach(rec => {
        const tr = document.createElement('tr');
        const timestamp = new Date(rec.timestamp).toLocaleString('pt-BR');
        const monthsText = rec.months ? `${rec.months} mês(es)` : '1 mês';
        tr.innerHTML = `
            <td>${rec.patientName}</td>
            <td>${timestamp}</td>
            <td>${rec.meds}</td>
            <td>${monthsText}</td>
            <td class="actions-inline">
                <button class="btn" data-reprint-id="${rec.id}">Reimprimir</button>
            </td>
        `;
        historyBody.appendChild(tr);
    });

    // Adicionar eventos aos botões de reimprimir
    historyBody.querySelectorAll('button[data-reprint-id]').forEach(btn => {
        btn.onclick = () => {
            const id = btn.dataset.reprintId;
            const rec = history.find(r => r.id === id);
            if (rec) {
                const printRoot = document.getElementById('printRoot');
                printRoot.innerHTML = rec.html;
                printRoot.style.display = 'block';
                window.print();
                printRoot.style.display = 'none';
            }
        };
    });
}

document.addEventListener('DOMContentLoaded', () => {
  renderRxSelect();
  renderSessionHistory(); // Carrega o histórico ao iniciar a página

  const urlParams = new URLSearchParams(window.location.search);
  const pacienteId = urlParams.get('pacienteId');
  if (pacienteId) {
    document.getElementById('rxPatient').value = pacienteId;
  }

  document.getElementById('rxMedSearchBtn').onclick = () => { /* ... */ };
  document.getElementById('rxNext').onclick = () => {
    if (!collectSelections()) return;
    document.getElementById('rxStep2').classList.remove('hidden');
    renderRxPoso();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };
  document.getElementById('rxBack').onclick = () => { /* ... */ };
  document.getElementById('rxGenerate').onclick = doPrint;
});