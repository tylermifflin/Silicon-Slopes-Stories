// setting up seed data to import into the database from blogpostData.js and userData.js
const sequelize = require('../config/connection');
const { BlogPost, User } = require('../models');

const blogpostData = require('./blogpostData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    
    for (const blogpost of blogpostData) {
        await BlogPost.create({
        ...blogpost,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }
    
    process.exit(0);
    };

seedDatabase();

