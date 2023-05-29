// seed database with userData moedl

const { User } = require('../models');

const userData = [
    {
        "name": "Rick James",
        "email": "rjames@test.com",
        "password": "rickjames1",
    },
    {
        "name": "John Doe",
        "email": "jdoe@test.com",
        "password": "johndoe123",
    },
    {
        "name": "Billy Bob",
        "email": "billybob@test.com",
        "password": "billybob12",
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;

