// set up logout function
const logout = async () => {
    const response = await fetch('/api/users/logout', {