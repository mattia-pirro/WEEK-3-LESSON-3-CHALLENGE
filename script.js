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

const myTask = [
  {
    titoloTask: 'Studiare JavaScript',
  },
  {
    titoloTask: 'Scrivere la ToDoList',
  },
  {
    titoloTask: 'Bere il caffe',
  },
  {
    titoloTask: 'Ripassare gli eventi DOM',
  },
];

function taskArray() {
  lista.textContent = '';

  myTask.forEach((task , index) => {
    const newLi = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.classList.add('check');
    checkbox.type = 'checkbox';
    newLi.appendChild(checkbox);

    const textSpan = document.createElement('span');
    textSpan.classList.add('testo');
    textSpan.textContent = task.titoloTask;
    newLi.appendChild(textSpan);

    const elimina = document.createElement('button');
    elimina.type = 'button';
    elimina.setAttribute('id', index + 1);
    elimina.textContent = 'Elimina';
    newLi.appendChild(elimina);

    lista.appendChild(newLi);
  });
}

taskArray();

contatore.textContent = myTask.length;

function aggiungiTask() {
  const testoTask = newTask.value.trim();

  if (testoTask === '') {
    return;
  }

  myTask.push({
    titoloTask: testoTask,
  });

  contatore.textContent = myTask.length;

  newTask.value = '';

  taskArray();
}

lista.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.type === 'button') {
    myTask.splice(e.target.id - 1, 1);
    taskArray();
    contatore.textContent = myTask.length;
  }
});