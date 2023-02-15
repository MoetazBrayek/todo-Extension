const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addButton = document.getElementById('addButton');
let tasks = [];

// Load saved tasks from storage
// run this function when the popup is opened
chrome.storage.sync.get('tasks', function(data) {
    if (data.tasks) {
        tasks = data.tasks;
        renderTasks();
    }
});


// if he press the add button run the function
addButton.addEventListener('click', function() {
    // if the input is empty don't add it to the tasks
    if (taskInput.value) {
        tasks.push({text: taskInput.value, done: false});
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
});


// if he press enter run the function
taskInput.addEventListener('keypress', function(event) {
    if (event.keyCode === 13) {
        addButton.click();
    }
});



function saveTasks() {
  chrome.storage.sync.set({tasks: tasks}, function() {
    console.log('Tasks saved.');
  });
  console.log('Tasks saved.');
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(function(task, index) {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    const link = document.createElement('a');
    link.textContent = task.text;
    link.href = '#';
    link.classList.toggle('todo-done', task.done);
    link.addEventListener('click', function(event) {
      event.preventDefault();
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    //make the button more small and make css !important
    deleteButton.style.cssText = 'font-size: 10px !important; padding: 0px 5px !important; margin-left: 5px !important; width: 50px !important; height: 20px !important;';
    deleteButton.addEventListener('click', function() {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });
      listItem.appendChild(link);
      // br is a line break
      listItem.appendChild(document.createElement('br'));
      // br with checkbox to mark the task as done
      listItem.appendChild(deleteButton);
      taskList.appendChild(listItem);
deleteButton.addEventListener('click', function() {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
});
listItem.appendChild(link);
listItem.appendChild(deleteButton);
taskList.appendChild(listItem);
});
}

