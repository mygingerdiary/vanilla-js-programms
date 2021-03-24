//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list'); //ul
const filterOption = document.querySelector('.filter-todo');
const acceptButton = document.querySelector('.accept-button');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheckEdit);
filterOption.addEventListener('change', filterTodo);

//Functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();

    //create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //add todo to localstorage
    saveLocalTodos(todoInput.value);

    //check edit button
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>'
    editButton.classList.add('edit-btn');
    editButton.classList.add('func-btn');
    todoDiv.appendChild(editButton);

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn');
    completedButton.classList.add('func-btn');
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trash-btn');
    trashButton.classList.add('func-btn');
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = '';
}

function deleteCheckEdit(event) {
    const  item = event.target;
    const todo = item.parentElement;

    //delete todo
    if(item.classList[0] === 'trash-btn') {
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function (){
            todo.remove();
        });
    }

    //check mark
    if(item.classList[0] === 'complete-btn') {
        todo.classList.toggle('completed');
        changeLocalTodo(todo);
    }

    //edit todo
    if(item.classList[0] === 'edit-btn') {
        todo.classList.add('edited');
        editLocalTodo(todo);
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case 'completed':
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //check if things are already there
    let todos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //new todo
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function changeLocalTodo(todo) {
    todoStr = todo.childNodes[0].innerText;
    let completedTodos;
    let todos = JSON.parse(localStorage.getItem('todos'));

    if(localStorage.getItem('completed') === null) {
        completedTodos = [];
    } else {
        completedTodos = JSON.parse(localStorage.getItem('completed'));
    }


    if(todo.classList.contains('completed')) {
        completedTodos.push(todoStr);
        localStorage.setItem('completed', JSON.stringify(completedTodos));

        todos.splice(todos.indexOf(todoStr), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    else {
        completedTodos.splice(completedTodos.indexOf(todoStr), 1);
        localStorage.setItem('completed', JSON.stringify(completedTodos));

        todos.push(todoStr);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

}

function editLocalTodo(todo) {
    const todoStr = todo.childNodes[0].innerText;
    const editButton = document.querySelector('.edit-btn');
    const functionalButtons = document.querySelectorAll('.func-btn');
    let completedTodos = JSON.parse(localStorage.getItem('completed'));
    let todos = JSON.parse(localStorage.getItem('todos'));

    if(todo.classList.contains('edited')) {
        todoInput.value = todoStr;
        todoButton.style.display = "none";
        acceptButton.style.display = "block";

        for (i = 0; i < functionalButtons.length; i++) {
            functionalButtons[i].style.pointerEvents = "none";
        }

        document.querySelector('.select').style.pointerEvents = "none";

        acceptButton.addEventListener('click', () => {
            todo.childNodes[0].innerText = todoInput.value;
            if(todo.classList.contains('completed')) {
                completedTodos[completedTodos.indexOf(todoStr)] = todoInput.value;
                localStorage.setItem('completed', JSON.stringify(completedTodos));
            }
            else {
                todos[todos.indexOf(todoStr)] = todoInput.value;
                localStorage.setItem('todos', JSON.stringify(todos));
            }
            todoButton.style.display = "block";
            acceptButton.style.display = "none";
        });
    }
}

function getTodos() {
    let todos;
    let completed;

    //check if things are already there
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    if(localStorage.getItem('completed') === null) {
        completed = [];
    } else {
        completed = JSON.parse(localStorage.getItem('completed'));
    }

    todos.forEach(function (todo) {
        //create div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //check edit button
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>'
        editButton.classList.add('edit-btn');
        editButton.classList.add('func-btn');
        todoDiv.appendChild(editButton);

        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn')
        completedButton.classList.add('func-btn');
        todoDiv.appendChild(completedButton);

        //check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn');
        trashButton.classList.add('func-btn');
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv);
    });

    completed.forEach(function(todo) {
        //create div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.classList.add('completed');

        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    //check if things are already there
    let todos;
    let completedTodos;

    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    if(localStorage.getItem('completed') === null) {
        completedTodos = [];
    } else {
        completedTodos = JSON.parse(localStorage.getItem('completed'));
    }

    const todoIndex = todo.children[0].innerText;

    if(todo.classList.contains('completed')) {
        completedTodos.splice(completedTodos.indexOf(todoIndex), 1);
        localStorage.setItem('completed', JSON.stringify(completedTodos));
    } else
    {
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}