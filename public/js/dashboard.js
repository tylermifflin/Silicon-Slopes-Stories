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

        // if the request is successful, reload the dashboard, otherwise alert the user
        if (newBlogPost.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Unsuccessful blog post');
        }
    }
};

// setting up an event listener to update a blog post
const updateBlogPostHandler = async (event) => {
    event.preventDefault();

    // getting the title and content from the form
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    
    // getting the id from the URL
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // if both the title and content exist, send a PUT request to the API endpoint
    if (title && content) {
        const updateBlogPost = await fetch(`/api/blogposts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        // if the request is successful, reload the dashboard, otherwise alert the user
        if (updateBlogPost.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Unsuccessful update');
        }
    }
};

// setting up an event listener to delete a blog post
const deleteBlogPostHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const deleteBlogPost = await fetch(`/api/blogposts/${id}`, {
            method: 'DELETE',
        });

    // if the request is successful, reload the dashboard, otherwise alert the user
    if (deleteBlogPost.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Unsuccessful deletion');
    }
}
};

document
    .querySelector('.new-blogpost-form')
    .addEventListener('submit', newBlogPostHandler);

document
    .querySelector('.update-blogpost')
    .addEventListener('submit', updateBlogPostHandler);

document
    .querySelector('.delete-blogpost')
    .addEventListener('click', deleteBlogPostHandler);
    


