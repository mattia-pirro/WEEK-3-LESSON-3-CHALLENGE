/*
  REGOLE
  - Continua quello che hai iniziato stamani in classe.
  - Niente eventi (li vediamo domani): chiama le funzioni dalla console o all'avvio.
  - Solo const/let, mai var. Solo querySelector/querySelectorAll per il DOM.
*/

/* SCRIVI QUI LE TUE FUNZIONI:
   1. Modifica aggiungiTask per accettare priorita
   2. Aggiungi bottone Elimina su ogni task
   6. evidenzia(indice) / togliEvidenza(indice)
   7. data automatica nel task
   8. contaPerPriorita()
*/

const lista = document.querySelector('#lista-task');
const contatore = document.querySelector('#contatore');
const newTask = document.querySelector('#nuovo-task');
const addBtn = document.querySelector('#bottone-aggiungi');
const textError = document.querySelector('#errore');
const tutti = document.querySelector('#btnTutti');
const attivi = document.querySelector('#btnAttivi');
const completati = document.querySelector('#btnCompletati');

let filtro = "tutti";

const tasks = [
  {
    id: 1,
    testo: 'Studiare JavaScript',
    completato: true,
  },
  {
    id: 2,
    testo: 'Scrivere la ToDoList',
    completato: false,
  },
  {
    id: 3,
    testo: 'Bere il caffe',
    completato: true,
  },
  {
    id: 4,
    testo: 'Ripassare gli eventi DOM',
    completato: false,
  },
];

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const testoTask = newTask.value.trim();

  if (testoTask === '') {
    textError.textContent = 'Nessun testo inserito, riprova!';
    return;
  } else {
    textError.textContent = '';
    tasks.push({
      id: Date.now(),
      testo: testoTask,
      completato: false,
    });

    newTask.value = '';
    rendiLista();
  }
});

function rendiLista() {
  lista.textContent = '';

  const filtroTasks = tasks.filter(task => {
    if (filtro === 'attivi') {
      return !task.completato;
    } else if (filtro === 'completati') {
      return task.completato;
    } else {
      return true;
    }
  });

  filtroTasks.forEach((task) => {
    const newLi = document.createElement('li');
    newLi.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.classList.add('check');
    checkbox.checked = task.completato;
    checkbox.type = 'checkbox';
    newLi.appendChild(checkbox);

    const textSpan = document.createElement('span');
    textSpan.textContent = task.testo;
    newLi.appendChild(textSpan);

    if (task.completato === true){
        textSpan.style.textDecoration = 'line-through';
    }

    const elimina = document.createElement('button');
    elimina.type = 'button';
    
    elimina.textContent = 'Elimina';
    newLi.appendChild(elimina);

    lista.appendChild(newLi);
  });

  contatore.textContent = tasks.filter(task => !task.completato).length;
}

rendiLista();

lista.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.type === 'button') {
    for(let i = 0; i < tasks.length; i++){
      const id = Number(e.target.closest('li').dataset.id);
      if (tasks[i].id === id){
        tasks.splice(i, 1);
        break;
      }
    }
    rendiLista();
  }
});

lista.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.type === 'checkbox') {
    for(let i = 0; i < tasks.length; i++){
      const id = Number(e.target.closest('li').dataset.id);
      if (tasks[i].id === id){
        tasks[i].completato = e.target.checked;
        break;
      }
    }
    rendiLista();
  }
});

