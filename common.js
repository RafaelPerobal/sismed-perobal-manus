// Utilities, persistence, and theme management
const KEYS = {
  prof: 'sismed_professional',
  patients: 'sismed_patients',
  meds: 'sismed_medicines',
  theme: 'sismed_theme',
  logoSistema: 'sismed_logo_sistema',
  logoReceita: 'sismed_logo_receita'
};

const store = {
  get(k, fallback) {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : (fallback ?? null);
    } catch(e) {
      return fallback ?? null;
    }
  },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
  del(k) { localStorage.removeItem(k); }
};

function showNotification(message, type = 'info') {
    const toast = document.getElementById('notificationToast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = `notification-toast ${type} show`;
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 4000);
}

function getProfessional() {
  const pLocal = store.get(KEYS.prof, null);
  if (pLocal) return pLocal;
  try {
    const pSess = sessionStorage.getItem(KEYS.prof);
    return pSess ? JSON.parse(pSess) : null;
  } catch(e) {
    return null;
  }
}

function setProfessional(p, remember) {
  if (remember) {
    store.set(KEYS.prof, p);
  } else {
    sessionStorage.setItem(KEYS.prof, JSON.stringify(p));
  }
}

function applyTheme(color) {
    const lightColors = {
        '#2563eb': '#dbeafe',
        '#16a34a': '#d1fae5',
        '#dc2626': '#fee2e2',
        '#f97316': '#ffedd5',
        '#6d28d9': '#ede9fe',
    };
    document.documentElement.style.setProperty('--primary-color', color);
    document.documentElement.style.setProperty('--primary-color-light', lightColors[color] || '#eff6ff');
}

function loadTheme() {
    const savedTheme = store.get(KEYS.theme);
    if (savedTheme) {
        applyTheme(savedTheme);
    }
}

function loadLogos() {
    const logoSistema = store.get(KEYS.logoSistema);
    const logoReceita = store.get(KEYS.logoReceita);
    const sidebarLogo = document.getElementById('sidebarLogo');
    
    if (sidebarLogo && logoSistema) {
        sidebarLogo.src = logoSistema;
    }
}

function fmtDate(d) { 
  if (!d) return '';
  return new Date(d).toLocaleDateString('pt-BR', { timeZone: 'UTC' }); 
}

function toISO(s) {
  if (!s) return s;
  if (/\d{4}-\d{2}-\d{2}/.test(s)) return s;
  const [dd, mm, yy] = s.split('/');
  return `${yy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
}

function addDays(d, n) { 
  const x = new Date(d); 
  x.setDate(x.getDate() + n); 
  return x; 
}

function chunk(arr, size) { 
  const out = []; 
  for (let i = 0; i < arr.length; i += size) { 
    out.push(arr.slice(i, i + size)); 
  } 
  return out; 
}

function uid() { 
  return Math.random().toString(36).slice(2, 9).toUpperCase(); 
}

function seedIfEmpty() {
  // Verificar se já existem dados
  const patients = store.get(KEYS.patients, []);
  const meds = store.get(KEYS.meds, []);
  
  if (patients.length === 0) {
    // Dados iniciais de pacientes
    const initialPatients = [
      { id: 1, nome: 'JOÃO DA SILVA', data_nascimento: '1980-05-15', cns: '123456789012345' },
      { id: 2, nome: 'MARIA SANTOS', data_nascimento: '1975-08-22', cns: '234567890123456' },
      { id: 3, nome: 'PEDRO OLIVEIRA', data_nascimento: '1990-12-10', cns: '345678901234567' }
    ];
    store.set(KEYS.patients, initialPatients);
  }
  
  if (meds.length === 0) {
    // Dados iniciais de medicamentos
    const initialMeds = [
      { id: 1, nome: 'PARACETAMOL', dosagem: '500mg', apresentacao: 'Comprimido', controlado: false },
      { id: 2, nome: 'IBUPROFENO', dosagem: '400mg', apresentacao: 'Comprimido', controlado: false },
      { id: 3, nome: 'DIPIRONA', dosagem: '500mg', apresentacao: 'Comprimido', controlado: false },
      { id: 4, nome: 'TRAMADOL', dosagem: '50mg', apresentacao: 'Comprimido', controlado: true },
      { id: 5, nome: 'OMEPRAZOL', dosagem: '20mg', apresentacao: 'Cápsula', controlado: false }
    ];
    store.set(KEYS.meds, initialMeds);
  }
}

function exportBackup() {
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
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
  loadTheme();
  loadLogos();
  seedIfEmpty();
  
  const prof = getProfessional();
  const hdr = document.getElementById('hdr-prof');
  if (hdr) {
    if (prof && prof.nome) {
      hdr.textContent = prof.nome;
    } else {
      hdr.textContent = 'Não identificado';
    }
  }
});