// set up login form
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
        if (user.ok) {
            // redirect to dashboard
            document.location.replace('/dashboard');
        } else {
            alert('Failed to log in');
        }
    }
};

// set up signup form
const signupTemplate = async (event) => {
    event.preventDefault();

    // get values from signup form
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // if name, email, and password are entered
    if (name && email && password) {
        // send POST request to signup route
        const user = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (user.ok) {
            // redirect to dashboard
            document.location.replace('/dashboard');
        } else {
            alert('Failed to sign up');
        }
    }
};

// add event listeners to login and signup buttons
document
    .querySelector('#login')
    .addEventListener('submit', loginTemplate);

document
    .querySelector('#signup')
    .addEventListener('submit', signupTemplate);
