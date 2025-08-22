let editingId = null;
let currentSearchTerm = '';

function renderMedicines(list, isSearchResult = false) {
  const tbody = document.getElementById('medBody');
  const searchInfo = document.getElementById('searchInfo');
  const searchResults = document.getElementById('searchResults');
  const clearSearchBtn = document.getElementById('medClearSearch');
  
  tbody.innerHTML = '';
  list.forEach(m => {
    const tr = document.createElement('tr');
    const tipo = m.controlado ? '<span class="controlled-text">Controlado</span>' : 'Comum';
    tr.innerHTML = `
      <td>${m.nome}</td>
      <td>${m.dosagem}</td>
      <td>${m.apresentacao}</td>
      <td>${tipo}</td>
      <td class="actions-inline">
        <button class="btn" data-edit="${m.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
            <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
          </svg>
          <span>Editar</span>
        </button>
        <button class="btn danger" data-del="${m.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
            <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
          </svg>
          <span>Excluir</span>
        </button>
      </td>`;
    tbody.appendChild(tr);
  });
  
  // Atualizar contador
  document.getElementById('medCount').textContent = `${list.length} medicamento(s) cadastrado(s)`;
  
  // Mostrar/ocultar informações de busca
  if (isSearchResult && currentSearchTerm) {
    searchInfo.style.display = 'block';
    searchResults.textContent = list.length;
    clearSearchBtn.style.display = 'inline-flex';
  } else {
    searchInfo.style.display = 'none';
    clearSearchBtn.style.display = 'none';
  }
  
  // Adicionar event listeners
  tbody.querySelectorAll('button[data-edit]').forEach(b => b.onclick = () => openModal(+b.dataset.edit));
  tbody.querySelectorAll('button[data-del]').forEach(b => b.onclick = () => delMedicine(+b.dataset.del));
}

function performSearch() {
  const searchTerm = document.getElementById('medSearch').value.toLowerCase().trim();
  const allMedicines = loadMedicines();
  
  if (!searchTerm) {
    currentSearchTerm = '';
    renderMedicines(allMedicines, false);
    return;
  }
  
  currentSearchTerm = searchTerm;
  const filtered = allMedicines.filter(m => 
    m.nome.toLowerCase().includes(searchTerm)
  );
  
  renderMedicines(filtered, true);
  
  // Se não encontrou nenhum resultado, mostrar mensagem
  if (filtered.length === 0) {
    showNotification('Nenhum medicamento encontrado com os critérios de busca.', 'info');
  }
}

function clearSearch() {
  document.getElementById('medSearch').value = '';
  currentSearchTerm = '';
  renderMedicines(loadMedicines(), false);
  showNotification('Busca limpa. Mostrando todos os medicamentos.', 'info');
}

function loadMedicines() { return store.get(KEYS.meds, []); }
function saveMedicines(list) { store.set(KEYS.meds, list); }

function openModal(id) {
  const modal = document.getElementById('modal');
  const list = loadMedicines();
  const m = list.find(x => x.id === id) || null;
  editingId = m ? m.id : null;
  document.getElementById('mNome').value = m ? m.nome : '';
  document.getElementById('mDosagem').value = m ? m.dosagem : '';
  document.getElementById('mApres').value = m ? m.apresentacao : '';
  document.getElementById('mCtl').value = m ? (m.controlado ? '1' : '0') : '0';
  modal.classList.remove('hidden');
}

function closeModal() { 
  document.getElementById('modal').classList.add('hidden'); 
}

function delMedicine(id) {
  if (!confirm('Tem certeza que deseja excluir este medicamento?')) return;
  const list = loadMedicines().filter(x => x.id !== id);
  saveMedicines(list);
  
  // Se estava em busca, refazer a busca
  if (currentSearchTerm) {
    performSearch();
  } else {
    renderMedicines(list);
  }
  
  showNotification('Medicamento excluído com sucesso.', 'success');
}

function saveMedicine() {
  const nome = document.getElementById('mNome').value.trim().toUpperCase();
  const dosagem = document.getElementById('mDosagem').value.trim();
  const apresentacao = document.getElementById('mApres').value.trim();
  const controlado = document.getElementById('mCtl').value === '1';
  
  if (!nome || !dosagem || !apresentacao) { 
    showNotification('Preencha todos os campos obrigatórios.', 'warning'); 
    return; 
  }
  
  const list = loadMedicines();
  
  // Verificar se medicamento já existe (exceto para o próprio medicamento em edição)
  const existingMed = list.find(m => m.nome === nome && m.dosagem === dosagem && m.id !== editingId);
  if (existingMed) {
    showNotification('Já existe um medicamento cadastrado com este nome e dosagem.', 'warning');
    return;
  }
  
  if (editingId) {
    const m = list.find(x => x.id === editingId);
    m.nome = nome; 
    m.dosagem = dosagem; 
    m.apresentacao = apresentacao;
    m.controlado = controlado;
    showNotification('Medicamento atualizado com sucesso.', 'success');
  } else {
    const id = list.length ? Math.max(...list.map(x => x.id)) + 1 : 1;
    list.push({ id, nome, dosagem, apresentacao, controlado });
    showNotification('Medicamento cadastrado com sucesso.', 'success');
  }
  
  saveMedicines(list);
  
  // Se estava em busca, refazer a busca
  if (currentSearchTerm) {
    performSearch();
  } else {
    renderMedicines(list);
  }
  
  closeModal();
}

document.addEventListener('DOMContentLoaded', () => {
  const list = loadMedicines();
  renderMedicines(list);
  
  // Event listeners
  document.getElementById('medNewBtn').onclick = () => openModal(null);
  document.getElementById('modalCancel').onclick = closeModal;
  document.getElementById('modalOk').onclick = saveMedicine;
  document.getElementById('medSearchBtn').onclick = performSearch;
  document.getElementById('medClearSearch').onclick = clearSearch;
  
  // Busca ao pressionar Enter
  document.getElementById('medSearch').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
  
  // Atualizar header com informações do profissional
  const prof = getProfessional();
  const hdrProf = document.getElementById('hdr-prof');
  if (hdrProf && prof && prof.nome) {
    hdrProf.textContent = prof.nome;
  }
});

