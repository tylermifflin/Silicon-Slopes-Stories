const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(userpassword) {
        return bcrypt.compareSync(userpassword, this.password);
    }
}

User.init(
    {
        id : {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        email : {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [10],
            },
        },
    },

    {
        hooks: {
            async beforeCreate(newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
            async beforeUpdate(updatedUser) => {
                updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
                return updatedUser;
            },
        },
        
