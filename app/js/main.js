function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

const ul = document.getElementById('contacts');
const url = 'https://randomuser.me/api/?results=10';
fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let contacts = data.results;
        return contacts.map(function(contact) {
            let li = createNode('li'),
                img = createNode('img'),
                span = createNode('span');
            img.src = contact.picture.medium;
            span.innerHTML = `${contact.name.first} ${contact.name.last}`;
            append(li, img);
            append(li, span);
            append(ul, li);
        })
    })
    .catch(function(error) {
        console.log(error);
    });