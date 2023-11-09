const {CollectionItem, CollectionField} = require('../models/models')

class ItemController {

    async createItem(req, res) {
        try {

            const {title, tags, customFields, collectionId} = req.body
            
            const item = await CollectionItem.create({title, tags, customFields, collectionId})

            // customFields.forEach(async field => {
            //     const { name, type } = field;
            //     await CollectionField.create({
            //         collectionId: collection.id,
            //         field_name: name,
            //         field_type: type,
            //     });
            // });
            
            return res.json({item: {
                                id: item.id,
                                title: item.title,
                                tags: item.tags,
                                customFields: item.customFields,
                                collectionId: item.collectionId,
                            }
            })            
        } catch (e) {
            return res.status(400).json({message: `Server error: ${e.message}`})
        }
    }


    async getItemsById(req, res) {
        try {
            const {collectionId} = req.body

            const items = await CollectionItem.findAll({
                where: { collectionId },
            })
            if(!items) {
                return res.status(500).json({message: 'Items not found'})
            }
            return res.json({items})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }
    
}

module.exports = new ItemController()