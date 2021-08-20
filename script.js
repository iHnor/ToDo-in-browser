let contacts = [
    { title: 'Описать массив задач в JavaScript', done: true },
    { title: 'Создать базовый макет страницы для вывода задач', done: false },
    { title: 'Реализовать функцию добавления HTML тэгов для вывода информации о задаче', done: false }
];

let contactsElement = document.getElementById('tasks');

function createTaskDiv(task) {
    let tasksList = document.createElement('div')
    tasksList.className = 'task'

    let taskBase = document.createElement('div')
    taskBase.className = 'task-base'

    let taskDescription = document.createElement('div');
    taskDescription.className = 'task-description';


    let checkboxAndTask = document.createElement('div');
    checkboxAndTask.className = 'checkboxAndTask';

    let checkBox = createCheckbox(task);
    checkboxAndTask.appendChild(checkBox);
    let title = createTitle(task);
    checkboxAndTask.appendChild(title);

    let deleteButton = createDeletebutton();
    taskBase.appendChild(checkboxAndTask);
    taskBase.appendChild(deleteButton)

    let description = createDescription()
    
    // deleteButton.onclick = deleteTodo;
    tasksList.appendChild(taskBase);
    contactsElement.appendChild(tasksList);

    return tasksList;
}

function createTitle(task) {
    let title = document.createElement('label');
    title.innerHTML = task.title;
    // title.style.color = 'red';
    return title;
}

function createCheckbox(task) {
    let checkBox = document.createElement('input')
    checkBox.type = 'checkbox';
    checkBox.className = 'custom-checkbox';
    if (task.done)
        checkBox.checked = 'checked'

    return checkBox;
}

function createDeletebutton() {
    let button = document.createElement('button')
    button.innerHTML = 'x'
    return button
}

// function deleteTodo(){

// }

function createDescription(task){
    // let descript = document.
}

contacts.forEach(createTaskDiv); // createTaskDiv
