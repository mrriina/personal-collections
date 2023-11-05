const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Collection, CollectionField} = require('../models/models')

class CollectionController {

    async createCollection(req, res) {
        try {
            const {title, description, theme, image_url, owner, customFields} = req.body
            
            const collection = await Collection.create({title, description, theme, image_url, profileId: owner})

            customFields.forEach(async field => {
                const { name, type } = field;
                await CollectionField.create({
                    collectionId: collection.id,
                    field_name: name,
                    field_type: type,
                });
            });
            
            return res.json({collection: {
                                id: collection.id,
                                title: collection.title,
                                description: collection.description,
                                theme: collection.theme,
                                image_url: collection.image_url,
                            }
            })            
        } catch (e) {
            return res.status(400).json({message: `Server error: ${e.message}`})
        }
    }



    async getCollections(req, res) {
        try {
            const collections = await Collection.findAll({
                include: CollectionField,
            })
            if(!collections) {
                return res.status(500).json({message: 'Collections not found'})
            }
            return res.json({collections})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }

    
    async getCollectionById(req, res) {
        try {
            const _id = req.params.id

            const collection = await Collection.findOne({
                where: { id: _id },
                include: CollectionField,
            })
            
            if(!collection) {
                return res.status(500).json({message: 'Collection not found'})
            }
            return res.json({collection})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }


    async getCollectionsByProfileId(req, res) {
        try {
            const {profileId} = req.body

            const collections = await Collection.findAll({
                where: { profileId },
                include: CollectionField,
            })
            
            if(!collections) {
                return res.status(500).json({message: 'Collections not found'})
            }
            return res.json({collections})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }



    async deleteCollection(req, res) {
        try {
            const _id = req.params.id
            const collection = await Collection.findOne({where: {id: _id}})
            if(!collection) {
                return res.status(500).json({message: 'Collection with this id not found'})
            }
            await Collection.destroy({where: {id: _id}})
            return res.json({message: 'The collection has been successfully deleted'})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = new CollectionController()