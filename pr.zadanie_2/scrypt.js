let tasks = JSON.parse(localStorage.getItem('tasks')) || initialTasks;
let currentFilter = 'all';


const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('dodajBtn');
const taskList = document.getElementById('taskList');
const counter = document.getElementById('counter');
const filterBtns = document.querySelectorAll('.filter-btn');


function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function render() {
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
      <label class="task-label ${task.completed ? 'completed' : ''}">
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
        ${task.text}
      </label>
    `;

    taskList.appendChild(li);
  });

  const completedCount = tasks.filter(t => t.completed).length;
  counter.textContent = `${completedCount} z ${tasks.length} wykonane`;

  saveTasks();
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;

  tasks.push({ id: Date.now(), text: text, completed: false});
  taskInput.value = '';
  render();
}

function toggleTask(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  render();
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});


addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});


render();