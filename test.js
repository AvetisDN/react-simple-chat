window.addEventListener('load', (e) => {
    if(localStorage.getItem('chat-content')) {
        document.getElementById('chat').innerHTML = localStorage.getItem('chat-content');
    }
});

const form = document.getElementById('msg-form');
const name = document.getElementById('name');
const message = document.getElementById('msg');
const chat = document.getElementById('chat');

let ws = new WebSocket('ws://localhost:3030');
ws.onopen = function(e) {

};
ws.onmessage = function (e) {
    let obj = JSON.parse(e.data);
    let msgContainer = document.createElement('div');
    msgContainer.classList.add('msg-container');
    msgContainer.classList.add('alert');
    msgContainer.classList.add('w-75');
    if(obj.name === name.value) {
        msgContainer.classList.add('alert-success');
        msgContainer.classList.add('offset-3');
    } else {
        msgContainer.classList.add('alert-info');
    }

    let userName = document.createElement('h5');
    userName.classList.add('m-0');
    let msgDate = document.createElement('small');
    let userText = document.createElement('div');
    userName.innerText = obj.name;
    userText.innerText = obj.text;
    let date = new Date();
    msgDate.innerText = date.toLocaleTimeString();
    msgContainer.appendChild(userName);
    msgContainer.appendChild(msgDate);
    msgContainer.appendChild(userText);
    chat.appendChild(msgContainer);

    localStorage.setItem('chat-content', chat.innerHTML);
};
ws.onerror = function (e) {
    console.error(e);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(message.value !== '' && name.value !== '') {
        let msgObj = {
            name: name.value,
            text: message.value
        };
        ws.send(JSON.stringify(msgObj));
    }
});
