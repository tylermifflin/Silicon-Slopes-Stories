// set up login and signup forms
const loginTemplate = async (event) => {
    event.preventDefault();

    // get values from login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // if email and password are entered
    if (email && password) {
        // send POST request to login route
        const user = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });