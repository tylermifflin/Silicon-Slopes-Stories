// setting up seed data to import into the database from blogpostData.js and userData.js
const sequelize = require('../config/connection');
const { BlogPost, User } = require('../models');
const seedBlogpost = require('./blogpostData');
const seedUser = require('./userData');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await User.bulkCreate(seedUser, {
        individualHooks: true,
        returning: true,
        });
    console.log('--------------');
    await BlogPost.bulkCreate(seedBlogpost, {
        individualHooks: true,
        returning: true,
        });

    console.log('--------------');
    process.exit(0);
};

seedAll();
