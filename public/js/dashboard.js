// setting up an event listener for the new blog post form
const newBlogPostHandler = async (event) => {
    event.preventDefault();

    // getting the title and content from the form
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();

    // if both the title and content exist, send a POST request to the API endpoint
    if (title && content) {
        const newBlogPost = await fetch('/api/blogposts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        // if the request is successful, reload the page
        if (newBlogPost.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Unsuccessful blog post');
        }
    }
};
