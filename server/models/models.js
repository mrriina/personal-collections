const sequelize = require('../db')
const {DataTypes, DATE} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, require:true},
    email: {type: DataTypes.STRING, require:true, unique:true},
    password: {type: DataTypes.STRING, require:true},
    role: { type: DataTypes.STRING, enum: ["user", "admin"], default: "user" },
})

module.exports = {User}