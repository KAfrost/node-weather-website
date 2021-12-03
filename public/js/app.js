const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (event) =>{
    // prevents the default behavior of the form -> reloading the page thus removing all the information from the form
    event.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    
    // "fetch" data from this url and then execute this function
    fetch('/weather?address='+ location).then((response )=>{
        response.json().then((data)=>{
            if (data.error){
            messageOne.textContent = data.error;
            } else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    });
    
})