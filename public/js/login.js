// set up login and signup forms
const loginFromHandler = async (event) => {
    event.preventDefault();

    // get values from login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();