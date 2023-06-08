// setting up seed data to import into the database from blogpostData.js and userData.js
const sequelize = require('../config/connection');
const { BlogPost, User, Comment } = require('../models');

const blogpostData = require('./blogpostData.json');
const userData = require('./userData.json');
const commentData = require('./commentData.json');

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

    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            blogpost_id: blogpostData[Math.floor(Math.random() * blogpostData.length)].id,
        });
    
    process.exit(0);
    }
};

seedDatabase();
