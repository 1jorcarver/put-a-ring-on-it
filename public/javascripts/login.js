async function signUpFormHandler(event) {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstName-signup').value.trim();
    const lastName = document.querySelector('#lastName-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (firstName && lastName && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      //check to see if the response was ok
      if(response.ok){
          console.log('success');
      } else {
          alert(response.statusText);
      }
    }
  }

async function loginFormHandler(event){
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login',{
            method: 'post',
            body: JSON.stringify({
                email,
                password, 
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok){
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
    }

}

document.querySelector('.login-form').addEventListener('submit',loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit',signUpFormHandler);