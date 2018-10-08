function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById('contacts');
const url = 'https://randomuser.me/api/?nat=us,dk,fr,gb&results=10';

const contacts = [];

fetch(url)
    .then(blob => blob.json())
    .then(data => contacts.push(...data))
    .catch(function(error) {
        console.log(error);
    });

function showContacts() {
    // sort by firstname (alphabetically)
    contacts.sort(function (a, b) {
        if (a.name.first < b.name.first) return -1;
        if (a.name.first > b.name.first) return 1;
    });
    // return a list with contacts
    return contacts.map(function (contact) {
        let li = createNode('li'),
            img = createNode('img'),
            spanName = createNode('span.name');
        spanPhone = createNode('span.phoneNumber');
        img.src = contact.picture.medium;

        spanName.innerHTML = `${contact.name.first} ${contact.name.last}`;
        spanPhone.innerHTML = `${contact.phone}`;
        append(li, img);
        append(li, spanName);
        append(li, spanPhone);
        append(ul, li);
    });
};

document.addEventListener("DOMContentLoaded", showContacts);

