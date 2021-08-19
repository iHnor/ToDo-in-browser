
let oneTask = {
    task: 
}

let contacts = [
    'Описать массив задач в JavaScript',
    'Создать базовый макет страницы для вывода задач',
    'Реализовать функцию добавления HTML тэгов для вывода информации о задаче'
];

let contactsElement = document.getElementById('list-tasks');

function appendContact(task) {
    contactsElement.innerHTML += `<p>${task}</p>`;
}

contacts.forEach(appendContact);
