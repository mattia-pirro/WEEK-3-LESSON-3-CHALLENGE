
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

  const filtroTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (filtro === 'attivi' && !task.completato) {
      filtroTasks.push(task);
    } else if (filtro === 'completati' && task.completato) {
      filtroTasks.push(task);
    } else if (filtro === 'tutti') {
      filtroTasks.push(task);
    }
  }

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

    if (task.completato === true) {
      textSpan.style.textDecoration = 'line-through';
    }

    const elimina = document.createElement('button');
    elimina.type = 'button';

    elimina.textContent = 'Elimina';
    newLi.appendChild(elimina);

    lista.appendChild(newLi);
  });

  let taskAttivi = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (!tasks[i].completato) {
      taskAttivi++;
    }
  }
  contatore.textContent = taskAttivi;
}

rendiLista();

lista.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.type === 'button') {
    for (let i = 0; i < tasks.length; i++) {
      const id = Number(e.target.closest('li').dataset.id);
      if (tasks[i].id === id) {
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
    for (let i = 0; i < tasks.length; i++) {
      const id = Number(e.target.closest('li').dataset.id);
      if (tasks[i].id === id) {
        tasks[i].completato = e.target.checked;
        break;
      }
    }
    rendiLista();
  }
});

lista.addEventListener('click', (e) => {
  if (e.target.checked === true) {

  }
});

tutti.addEventListener('click', () => {
  filtro = 'tutti';
  rendiLista();
});

attivi.addEventListener('click', () => {
  filtro = 'attivi';
  rendiLista();
});

completati.addEventListener('click', () => {
  filtro = 'completati';
  rendiLista();
});