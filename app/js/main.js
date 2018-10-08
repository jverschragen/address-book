const url = 'https://randomuser.me/api/?nat=us,dk,fr,gb&results=10';

const contacts = [];

fetch(url)
    .then(blob => blob.json())
    .then(data => contacts.push(...data.results))
    .catch(function(error) {
        console.log(error);
    });

console.log(contacts);

function sortContacts(){
    contacts.sort(function (a, b) {
        if (a.name.first < b.name.first) return -1;
        if (a.name.first > b.name.first) return 1;
    });
}

function findMatches(wordToMatch, contacts){
    return contacts.filter(contact => {
       const regex = new RegExp(wordToMatch, 'gi');
       return contact.name.first.match(regex) || contact.name.last.match(regex) || contact.phone.match(regex)
    });
}

function displayMatches() {
    const matchArray = findMatches(this.value, contacts);
    const html = matchArray.map(contact => {
        const regex = new RegExp(this.value, 'gi');
        const firstName = contact.name.first.replace(regex, `<span class="hl">${this.value}</span>`);
        const lastName = contact.name.last.replace(regex, `<span class="hl">${this.value}</span>`);
        const phoneNumber = contact.phone;
        const img = contact.picture.medium;
        return`
          <li>
            <img src=${img}>
            <span class="name">${firstName}, ${lastName}</span>
            <span class="phone">${phoneNumber}</span>
          </li>
        `;
        }).join('');
        contactList.innerHTML = html;
}


// // sort by firstname (alphabetically)
// contacts.sort(function (a, b) {
//     if (a.name.first < b.name.first) return -1;
//     if (a.name.first > b.name.first) return 1;
// });
// // return a list with contacts
// return contacts.map(function (contact) {
//     let li = createNode('li'),
//         img = createNode('img'),
//         spanName = createNode('span.name');
//     spanPhone = createNode('span.phoneNumber');
//     img.src = contact.picture.medium;
//
//     spanName.innerHTML = `${contact.name.first} ${contact.name.last}`;
//     spanPhone.innerHTML = `${contact.phone}`;
//     append(li, img);
//     append(li, spanName);
//     append(li, spanPhone);
//     append(ul, li);
// });


const searchInput = document.querySelector('.search');
const contactList = document.querySelector('.contacts');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
