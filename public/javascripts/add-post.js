// const { DataTypes } = require("sequelize/types");


// DateTime date = DateTime.parseExact()


async function newFormHandler(event) {
    event.preventDefault();
    const textMessage = document.querySelector('input[name="text-message"]').value;
    const title = document.querySelector('input[name="event-name"]').value;
    const comments = document.querySelector('input[name="event-comments"]').value;
    const eventdate = document.querySelector('input[name="event-date"]').value;
    let time = document.querySelector('input[name="event-time"]').value;
    //debugger;
    const eventdatetime = await Date(eventdate + ' ' + time);
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        comments,
        eventdatetime,
        textMessage
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }

 
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);