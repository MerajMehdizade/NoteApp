let $ = document
const todoNameInput = $.querySelector("#todoNameInput")
const todoAddIcon = $.querySelector("#todoAddIcon")
const todoTrashIcon = $.querySelector("#todoTrashIcon")
let inputValue;
const addNewTodo = (inputValue) => {
    inputValue ? alert(inputValue) : alert("empty")
}
const resetInputValue = () => {
    todoNameInput.value = ''
}

todoNameInput.addEventListener('keyup', (event) => {
    inputValue = event.target.value
    if (event.keyCode === 13) {
        addNewTodo(inputValue)
        resetInputValue()
    }
})
todoAddIcon.addEventListener("click", () => {
    addNewTodo(inputValue)
    resetInputValue()
})
todoTrashIcon.addEventListener("click", () => {
    resetInputValue()
})