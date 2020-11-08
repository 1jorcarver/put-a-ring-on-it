async function editFormHandler(event) {
    event.preventDefault();

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