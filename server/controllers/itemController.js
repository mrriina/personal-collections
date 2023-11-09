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
    
}

module.exports = new ItemController()