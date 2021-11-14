const {hash} = window.location;
const message = atob(hash.replace('#', ''));
if (message){
    document.querySelector('#message-panel').classList.add('hide');
    document.querySelector('#message-show').classList.remove('hide');
    document.querySelector('h1').innerHTML = message;

}

 document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();

     document.querySelector('#link-panel').classList.remove('hide');
     document.querySelector('#message-panel').classList.add('hide');

     const messageInput = document.querySelector('#message-input');
    const encrypted = btoa(messageInput.value);

    const linkInput = document.querySelector('#link-input');
    linkInput.value = `${window.location}#${encrypted}`;
    linkInput.select();


});

