async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    await fetch(`/api/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
  }
  
  document.querySelector('.edit-event-form').addEventListener('submit', editFormHandler);