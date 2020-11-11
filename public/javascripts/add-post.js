async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="event-name"]').value;
    const comments = document.querySelector('input[name="event-comments"]').value;
    const eventdate = document.querySelector('input[name="event-date"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        comments,
        eventdate,
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
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);;