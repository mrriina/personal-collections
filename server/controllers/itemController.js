const {CollectionItem, CollectionField, Collection, Profile} = require('../models/models')

class ItemController {
    async createItem(req, res) {
        try {
            const {title, tags, customFields, collectionId} = req.body
            const item = await CollectionItem.create({title, tags, customFields, collectionId})
            
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

    async getItemById(req, res) {
        try {
            const _id = req.params.id
            const item = await CollectionItem.findOne({
                where: {id: _id},
                include: [Collection],
            })

            if(!item) {
                return res.status(500).json({message: 'Item not found'})
            }

            const { collection } = item;
            if (!collection) {
                return res.status(404).json({ message: 'Collection not found for this item' });
            }
            return res.json({ item, collection });
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }

    async getLatestItems(req, res) {
        try {
            const latestItems = await CollectionItem.findAll({
                order: [['createdAt', 'DESC']],
                limit: 5,
                include: [
                    {
                    model: Collection,
                    attributes: ['title'],
                    include: [
                        {
                        model: Profile,
                        attributes: ['name'],
                        },
                    ],
                    },
                ],
            });
        
            if (!latestItems || latestItems.length === 0) {
                return res.status(404).json({ message: 'Latest items not found' });
            }
            return res.json({ latestItems });
        } catch (error) {
          return res.status(500).json({ message: 'Server error' });
        }
    }

    async deleteItem(req, res) {
        try {
            const _id = req.params.id
            const item = await CollectionItem.findOne({where: {id: _id}})
            if(!item) {
                return res.status(500).json({message: 'Item with this id not found'})
            }
            await CollectionItem.destroy({where: {id: _id}})
            return res.status(200).json({message: 'The item has been successfully deleted'})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }

    async deleteItemsByCollectionId(req, res) {
        try {
            const collectionId = req.params.id
            const items = await CollectionItem.findOne({where: {collectionId: collectionId}})
            if(!items) {
                return res.status(500).json({message: 'Items with this collection id not found'})
            }
            await CollectionItem.destroy({where: {collectionId: collectionId}})
            return res.status(200).json({message: 'Items have been successfully deleted'})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }

    async updateItemById(req, res) {
        try {
            const {title, tags, customFields} = req.body
            const _id = req.params.id
            const item = CollectionItem.findOne({where: {id: _id}})
            if(!item) {
                return res.status(500).json({message: 'Item with this id not found'})
            }
            await CollectionItem.update({title, tags, customFields}, {where: {id: _id}})
            
            return res.json({message: 'Item has been successfully updated'})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    } 
}

module.exports = new ItemController()