const todoSample = {
  id: 0,
  name: "",
  priority: 0,
  complete: false,
};

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

const todoElements = {};
let storageTodos = [];

// Add events for buttons
document.addEventListener("DOMContentLoaded", loadTodos);
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("change", filterTodo);

function loadTodos() {
  storageTodos = JSON.parse(localStorage.getItem("todos")) || [];
  renderTodoList();
}

// Render todo
function renderTodoList() {
  storageTodos.sort((a, b) => Number(b.priority) - Number(a.priority));
  storageTodos.forEach((v) => {
    let todoElement = todoElements[v.id];
    if (!todoElement) {
      todoElement = createTodoElement(v);
      todoElements[v.id] = todoElement;
    }
    todoList.appendChild(todoElement);
    todoInput.value = "";
  });
}
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(storageTodos));
}

// Add todo
function addTodoAndSave(value) {
  let newTodoObj = JSON.parse(JSON.stringify(todoSample));
  newTodoObj.id = Date.now();
  newTodoObj.name = value;
  storageTodos.push(newTodoObj);
  saveTodos();
  return newTodoObj;
}
function createTodoElement(todoObj) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  if (todoObj.complete) {
    todoDiv.classList.add("completed");
  }
  const newTodo = document.createElement("li");
  newTodo.innerText = todoObj.name;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Completed Button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completedButton.classList.add("complete-btn");
  completedButton.addEventListener("click", (e) => {
    todoObj.complete = !todoObj.complete;
    todoObj.priority = todoObj.priority > 0 ? 1 : todoObj.complete ? -1 : 0;
    todoDiv.classList.toggle("completed");
    renderTodoList();
    saveTodos();
  });
  todoDiv.appendChild(completedButton);

  //Priority Btn
  const starButton = document.createElement("button");
  const starIcon = document.createElement("i");
  starIcon.classList.add("fas", "fa-solid", "fa-star");
  if (todoObj.priority) {
    starIcon.classList.add("star-btn-active");
    todoDiv.classList.add("priority");
  }
  starButton.appendChild(starIcon);
  starButton.classList.add("star-btn");
  starButton.addEventListener("click", (e) => {
    todoObj.priority = todoObj.priority <= 0 ? 1 : 0;
    starIcon.classList.toggle("star-btn-active");
    todoDiv.classList.toggle("priority");
    renderTodoList();
    saveTodos();
  });
  todoDiv.appendChild(starButton);

  //Remove Button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  trashButton.addEventListener("click", (e) => {
    const index = storageTodos.indexOf(todoObj);
    if (index > -1) {
      storageTodos.splice(index, 1);
    }
    todoList.removeChild(todoDiv);
    saveTodos();
  });
  todoDiv.appendChild(trashButton);

  return todoDiv;
}

//Create / add Todo
function addTodo(event) {
  event.preventDefault();

  if (!todoInput.value || todoInput.value == "") {
    alert("Invalid input!!!!!");
    return;
  }

  //Add and save new todos
  const todoObj = addTodoAndSave(todoInput.value);
  const todoElement = createTodoElement(todoObj);
  todoElements[todoObj.id] = todoElement;

  todoList.appendChild(todoElement);
  alert(`Added task '${todoInput.value}' successfully!`);
  todoInput.value = "";
}

function checkComplete(id) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("slide");

    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function checkDelete(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("slide");

    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// Multi-options
function filterTodo(e) {
  storageTodos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todoElements[todo.id].style.display = "flex";
        break;
      case "completed":
        if (todo.complete) {
          todoElements[todo.id].style.display = "flex";
        } else {
          todoElements[todo.id].style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.complete) {
          todoElements[todo.id].style.display = "flex";
        } else {
          todoElements[todo.id].style.display = "none";
        }
        break;
      case "priority":
        if (todo.priority) {
          todoElements[todo.id].style.display = "flex";
        } else {
          todoElements[todo.id].style.display = "none";
        }
        break;
    }
  });
}
