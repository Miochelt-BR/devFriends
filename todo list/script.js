document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const li = document.createElement('li');
            li.textContent = taskText;

            const taskButtons = document.createElement('div');
            taskButtons.className = 'task-buttons';

            const completeButton = document.createElement('button');
            completeButton.className = 'complete-btn';
            completeButton.innerHTML = '<img src="check.png" alt="Complete">';
            completeButton.addEventListener('click', () => li.classList.toggle('completed'));

            const editButton = document.createElement('button');
            editButton.className = 'edit-btn';
            editButton.innerHTML = '<img src="edit.png" alt="Edit">';
            editButton.addEventListener('click', () => editTask(li));

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.innerHTML = '<img src="delete.png" alt="Delete">';
            deleteButton.addEventListener('click', () => li.remove());

            taskButtons.appendChild(completeButton);
            taskButtons.appendChild(editButton);
            taskButtons.appendChild(deleteButton);
            li.appendChild(taskButtons);
            taskList.appendChild(li);

            taskInput.value = '';
        }
    }

    function editTask(taskItem) {
        const currentText = taskItem.firstChild.textContent;
        const newText = prompt('Edit task:', currentText);
        if (newText !== null && newText.trim() !== '') {
            taskItem.firstChild.textContent = newText.trim();
        }
    }
});
