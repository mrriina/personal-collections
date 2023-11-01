const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Collection} = require('../models/models')

class CollectionController {

    async createCollection(req, res) {
        try {
            const {title, description, theme, image_url, owner} = req.body
            // owner = req.user.userId
            
            const collection = await Collection.create({title, description, theme, image_url, owner})
            
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