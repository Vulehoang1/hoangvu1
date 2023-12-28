// Load tasks from Local Storage
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const newTask = createTaskElement(task);
        taskList.appendChild(newTask);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim() !== '') {
        const task = {
            text: taskInput.value,
            completed: false
        };

        // Create a new task item
        const newTask = createTaskElement(task);

        // Add the new task to the task list
        taskList.appendChild(newTask);

        // Save tasks to Local Storage
        saveTasks();

        // Clear the input field
        taskInput.value = '';
    }
}

// Function to create a task element
function createTaskElement(task) {
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        <button class="complete-button" onclick="completeTask(this)">Complete</button>
        <button class="delete-button" onclick="deleteTask(this)">Delete</button>
    `;

    return newTask;
}

// Function to complete a task
function completeTask(button) {
    const taskItem = button.parentNode;
    const taskText = taskItem.querySelector('.task-text');

    // Toggle the 'completed' class for the task text
    taskText.classList.toggle('completed');

    // Save tasks to Local Storage
    saveTasks();
}

// Function to delete a task
function deleteTask(button) {
    const taskList = document.getElementById('task-list');
    const taskItem = button.parentNode;
    taskList.removeChild(taskItem);

    // Save tasks to Local Storage
    saveTasks();
}

// Function to save tasks to Local Storage
function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];

    // Collect task data from the task list
    taskList.querySelectorAll('li').forEach(taskItem => {
        const taskText = taskItem.querySelector('.task-text').innerText;
        const completed = taskItem.querySelector('.task-text').classList.contains('completed');

        tasks.push({
            text: taskText,
            completed: completed
        });
    });

    // Save tasks to Local Storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}