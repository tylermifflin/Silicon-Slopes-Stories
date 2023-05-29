// setting up seed data to import into the database from blogpostData.js and userData.js
const sequelize = require('../config/connection');
const seedBlogpost = require('./blogpostData');
const seedUser = require('./userData');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await seedUser();
    console.log('--------------');
    await seedBlogpost();
    console.log('--------------');
    process.exit(0);
};

seedAll();
