let tasks = [
    {id: 1, title: 'Описать массив задач в JavaScript', done: false, description: 'Add Some descript', date: '2021-11-10'},
    {id: 2, title: 'Создать базовый макет страницы для вывода задач', done: false, description: 'Just task', date: '2021-08-20'},
    {id: 3, title: 'Реализовать функцию добавления HTML тэгов для вывода информации о задаче', done: false, date: '2021-08-01'},
    {id: 4, title: 'Ще якась задачка', done: false, date: '2021-08-01'}
    
];

let contactsElement = document.getElementById('tasks');

function createTaskDiv(task) {
    let tasksList = document.createElement('div')
    tasksList.id = task.id;
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

   
    let description = createDescription(task);
    taskDescription.appendChild(description);   
    
    if(task.date !== undefined){
        let taskDate = createDate(task);
        taskDescription.appendChild(taskDate);
    }
   
    tasksList.appendChild(taskBase);
    tasksList.appendChild(taskDescription);

    contactsElement.appendChild(tasksList);

    deleteButton.onclick = deleteTodo;
    checkBox.onclick = changeStatus;


    return tasksList;
}

function createTitle(task) {
    let title = document.createElement('label');
    if (task.done === true){
        title.style.textDecoration = 'line-through'
        title.style.color = '#C0C0C0'
    }
    title.innerHTML = task.title;
    return title;
}

function createCheckbox(task) {
    let checkBox = document.createElement('input')
    checkBox.type = 'checkbox';
    checkBox.id = task.id;
    checkBox.className = 'custom-checkbox';
    if (task.done)
        checkBox.checked = 'checked'

    return checkBox;
}

function createDeletebutton() {
    let button = document.createElement('button');
    button.innerHTML = 'x';
    return button;
}

function createDescription(task){
    let descript;
    if(task.description !== undefined){
        descript = document.createElement('p');
        descript.innerHTML = task.description;
    }
    else {
        descript = document.createElement('p');
    }

    return descript;
}

function createDate(task){
    let date = document.createElement('p');
    date.id = 'date'
    if (new Date(task.date) < (new Date()))
        date.style.color = 'red';

    date.innerHTML = task.date;
    return date;
}


function deleteTodo(){
    let div = this.parentNode
    let idList = tasks.findIndex(task => task.id === +div.parentNode.id)
    tasks.splice(idList, 1); 
    console.log(idList);
    div.parentNode.remove();
}

function changeStatus(){
    let label = this.parentNode;
    let checkedBox = label.firstChild;
    let text = label.lastChild
    let tasksID = tasks.findIndex(task => task.id === +checkedBox.id)
    let hide = document.getElementById("hideBtn"); 

    if (checkedBox.checked){
        tasks[tasksID].done = checkedBox.checked;
        text.style.textDecoration = 'line-through'
        text.style.color = '#C0C0C0'
        if(hide.disabled){
            document.getElementById(`${tasks[tasksID].id}`).remove()
        }
    }
    else {
        tasks[tasksID].done = checkedBox.checked;
        label.lastChild.style.textDecoration = 'none'
        text.style.color = 'rgb(61, 61, 61)'
    }

}

tasks.forEach(createTaskDiv); 

function showDone(){
    removeTasks();
    tasks.forEach(createTaskDiv); 
    buttonStatus();
}

function hideDone(){
    removeTasks();

    let sortElem = [];
    tasks.forEach((element) => {
        if (element.done === false){
            sortElem.push(element)
        }
    })

    sortElem.forEach(createTaskDiv);
    buttonStatus();
}

function removeTasks(){
    let div = document.querySelectorAll('.task');
    div.forEach((elem) => {
        elem.remove()
    })
}

function buttonStatus(){
    let show = document.getElementById("showBtn");
    let hide = document.getElementById("hideBtn"); 
    show.disabled = !show.disabled;
    hide.disabled = !hide.disabled;
    
}