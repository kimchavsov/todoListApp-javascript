const container = document.querySelector('.container');

// UI Setup
function createHeader() {
  const header = document.createElement('div');
  const title = document.createElement('h1')

  title.textContent = 'My Todo List';
  header.appendChild(title);
  return header
}

const createButton = function() {
  const btn = document.createElement('button');
  btn.textContent = 'Add New Task';
  btn.classList.add('btn');
  btn.classList.add('btn-outline-primary')
  return btn
}
// Form pop up when the button is clicked
function createForm() {
  const divForm = document.createElement('div');
  const form = document.createElement('form');
  const formTitle = document.createElement('h3');
  
  divForm.id = 'myForm';
  divForm.classList.add('form-pop-up');
  form.classList.add('form-container');
  formTitle.textContent = 'Add New Task';

  form.appendChild(formTitle);
  form.appendChild(createLabel('name', 'text', 'Name'));
  form.appendChild(createLabel('desc', 'text', 'Description'));
  form.appendChild(createFormButton('Add', 'btn-outline-success', 'add-task'));
  form.appendChild(createFormButton('Close', 'btn-outline-danger', 'close-form'));
  
  divForm.appendChild(form);
  divForm.style.display = 'none';
  return divForm
}

// create Label for the popup form
function createLabel(useFor, type, text) {
  const divLabel = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');

  label.for = useFor;
  label.textContent = `${text}: `
  input.type = type;
  input.name = useFor;
  input.id = useFor;

  divLabel.appendChild(label);
  divLabel.appendChild(input);
  return divLabel;
}

function createFormButton(text, style, type) {
  const divBtn = document.createElement('div');
  const btn = document.createElement('button');

  divBtn.classList.add('btn-sect')
  btn.id = type;
  btn.type = 'button';
  btn.innerText = text;
  btn.classList.add('btn');
  btn.classList.add(style);

  divBtn.appendChild(btn);
  return divBtn
}

// Create Table of task list
const createTable = function() {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  const tbody = document.createElement('tbody')
  
  table.classList.add('table')
  tbody.id = 'task-table-body';

  tr.appendChild(createColumn('Name'));
  tr.appendChild(createColumn('Description'));
  tr.appendChild(createColumn('Status'));
  tr.appendChild(createColumn(''));

  thead.appendChild(tr);
  table.appendChild(thead);
  table.appendChild(tbody);
  return table
}
const createColumn = function(text) {
  const th = document.createElement('th');
  th.textContent = text
  th.scope = 'col'
  return th
}

// Initializae UI
container.appendChild(createHeader())
container.appendChild(createButton())
container.append(createForm());
container.appendChild(createTable());

function clearForm() {
  const nameInput = document.querySelector('#name');
  const descInput = document.querySelector('#desc');
  
  nameInput.value = '';
  descInput.value = '';

}

// Task Object
function Task(name, desc, status = 'Not Complete') {
  this.name = name;
  this.desc = desc;
  this.status = status
}

// Task Manager object 
function TaskManager() {
  this.taskList = [];

  // Add new task to the taskList
  this.addNewTask = (name, desc) => {
    let task = new Task(name, desc);
    this.taskList.push(task);
  }

  this.showTask = () => {
    const tableBody = document.querySelector('#task-table-body');
    checkStorage();
    tableBody.innerHTML = "";
    this.taskList.forEach((task) => {
      const htmlTask = `
      <tr>
        <td>${task.name}</td>
        <td>${task.desc}</td>
        <td><button class="btn status-button btn-outline-secondary">${task.status}</button></td>
        <td><button class="delete btn btn-danger">Delete</button></td>
      </tr>`;
      tableBody.insertAdjacentHTML('afterbegin', htmlTask);
    }) 
  }
  
  this.deleteTask = (currentTask) => {
    this.taskList.splice(currentTask, 1);
  }

  this.findTask = (name) => {
    if (this.taskList.length == 0 || this.taskList == null) {
      return;
    }
    for (task of this.taskList){
      if (task.name === name) {
        return this.taskList.indexOf(task);
      } 
    }
  }
}

// Call taskManger constructor function
const taskManager = new TaskManager;
// Create A few tasks
taskManager.addNewTask('Hello', 'This is hello');
taskManager.addNewTask('Hel3241lo', 'This qwrwqeris hello');
taskManager.addNewTask('Helqwerlo', 'This is he342llo');
taskManager.showTask();

// When the add task button clicked the form appear
const btnAddNew = document.querySelector('.btn')
btnAddNew.addEventListener('click', () => {
  document.getElementById('myForm').style.display = 'block';
})

// Add New task to the list
const btnAddTask = document
  .querySelector('#add-task')
  .addEventListener('click', () => {
    const nameInput = document.querySelector('#name');
    const descInput = document.querySelector('#desc');

    if (nameInput.value === '' || descInput === ''){
      alert('Please, fill all the fields')
      return
    } else {
      taskManager.addNewTask(nameInput.value, descInput.value);
      updateStorage()
      taskManager.showTask();
      document.getElementById('myForm').style.display = 'none';
      clearForm()
    }
  })

// Form close button
const btnCloseForm = document.querySelector('#close-form');
btnCloseForm.addEventListener('click', () => {
  document.getElementById('myForm').style.display = 'none';
  clearForm()
})

// Add Event to table with delete and change status function
const table = document
  .querySelector('table')
  .addEventListener('click', (e) => {
    const currentTarget = e.target.parentNode.parentNode.childNodes[1];
    if (e.target.innerHTML == 'Delete') {
      taskManager.deleteTask(taskManager.findTask(currentTarget.textContent))
    }
    if (e.target.classList.contains('status-button')) {
      const statusButton = e.target.parentNode.parentNode.childNodes[5].childNodes[0]
      if (statusButton.textContent === 'Not Complete') {
        taskManager.taskList[taskManager.findTask(currentTarget.textContent)].status = 'Completed'
      } else {
        taskManager.taskList[taskManager.findTask(currentTarget.textContent)].status = 'Not Complete'
      }
    }
    updateStorage()
    taskManager.showTask()
  });

// Setup Browser storage
// Local Storage
function updateStorage() {
  localStorage.setItem('tasks', JSON.stringify(taskManager.taskList));
}

// Check local storage is exist
function checkStorage() {
  if(localStorage.getItem('tasks')) {
    taskManager.taskList = JSON.parse(localStorage.getItem('tasks'))
  }
}