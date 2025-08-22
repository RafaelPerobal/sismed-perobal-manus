let editingId = null;
let currentSearchTerm = '';

function renderPatients(list, isSearchResult = false) {
  const tbody = document.getElementById('pacBody');
  const searchInfo = document.getElementById('searchInfo');
  const searchResults = document.getElementById('searchResults');
  const clearSearchBtn = document.getElementById('pacClearSearch');
  
  tbody.innerHTML = '';
  list.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.nome}</td>
      <td>${fmtDate(p.data_nascimento)}</td>
      <td>${p.cns}</td>
      <td class="actions-inline">
        <a class="btn primary" href="receitas.html?pacienteId=${p.id}">Gerar Receita</a>
        <button class="btn" data-edit="${p.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
            <path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path>
          </svg>
          <span>Editar</span>
        </button>
        <button class="btn danger" data-del="${p.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
            <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path>
          </svg>
          <span>Excluir</span>
        </button>
      </td>`;
    tbody.appendChild(tr);
  });
  
  // Atualizar contador
  document.getElementById('pacCount').textContent = `${list.length} paciente(s) cadastrado(s)`;
  
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
  tbody.querySelectorAll('button[data-del]').forEach(b => b.onclick = () => delPatient(+b.dataset.del));
}

function performSearch() {
  const searchTerm = document.getElementById('pacSearch').value.toLowerCase().trim();
  const allPatients = loadPatients();
  
  if (!searchTerm) {
    currentSearchTerm = '';
    renderPatients(allPatients, false);
    return;
  }
  
  currentSearchTerm = searchTerm;
  const filtered = allPatients.filter(p => 
    p.nome.toLowerCase().includes(searchTerm) || 
    p.cns.includes(searchTerm)
  );
  
  renderPatients(filtered, true);
  
  // Se não encontrou nenhum resultado, mostrar mensagem
  if (filtered.length === 0) {
    showNotification('Nenhum paciente encontrado com os critérios de busca.', 'info');
  }
}

function clearSearch() {
  document.getElementById('pacSearch').value = '';
  currentSearchTerm = '';
  renderPatients(loadPatients(), false);
  showNotification('Busca limpa. Mostrando todos os pacientes.', 'info');
}

function loadPatients() { return store.get(KEYS.patients, []); }
function savePatients(list) { store.set(KEYS.patients, list); }

function openModal(id) {
  const modal = document.getElementById('modal');
  const list = loadPatients();
  const p = list.find(x => x.id === id) || null;
  editingId = p ? p.id : null;
  document.getElementById('fNome').value = p ? p.nome : '';
  document.getElementById('fNasc').value = p ? toISO(p.data_nascimento) : '';
  document.getElementById('fCns').value = p ? p.cns : '';
  modal.classList.remove('hidden');
}

function closeModal() { 
  document.getElementById('modal').classList.add('hidden'); 
}

function delPatient(id) {
  if (!confirm('Tem certeza que deseja excluir este paciente?')) return;
  const list = loadPatients().filter(x => x.id !== id);
  savePatients(list);
  
  // Se estava em busca, refazer a busca
  if (currentSearchTerm) {
    performSearch();
  } else {
    renderPatients(list);
  }
  
  showNotification('Paciente excluído com sucesso.', 'success');
}

function savePatient() {
  const nome = document.getElementById('fNome').value.trim().toUpperCase();
  const nasc = document.getElementById('fNasc').value.trim();
  const cns = document.getElementById('fCns').value.trim();
  
  if (!nome || !nasc || !cns) { 
    showNotification('Preencha todos os campos obrigatórios.', 'warning'); 
    return; 
  }
  
  const list = loadPatients();
  
  // Verificar se CNS já existe (exceto para o próprio paciente em edição)
  const existingCNS = list.find(p => p.cns === cns && p.id !== editingId);
  if (existingCNS) {
    showNotification('Já existe um paciente cadastrado com este CNS.', 'warning');
    return;
  }
  
  if (editingId) {
    const p = list.find(x => x.id === editingId);
    p.nome = nome; 
    p.data_nascimento = nasc; 
    p.cns = cns;
    showNotification('Paciente atualizado com sucesso.', 'success');
  } else {
    const id = list.length ? Math.max(...list.map(x => x.id)) + 1 : 1;
    list.push({ id, nome, data_nascimento: nasc, cns });
    showNotification('Paciente cadastrado com sucesso.', 'success');
  }
  
  savePatients(list);
  
  // Se estava em busca, refazer a busca
  if (currentSearchTerm) {
    performSearch();
  } else {
    renderPatients(list);
  }
  
  closeModal();
}

document.addEventListener('DOMContentLoaded', () => {
  const list = loadPatients();
  renderPatients(list);
  
  // Event listeners
  document.getElementById('pacNewBtn').onclick = () => openModal(null);
  document.getElementById('modalCancel').onclick = closeModal;
  document.getElementById('modalOk').onclick = savePatient;
  document.getElementById('pacSearchBtn').onclick = performSearch;
  document.getElementById('pacClearSearch').onclick = clearSearch;
  
  // Busca ao pressionar Enter
  document.getElementById('pacSearch').addEventListener('keypress', (e) => {
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