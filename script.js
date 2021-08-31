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

    if (task.date !== undefined) {
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
    if (task.done) {
        title.classList.add('taskDone');
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

function createDescription(task) {
    let descript;
    if (task.description !== undefined) {
        descript = document.createElement('p');
        descript.innerHTML = task.description;
    }
    else {
        descript = document.createElement('p');
    }

    return descript;
}

function createDate(task) {
    let date = document.createElement('p');
    date.id = 'date'
    if (new Date(task.date) < new Date()) {
        date.classList.add('lastDate');
    }

    if (typeof (task.date) !== '')
        task.date = new Date(task.date)
    date.innerHTML = task.date.toLocaleDateString('uk');
    return date;
}


function deleteTodo() {
    let div = this.parentNode

    fetch(tasksEnpoint + '/' + div.parentNode.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
    .then(res => {
        if(res.ok){
            div.parentNode.remove();
        }
    })
    
}

function changeStatus() {
    let label = this.parentNode;
    let checkedBox = label.firstChild;
    let text = label.lastChild;
    let hide = document.getElementById("hideBtn");
    if (checkedBox.checked) {
        text.classList.add('taskDone');
        if (hide.disabled) {
            label.parentNode.parentNode.remove()
        }
    }
    else {
        text.classList.remove('taskDone');
    }

    fetch(tasksEnpoint + '/' + checkedBox.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ done: checkedBox.checked })
    })
}

function showDone() {
    removeTasks();

    fetch(tasksEnpoint)
        .then(response => response.json())
        .then(tasks => tasks.forEach(createTaskDiv));

    buttonStatus();
}

function hideDone() {
    removeTasks();

    fetch(tasksEnpoint)
        .then(response => response.json())
        .then(tasks => tasks.forEach((element) => {
            if (element.done === false) {
                createTaskDiv(element)
            }
        }));

    buttonStatus();
}

function removeTasks() {
    let div = document.querySelectorAll('.task');
    div.forEach((elem) => {
        elem.remove()
    })
}

function buttonStatus() {
    let show = document.getElementById("showBtn");
    let hide = document.getElementById("hideBtn");
    show.disabled = !show.disabled;
    hide.disabled = !hide.disabled;

}

const addTaskForm = document.forms['addTask'];

function createTask(formData) {
    let contact = Object.fromEntries(formData.entries())
    let newTask = { title: contact.title, done: false, description: contact.description, date: new Date(contact.date) };
    return newTask;
}

const tasksEnpoint = 'http://localhost:3000/tasks'

addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(addTaskForm);
    const task = createTask(formData);

    postTask(task)
        .then(task => {
            createTaskDiv(task)
            addTaskForm.reset();
        })
});

function postTask(task) {
    return fetch(tasksEnpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    .then(response => response.json())
    
}

fetch(tasksEnpoint)
    .then(response => response.json())
    .then(tasks => tasks.forEach(createTaskDiv));