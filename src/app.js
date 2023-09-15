
// Varibals
let $ = document
const todoNameInput = $.querySelector("#todoNameInput")
const todoAddIcon = $.querySelector("#todoAddIcon")
const todoResetIcon = $.querySelector("#todoResetIcon")
const todoContent = $.querySelector("#todoContent")
let inputValue;
todoNameInput.focus()
// Functions
const addNewTodo = (inputValue) => {
  todoNameInput.classList.remove("border-danger")
  if (inputValue) {
    let todoBox = $.createElement("div")
    let todoValue = $.createElement('h5')
    let iconElm = $.createElement("i")
    todoBox.className = "col-9 col-md-5 w-full border p-4 rounded-3 text-bold pointer d-flex justify-content-between items-center"
    iconElm.className = "bi bi-trash-fill text-danger h3 trashIcon"
    todoValue.innerHTML = inputValue
    todoContent.append(todoBox)
    todoBox.append(todoValue)
    todoBox.append(iconElm)
    iconElm.addEventListener("click", removeTodo)
  } else {
    todoNameInput.classList.add("border-danger")
  }

}
const removeTodo = (e) => {
  e.target.parentElement.remove()
}
const resetInputValue = () => {
  todoNameInput.value = ''
}
// EventListener
todoNameInput.addEventListener('keyup', (event) => {
  inputValue = event.target.value
  if (event.keyCode === 13) {
    addNewTodo(inputValue)
    resetInputValue()
    inputValue = ""
  }
})
todoAddIcon.addEventListener("click", () => {
  addNewTodo(inputValue)
  resetInputValue()
  inputValue = ""
})
todoResetIcon.addEventListener("click", () => {
  resetInputValue()
})