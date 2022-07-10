// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listeners 
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteItem);
filterOption.addEventListener('click', filterTodo)

// functions
function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // creating list
    const newTodo = document.createElement("li");
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add todo to localstorage
    saveLocalTodos(todoInput.value);
    // call for actions 
    const completedButton = document.createElement('button');
    completedButton.classList.add("completed-button");
    completedButton.innerHTML = '<i class="fa fa-check"></i>';
    todoDiv.appendChild(completedButton);

    const removeButton = document.createElement('button');
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = '<i class="fa fa-trash"></i>';
    todoDiv.appendChild(removeButton);

    todoList.appendChild(todoDiv);
    todoInput.value = ""
}
//activating completed and remove buttons
function deleteItem(e) {
    const item = e.target;
    if (item.classList[0] === "remove-button") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }
    // completed tasks
    if (item.classList[0] === "completed-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        console.log(todos);
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // check existence 
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        // creating list
        const newTodo = document.createElement("li");
        newTodo.innerHTML = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        // call for actions 
        const completedButton = document.createElement('button');
        completedButton.classList.add("completed-button");
        completedButton.innerHTML = '<i class="fa fa-check"></i>';
        todoDiv.appendChild(completedButton);
        const removeButton = document.createElement('button');
        removeButton.classList.add("remove-button");
        removeButton.innerHTML = '<i class="fa fa-trash"></i>';
        todoDiv.appendChild(removeButton);
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos.JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innteText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify('todos'));
}