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
}

module.exports = new CollectionController()