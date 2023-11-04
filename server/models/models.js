const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Profile = sequelize.define('profile', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, require:true},
    email: {type: DataTypes.STRING, require:true, unique:true},
    password: {type: DataTypes.STRING, require:true},
    role: { type: DataTypes.STRING, enum: ["user", "admin"], defaultValue: "user" },
});


const Collection = sequelize.define('collection', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    title: {type: DataTypes.STRING, require:true},
    description: {type: DataTypes.TEXT, require:true},
    theme: {type: DataTypes.STRING, require:true},
    image_url: {type: DataTypes.STRING},
    // owner: { type: DataTypes.INTEGER, require:true, allowNull: false}, // Внешний ключ, связанный с таблицей User
});


const CollectionField = sequelize.define('collection_field', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // collection_id: { type: DataTypes.INTEGER, require:true, allowNull: false}, // Внешний ключ, связанный с таблицей Collection
    field_name: { type: DataTypes.STRING, require:true, allowNull: false},
    field_type: { type: DataTypes.STRING, require:true, allowNull: false},
});


Profile.hasMany(Collection);
Collection.belongsTo(Profile);

Collection.hasMany(CollectionField);
CollectionField.belongsTo(Collection);


module.exports = {
    Profile,
    Collection,
    CollectionField
}