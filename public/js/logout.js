// set up logout function
const logout = async () => {
    const Logout = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (Logout.ok) {
        // redirect to homepage
        document.location.replace('/');
    } else {
        alert('Logout unsuccessful');
    }
};

// add event listener to logout button
document.querySelector('#logout').addEventListener('click', logout);
