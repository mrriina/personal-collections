const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {Collection, CollectionField, CollectionItem} = require('../models/models')
const sequelize = require('../db')

class CollectionController {

    async createCollection(req, res) {
        try {
            const {title, description, theme, image_url, owner, customFields} = req.body
            
            const collection = await Collection.create({title, description, theme, image_url, profileId: owner})

            customFields.forEach(async field => {
                const { name, type, isRequired } = field;
                await CollectionField.create({
                    collectionId: collection.id,
                    field_name: name,
                    field_type: type,
                    isRequired: isRequired,
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
            return res.status(500).json({ message: 'Server error', error: e.message });
        }
    }


    // async getTopCollections(req, res) {
    //     try {
    //         const collections = await Collection.findAll({
    //             attributes: ['id', 'title'],
    //             include: [
    //               {
    //                 model: CollectionItem,
    //                 attributes: [],
    //                 required: false,
    //               },
    //             ],
    //             group: ['collection.id'],
    //             order: [[sequelize.fn('COUNT', sequelize.col('collection_items.id')), 'DESC']], // Сортировка по количеству элементов
    //           });
          
    //           const collectionsWithItemCount = collections.map((collection) => ({
    //             id: collection.id,
    //             title: collection.title,
    //             itemCount: collection.collectionItems.length || 0, // Используйте длину массива collectionItems
    //           }));
          
    //           return collectionsWithItemCount;
    //       } catch (error) {
    //         console.error('Error finding top Collections with most CollectionItems:', error);
    //         throw error;
    //       }
    //   }



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


    async updateCollectionById(req, res) {
        try {

            const {title, description, theme, image_url, customFields} = req.body
            const _id = req.params.id

            const collection = Collection.findOne({where: {id: _id}})

            if(!collection) {
                return res.status(500).json({message: 'Collection with this id not found'})
            }
            await Collection.update({title, description, theme, image_url}, {where: {id: _id}})

            await CollectionField.destroy({
                where: {
                    collectionId: _id,
                },
            });            

            customFields.forEach(async field => {
                const { name, type, isRequired } = field;
                await CollectionField.create({
                    collectionId: _id,
                    field_name: name,
                    field_type: type,
                    isRequired: isRequired,
                });
            });
            
            return res.json({message: 'Collection has been successfully updated'})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = new CollectionController()