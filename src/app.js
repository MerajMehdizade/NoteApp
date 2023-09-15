
// Varibals
let $ = document
const todoNameInput = $.querySelector("#todoNameInput")
const todoAddIcon = $.querySelector("#todoAddIcon")
const todoResetIcon = $.querySelector("#todoResetIcon")
const todoContent = $.querySelector("#todoContent")
let inputValue;
todoNameInput.focus()

// localStorage

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Functions

function addTodo(value) {
  todoNameInput.classList.remove("border-danger")
  if (value !== "") {
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
    todoBox.className = "col-9 w-full border p-4 rounded-3 text-bold pointer d-flex justify-content-between items-center"
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

    trashIcon.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.remove()
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    })

    todoContent.appendChild(todoBox);
  });
}

const resetInputValue = () => {
  todoNameInput.value = ''
}

// EventListener

todoNameInput.addEventListener('keyup', (event) => {
  inputValue = event.target.value
  if (event.keyCode === 13) {
    addTodo(inputValue)
    resetInputValue()
    inputValue = ""
  }
})

todoAddIcon.addEventListener("click", () => {
  addTodo(inputValue)
  resetInputValue()
  inputValue = ""
})

todoResetIcon.addEventListener("click", () => {
  resetInputValue()
})

renderTodos();

