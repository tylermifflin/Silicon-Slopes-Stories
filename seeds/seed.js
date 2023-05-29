// setting up seed data to import into the database from blogpostData.json and userData.json
const sequelize = require('../config/connection');
const { User, BlogPost } = require('../models');

const userData = require('./userData.json');
const blogpostData = require('./blogpostData.json');

const seedDatabase = async () => {