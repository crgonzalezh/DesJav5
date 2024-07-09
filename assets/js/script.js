document.addEventListener('DOMContentLoaded', () => {
    const tasks = [ ];

    const taskList = document.getElementById('task-list');
    const totalTasksElement = document.getElementById('total-tasks');
    const completedTasksElement = document.getElementById('completed-tasks');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskRow = document.createElement('tr');
            taskRow.innerHTML = `
                <td>${task.id}</td>
                <td class="${task.completed ? 'completed' : ''}">${task.description}</td>
                <td>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id})">
                </td>
                <td>
                    <button onclick="deleteTask(${task.id})">❌</button>
                </td>
            `;
            taskList.appendChild(taskRow);
        });
        totalTasksElement.textContent = tasks.length;
        completedTasksElement.textContent = tasks.filter(task => task.completed).length;
    }

    window.toggleTask = function(id) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
        }
    };

    window.deleteTask = function(id) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            tasks.splice(taskIndex, 1);
            renderTasks();
        }
    };

    addTaskButton.addEventListener('click', () => {
        const description = newTaskInput.value.trim();
        if (description) {
            const newTask = {
                id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                description: description,
                completed: false
            };
            tasks.push(newTask);
            newTaskInput.value = '';
            renderTasks();
        }
    });

    renderTasks();
});
