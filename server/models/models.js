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
});


const CollectionField = sequelize.define('collection_field', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    field_name: { type: DataTypes.STRING, require:true, allowNull: false},
    field_type: { type: DataTypes.STRING, require:true, allowNull: false},
});


const CollectionItem = sequelize.define('collection_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, require: true },
    tags: { type: DataTypes.STRING, require: true },
    customFields: { type: DataTypes.JSONB },
});


Profile.hasMany(Collection);
Collection.belongsTo(Profile, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

Collection.hasMany(CollectionField);
CollectionField.belongsTo(Collection, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

CollectionItem.belongsTo(Collection, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});


module.exports = {
    Profile,
    Collection,
    CollectionField,
    CollectionItem
}