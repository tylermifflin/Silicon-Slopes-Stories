const User = require('./User');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {