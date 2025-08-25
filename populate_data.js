const pacientesData = [
    { nome: "IGOR MARTINS FERREIRA", data_nascimento: "2001-03-27", cns: "707103879941220" },
    { nome: "MARIA VERONICE GARBUGIO CASAVECHIA", data_nascimento: "1957-10-31", cns: "701207023822217" },
    { nome: "VANESSA CASAVECHIA CIA", data_nascimento: "1980-08-11", cns: "709608626663377" },
    { nome: "EDILMA CRIVOI", data_nascimento: "1978-03-27", cns: "700904925268690" },
    { nome: "JOÃO RODRIGUES D´ALARME", data_nascimento: "1940-01-12", cns: "898003946575562" },
    { nome: "MARCIO RISATO CAMPIOLO", data_nascimento: "1985-05-27", cns: "709004887035819" },
    { nome: "RAIMUNDO EDSON FERREIRA LIMA", data_nascimento: "1972-03-11", cns: "704007311548060" },
    { nome: "WILMAR FERREIRA LIMA", data_nascimento: "1969-11-06", cns: "708907776199410" },
    { nome: "ALIFER SOARES", data_nascimento: "2019-05-26", cns: "704705785840430" },
    { nome: "CAROLINA MARTINS MACHADO DOS SANTOS", data_nascimento: "1937-05-22", cns: "702500318940333" },
    { nome: "CLEONICE LIMA NOVAES DE LIMA", data_nascimento: "1966-02-22", cns: "700005366280103" },
    { nome: "THAIS NOVAES OLIVEIRA", data_nascimento: "2001-07-08", cns: "704202721578982" },
    { nome: "DANIEL RISSATI", data_nascimento: "1948-08-13", cns: "700503387876955" },
    { nome: "ELISANGELA GONÇCALVES PEREIRA FERREIRA", data_nascimento: "1983-03-07", cns: "700506975463158" },
    { nome: "IRENE ALVES DE JESUS MILITÃO", data_nascimento: "1955-08-08", cns: "709000872717419" },
    { nome: "JALVIR ROSSI BORGUEZANI", data_nascimento: "1972-05-18", cns: "700002064314908" },
    { nome: "LUCAS THIAGO DE MACEDO", data_nascimento: "1994-04-14", cns: "709006830862610" },
    { nome: "MARIA DA PIEDADE SILVEIRA PEREIRA", data_nascimento: "1968-08-17", cns: "707808653146010" },
    { nome: "PAULO EDUARDO CASAVECHIA CIA", data_nascimento: "2000-10-28", cns: "705809438837130" },
    { nome: "ZILDA CAVALHEIRO NOVAIS", data_nascimento: "1984-04-06", cns: "702303172287511" },
    { nome: "SILVANA SPANSERKI DE ARAUJO", data_nascimento: "1971-10-19", cns: "701808251717774" },
    { nome: "LIDIANE SPANSERKI DE ARAUJO", data_nascimento: "1999-05-06", cns: "700800440319681" },
    { nome: "MICHELI FRANCO HORVATH", data_nascimento: "1988-01-14", cns: "700004591545606" },
    { nome: "ROSIANE SILVA DE LIMA BASSI", data_nascimento: "1973-10-10", cns: "705000646866155" },
    { nome: "GEFERSON DE SOUZA ALVES", data_nascimento: "2002-11-16", cns: "700909986860195" },
    { nome: "GABRIEL EMANUEL ARAUJO DA SILVA", data_nascimento: "1994-10-28", cns: "700201971121021" },
    { nome: "ANDERSON LIMA RODRIGUES DE ARAUJO", data_nascimento: "1999-06-23", cns: "702400557809824" },
    { nome: "RODRIGO ROSA DA SILVA", data_nascimento: "1995-10-15", cns: "700601450655962" },
    { nome: "RENATO ROSA DA SILVA", data_nascimento: "1997-10-05", cns: "705004002815159" },
    { nome: "VALDETE NUNES PEREIRA", data_nascimento: "1977-08-22", cns: "708104147817040" },
    { nome: "BRUNO PEREIRA DE MELLO", data_nascimento: "1999-03-07", cns: "702807632240865" },
    { nome: "TEREZINHA DE FATIMA C. MATOSINHO", data_nascimento: "1958-04-28", cns: "700102417174220" },
    { nome: "JOSEFA AMELIA PEREIRA LEAL", data_nascimento: "1962-07-03", cns: "705004414988557" },
    { nome: "OSVALDO HORVATH", data_nascimento: "1949-08-15", cns: "700402942254050" },
    { nome: "ANTONIA ROQUE RICARDO", data_nascimento: "1968-04-11", cns: "704800078864046" }
];

const medicamentosData = [
    { id: 1, nome: "AMITRIPTILINA", dosagem: "25MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 2, nome: "ÁCIDO VALPROICO", dosagem: "250MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 3, nome: "ÁCIDO VALPROICO", dosagem: "500MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 4, nome: "ÁCIDO VALPROICO", dosagem: "50MG/ML", apresentacao: "SUSPENSÃO ORAL", controlado: 0 },
    { id: 5, nome: "BIPERIDENO CLORIDRATO", dosagem: "2MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 6, nome: "CARBAMAZEPINA", dosagem: "200MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 7, nome: "CARBAMAZEPINA", dosagem: "20MG/ML", apresentacao: "SUSPENSÃO", controlado: 0 },
    { id: 8, nome: "CARBONATO DE LÍTIO", dosagem: "300MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 9, nome: "CLOMIPRAMINA CLORIDRATO", dosagem: "25MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 10, nome: "CLONAZEPAM", dosagem: "2MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 11, nome: "CLONAZEPAM", dosagem: "2.5MG/ML", apresentacao: "SOLUÇÃO ORAL", controlado: 1 },
    { id: 12, nome: "CLORPROMAZINA CLORIDRATO", dosagem: "25MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 13, nome: "CLORPROMAZINA CLORIDRATO", dosagem: "100MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 14, nome: "DESVENLAFAXINA SUCCINATO", dosagem: "50MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 15, nome: "DIAZEPAM", dosagem: "5MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 16, nome: "DIAZEPAM", dosagem: "10MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 17, nome: "ESCITALOPRAM", dosagem: "10MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 18, nome: "FENITOÍNA SÓDICA", dosagem: "100MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 19, nome: "FENOBARBITAL", dosagem: "100MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 20, nome: "FENOBARBITAL", dosagem: "40MG/ML", apresentacao: "SOLUÇÃO ORAL", controlado: 1 },
    { id: 21, nome: "FLUOXETINA", dosagem: "20MG", apresentacao: "CÁPSULA/COMPRIMIDO", controlado: 0 },
    { id: 22, nome: "HALOPERIDOL", dosagem: "1MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 23, nome: "HALOPERIDOL", dosagem: "5MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 24, nome: "HALOPERIDOL", dosagem: "2MG/ML", apresentacao: "SOLUÇÃO ORAL", controlado: 1 },
    { id: 25, nome: "HALOPERIDOL DECANOATO", dosagem: "50MG/ML", apresentacao: "SOLUÇÃO INJETÁVEL", controlado: 1 },
    { id: 26, nome: "IMIPRAMINA CLORIDRATO", dosagem: "25MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 27, nome: "LEVOMEPROMAZINA", dosagem: "25MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 28, nome: "LEVOMEPROMAZINA", dosagem: "100MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 29, nome: "MIRTAZAPINA", dosagem: "30MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 30, nome: "NORTRIPTILINA CLORIDRATO", dosagem: "25MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 31, nome: "OXCARBAZEPINA", dosagem: "600MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 32, nome: "OXCARBAZEPINA", dosagem: "60MG/ML", apresentacao: "SOLUÇÃO ORAL", controlado: 0 },
    { id: 33, nome: "PAROXETINA CLORIDRATO", dosagem: "20MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 34, nome: "PREGABALINA", dosagem: "75MG", apresentacao: "COMPRIMIDO", controlado: 1 },
    { id: 35, nome: "SERTRALINA CLORIDRATO", dosagem: "50MG", apresentacao: "COMPRIMIDO", controlado: 0 },
    { id: 36, nome: "VENLAFAXINA CLORIDRATO", dosagem: "75MG", apresentacao: "COMPRIMIDO", controlado: 0 }
];

// Função para popular o localStorage
function populateLocalStorage() {
    // Verifica se já existem dados para evitar duplicação em execuções acidentais
    if (localStorage.getItem('sismed_pacientes') === null || localStorage.getItem('sismed_pacientes') === '[]') {
        localStorage.setItem('sismed_pacientes', JSON.stringify(pacientesData));
        console.log('Dados de pacientes populados no localStorage.');
    } else {
        console.log('Dados de pacientes já existem no localStorage. Pulando a população.');
    }

    if (localStorage.getItem('sismed_medicamentos') === null || localStorage.getItem('sismed_medicamentos') === '[]') {
        localStorage.setItem('sismed_medicamentos', JSON.stringify(medicamentosData));
        console.log('Dados de medicamentos populados no localStorage.');
    } else {
        console.log('Dados de medicamentos já existem no localStorage. Pulando a população.');
    }

    alert('LocalStorage populado com dados de pré-cadastro! Você pode verificar nas ferramentas de desenvolvedor do navegador (Application -> Local Storage).');
}

// Executa a função ao carregar a página
populateLocalStorage();


