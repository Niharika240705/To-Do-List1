const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

let tasks = [];

function updateTaskCount() {
  taskCount.textContent = `You have ${tasks.length} task(s) to complete.`;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return alert("Task cannot be empty!");

  const task = {
    text: taskText,
    completed: false,
  };

  tasks.push(task);
  renderTasks();
  taskInput.value = "";
  updateTaskCount();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    const completeButton = document.createElement("button");
    completeButton.className = "complete-button";
    completeButton.textContent = "✓";
    completeButton.onclick = () => completeTask(index);

    const editButton = document.createElement("button");
    editButton.className = "edit-button";
    editButton.textContent = "✎";
    editButton.onclick = () => editTask(index);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "🗑";
    deleteButton.onclick = () => deleteTask(index);

    taskItem.appendChild(taskText);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);
  });
}

function completeTask(index) {
  tasks[index].completed = true;
  renderTasks();
}

function editTask(index) {
  const newTaskText = prompt("Edit your task:", tasks[index].text);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    tasks[index].text = newTaskText.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
  updateTaskCount();
}

addButton.addEventListener("click", addTask);

