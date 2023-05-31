// setting up an event listener for the new blog post form
const newBlogPostHandler = async (event) => {
    event.preventDefault();

    // getting the title and content from the form
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    