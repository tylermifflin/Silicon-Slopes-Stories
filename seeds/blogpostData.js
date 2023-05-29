const { Blogpost } = require('../models');


const blogpostData = [
    {
        "title" : "Silicon Slopes Coding Jobs",
        "content" : "Tech Companies in Lehi are hiring full stack developers straight out of a coding bootcamp.",
        "user_id" : 1

    },
    {   
        "title" : "How to get a job as a developer",
        "content" : "The best way to get a job as a developer is to build a portfolio of projects that you can show to employers.",
        "user_id" : 2
    },
    { 
        "title" : "Front End vs Back End",
        "content" : "Front end developers work on the client side of the application, while back end developers work on the server side of the application.",
        "user_id" : 3
    },
];

const seedBlogpost = () => Blogpost.bulkCreate(blogpostData);

module.exports = seedBlogpost;