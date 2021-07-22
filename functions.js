//Selectors
let toDoInput = document.querySelector(".todo-input");
let toDoButton = document.querySelector(".todo-btn")
let taskList = document.querySelector(".task-list");
let toDoForm = document.querySelector(".todo-form");

//Event Listener
document.addEventListener('DOMContentLoaded', displayTasks);
toDoForm.addEventListener("submit", addTask);
taskList.addEventListener("click", deleteComplete);

//Functions
function addTask(event) {
    //Preventing page from refresh when button pressed
    event.preventDefault();
    //toDo Div creation
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todos");
    //Creating the list
    const newTask = document.createElement('li');
    newTask.innerText = toDoInput.value;
    newTask.classList.add('task-items');
    toDoDiv.appendChild(newTask);
    //Creating complete button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check" style="pointer-events:none"><i>';
    completeButton.classList.add("completed-btn");
    toDoDiv.appendChild(completeButton);
    //Creating delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash" style="pointer-events:none"><i>';
    deleteButton.classList.add("delete-btn");
    toDoDiv.appendChild(deleteButton);
    //Append to list
    taskList.appendChild(toDoDiv);
    //Saving tasks to local storage
    saveLocalTasks({
        text: toDoInput.value,
        completed: false
    });
    //Clearing input values
    toDoInput.value = "";
}

function deleteComplete(e) {
    const item = e.target;
    //Delete Button
    if (item.classList[0] === "delete-btn") {
        const taskParent = item.parentElement;
        //Animation
        taskParent.classList.add("fall");
        removeLocalTasks(taskParent);
        //Remove after transiion end
        taskParent.addEventListener("transitionend", function () {
            taskParent.remove()
        })

    }
    //Complete Button 
    if (item.classList[0] === 'completed-btn') {
        const taskParent = item.parentElement;
        taskParent.classList.toggle("completed");
        updateLocalTask(item.parentElement.innerText);
    }
}


//Saving to local storage
function saveLocalTasks(todo) {
    //Check for tasks saved
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(todo);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function (todo) {
        //toDo Div creation
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todos");
        if(todo.completed) {
            toDoDiv.classList.add("completed");
        }
        //Creating the list
        const newTask = document.createElement('li');
        newTask.innerText = todo.text;
        newTask.classList.add('task-items');
        toDoDiv.appendChild(newTask);
        //Creating complete button
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check" style="pointer-events:none"><i>';
        completeButton.classList.add("completed-btn");
        toDoDiv.appendChild(completeButton);
        //Creating delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash" style="pointer-events:none"><i>';
        deleteButton.classList.add("delete-btn");
        toDoDiv.appendChild(deleteButton);
        //Append to list
        taskList.appendChild(toDoDiv);
    })
}

function removeLocalTasks(todos) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    const tasksIndex = todos.children[0].innerText;
    tasks.splice(tasks.indexOf(tasksIndex), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateLocalTask(toDoText) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let matchedToDoIndex = tasks.findIndex(function findTodoByText(t) {
        return t.text === toDoText;
    })
    tasks[matchedToDoIndex].completed = !tasks[matchedToDoIndex].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}