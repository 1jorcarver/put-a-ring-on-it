async function signUpFormHandler(event) {
    event.preventDefault();

    const firstname = document.querySelector('#firstName-signup').value.trim();
    const lastname = document.querySelector('#lastName-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (firstname && lastname && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                firstname,
                lastname,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        //check to see if the response was ok
        if (response.ok) {
            console.log('success');
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signUpFormHandler);