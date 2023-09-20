
// Varibals
let $ = document
const todoNameInput = $.querySelector("#todoNameInput")
const todoAddIcon = $.querySelector("#todoAddIcon")
const todoResetIcon = $.querySelector("#todoResetIcon")
const todoContent = $.querySelector("#todoContent")
const themeToogle = $.querySelector("#themeToogle")
let darkMode = false
let inputValue;
todoNameInput.focus()

// localStorage

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let localTheme = localStorage.getItem("theme")
// Functions

function addTodo(value) {
  todoNameInput.classList.remove("border-danger")
  if (inputValue) {
    const todo = {
      id: Date.now(),
      text: value,
      completed: false,
    };
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    todoNameInput.value = "";
    renderTodos();
  } else {
    todoNameInput.classList.add("border-danger")
  }
}
function renderTodos() {
  todoContent.innerHTML = "";
  todos.forEach((todo) => {

    let todoBox = $.createElement("div")
    let icons = $.createElement("div")
    let todoValue = $.createElement('h5')
    let completedIcon = $.createElement("i")
    let trashIcon = $.createElement("i")
    todoBox.className = "col-9 w-full border p-4 rounded-3 text-bold pointer d-flex justify-content-between items-center text-box"
    icons.className = "d-flex items-center gap-3"
    completedIcon.className = "bi bi-check2 text-success h2"
    trashIcon.className = "bi bi-trash2 text-danger h2"
    todoValue.className = "my-auto"
    todoValue.innerHTML = todo.text
    todoBox.append(todoValue)
    todoBox.append(icons)
    icons.append(completedIcon)
    icons.append(trashIcon)

    if (todo.completed) {
      todoBox.classList.add("completed");
      completedIcon.className = "bi bi-check2-all text-secondary h2"
    }

    completedIcon.addEventListener("click", () => {
      todo.completed = !todo.completed;
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });


    trashIcon.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    })
    todoContent.appendChild(todoBox);
  });
}
if (localTheme == "dark") {
  $.body.classList.add("dark")
  themeToogle.className = 'bi bi-moon text-light pointer h2'
} else {
  $.body.classList.remove("dark")
  themeToogle.className = 'bi bi-sun text-info pointer h2'
}

const resetInputValue = () => {
  todoNameInput.value = ''
}

// EventListener

todoNameInput.addEventListener('keyup', (event) => {
  inputValue = event.target.value
  if (event.keyCode === 13) {
    addTodo(inputValue)
    inputValue = ""
  }
})

todoAddIcon.addEventListener("click", () => {
  addTodo(inputValue)
  inputValue = ""
})

todoResetIcon.addEventListener("click", () => {
  resetInputValue()
})
themeToogle.addEventListener("click", () => {
  if (!darkMode) {
    $.body.classList.add("dark")
    darkMode = !darkMode
    themeToogle.className = 'bi bi-moon text-light pointer h2'
    localStorage.setItem("theme", "dark")
  } else {
    $.body.classList.remove("dark")
    darkMode = !darkMode
    themeToogle.className = 'bi bi-sun text-info pointer h2'
    localStorage.setItem("theme", "light")
  }
})

renderTodos();

