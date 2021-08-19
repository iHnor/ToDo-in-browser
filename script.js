class Contact {
    constructor(task) {
        this.task = task;
    }

}
​
let contacts = [
    new Contact(task)
]
​
const contactsElement = document.getElementById('contacts')
function appendContact(contact) {
    const { fistName, lastName, email} = contact;
    contactsElement.innerHTML += `<p>${fistName} ${lastName} <a href="mailto:${email}">&lt;${email}&gt;</a></p>`;
}
​
contacts.forEach(appendContact);