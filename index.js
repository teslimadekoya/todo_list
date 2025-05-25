document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');
  const emptyImage = document.querySelector('.empty-image');

  const toggleEmptyState = () => {
    if (taskList.children.length === 0) {
      emptyImage.classList.remove('hidden');
    } else {
      emptyImage.classList.add('hidden');
    }
  };

  const addTask = (event) => {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
      <div class="task-content flex items-center gap-2">
        <input type="checkbox" class="checkbox">
        <span>${taskText}</span>
      </div>
      <div class="task-buttons flex gap-2">
        <button class="edit-btn"><i class="fas fa-pen"></i></button>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
      </div>
    `;

    // UPDATE
    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
      const currentText = li.querySelector('span').textContent;
      const newTaskText = prompt('Edit task:', currentText);
      if (newTaskText !== null && newTaskText.trim() !== '') {
        li.querySelector('span').textContent = newTaskText.trim();
      }
    });

    // DELETE
    li.querySelector('.delete-btn').addEventListener('click', () => {
      taskList.removeChild(li);
      toggleEmptyState();
    });

    // COMPLETE / UNCOMPLETE
    const checkbox = li.querySelector('.checkbox');
    checkbox.addEventListener('change', () => {
      li.classList.toggle('completed', checkbox.checked);
    });

    // CREATE
    taskList.appendChild(li);
    taskInput.value = '';
    toggleEmptyState();
  };

  addTaskBtn.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(event);
    }
  });

  toggleEmptyState();
});
