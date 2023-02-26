// popup.js

// Define variables for the form and the matrix lists
const taskForm = document.querySelector('#task-form');
const doFirstList = document.querySelector('#do-first');
const scheduleList = document.querySelector('#schedule');
const delegateList = document.querySelector('#delegate');
const eliminateList = document.querySelector('#eliminate');
const clearButton = document.querySelector('#clear-button');
// Add the clearTasks function as an event listener for the clear button click event
clearButton.addEventListener('click', clearTasks);


// Load the task data from local storage and populate the matrix
loadTasksFromStorage();

// Define an event listener for the form submit event
taskForm.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the task and urgency values from the form
  const taskInput = document.querySelector('#task');
  const urgencyInput = document.querySelector('#urgency');
  const task = taskInput.value.trim();
  const urgency = urgencyInput.value;

  // Clear the form inputs
  taskInput.value = '';
  urgencyInput.value = '';

  // Create a new task object
  const newTask = {
    task: task,
    urgency: urgency
  };

  // Add the task to the appropriate list based on urgency and importance
  if (urgency >= 4) {
    if (task.trim() !== '') {
      doFirstList.appendChild(createTaskItem(newTask));
    }
  } else if (urgency >= 3) {
    if (task.trim() !== '') {
      scheduleList.appendChild(createTaskItem(newTask));
    }
  } else if (urgency >= 2) {
    if (task.trim() !== '') {
      delegateList.appendChild(createTaskItem(newTask));
    }
  } else {
    if (task.trim() !== '') {
      eliminateList.appendChild(createTaskItem(newTask));
    }
  }

  // Save the updated task data to local storage
  saveTasksToStorage();
});

// Define a function to create a task item from a task object
function createTaskItem(task) {
  const newTask = document.createElement('li');
  newTask.textContent = task.task;
  newTask.dataset.urgency = task.urgency;
  return newTask;
}

// Define a function to load the task data from local storage
function loadTasksFromStorage() {
  // Get the task data from local storage
  const taskData = JSON.parse(localStorage.getItem('eisenhowerMatrixTasks'));

  // If there is task data, populate the matrix with the tasks
  if (taskData) {
    taskData.forEach(function(task) {
      if (task.urgency >= 4) {
        doFirstList.appendChild(createTaskItem(task));
      } else if (task.urgency >= 3) {
        scheduleList.appendChild(createTaskItem(task));
      } else if (task.urgency >= 2) {
        delegateList.appendChild(createTaskItem(task));
      } else {
        eliminateList.appendChild(createTaskItem(task));
      }
    });
  }
}

// Define a function to save the task data to local storage
function saveTasksToStorage() {
  // Get the tasks from the matrix and convert them to an array of task objects
  const tasks = [];
  const allTaskLists = [doFirstList, scheduleList, delegateList, eliminateList];
  allTaskLists.forEach(function(taskList) {
    Array.from(taskList.children).forEach(function(taskItem) {
      const task = {
        task: taskItem.textContent,
        urgency: taskItem.dataset.urgency
      };
      tasks.push(task);
    });
  });

  // Save the task data to local storage
  localStorage.setItem('eisenhowerMatrixTasks', JSON.stringify(tasks));
}


// Define the clearTasks function
function clearTasks() {
  // Clear all tasks from the matrix
  doFirstList.innerHTML = '';
  scheduleList.innerHTML = '';
  delegateList.innerHTML = '';
  eliminateList.innerHTML = '';

  // Remove the task data from local storage
  localStorage.removeItem('eisenhowerMatrixTasks');
}
