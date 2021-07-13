const container = document.querySelector('.container');

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

// Task Object
function Task(name, desc) {
  this.name = name;
  this.desc = desc
}

// Task Manager object 
function TaskManager() {
  this.taskList = [];

  // Add new task to the taskList
  this.addNewTask = (name, desc) => {
    let task = new Task(name, desc);
    this.taskList.push(task);
  }
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
  form.appendChild(createFormButton('Add', 'btn-outline-success'));
  form.appendChild(createFormButton('Close', 'btn-outline-danger'));
  
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

function createFormButton(text, style) {
  const divBtn = document.createElement('div');
  const btn = document.createElement('button');

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
  const tr = document.createElement('tr')
  
  table.classList.add('table')
  tr.appendChild(createColumn('Name'));
  tr.appendChild(createColumn('Description'));
  tr.appendChild(createColumn('Status'));
  tr.appendChild(createColumn(''));

  thead.appendChild(tr);
  table.appendChild(thead);
  return table

}
const createColumn = function(text) {
  const th = document.createElement('th');
  th.textContent = text
  th.scope = 'col'
  return th
}

container.appendChild(createHeader())
container.appendChild(createButton())
container.append(createForm());
container.appendChild(createTable());

const btnAddNew = document.querySelector('.btn')
btnAddNew.addEventListener('click', () => {
  document.getElementById('myForm').style.display = 'block';
})

const btnCloseForm = document.querySelector('.btn-outline-danger');
btnCloseForm.addEventListener('click', () => {
  document.getElementById('myForm').style.display = 'none';
})