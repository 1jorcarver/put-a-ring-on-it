async function deleteFormHandler(event) {
    event.preventDefault();
    await fetch(`/api/events/${id}`,{
        method: 'DELETE'
    });
}

document.querySelector('.delete-event-btn').addEventListener('click', deleteFormHandler);