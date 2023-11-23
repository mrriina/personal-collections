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

Profile.hasMany(Collection);
Collection.belongsTo(Profile, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});


const CollectionField = sequelize.define('collection_field', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    field_name: { type: DataTypes.STRING, require:true, allowNull: false},
    field_type: { type: DataTypes.STRING, require:true, allowNull: false},
    isRequired: { type: DataTypes.BOOLEAN, require:true, allowNull: false},
});

Collection.hasMany(CollectionField);
CollectionField.belongsTo(Collection, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});


const CollectionItem = sequelize.define('collection_item', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, require: true },
    tags: { type: DataTypes.STRING, require: true },
    customFields: { type: DataTypes.JSONB },
});

Collection.hasMany(CollectionItem);
CollectionItem.belongsTo(Collection, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },
});

CollectionItem.hasMany(Comment);
Comment.belongsTo(CollectionItem, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});

Profile.hasMany(Comment);
Comment.belongsTo(Profile, {
    foreignKey: {
        allowNull: false,
    },
    onDelete: 'CASCADE',
});


module.exports = {
    Profile,
    Collection,
    CollectionField,
    CollectionItem,
    Comment
}