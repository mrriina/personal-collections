const {Comment, Profile} = require('../models/models')

class CommentController {
    async createComment(req, res) {
        try {
            const {content, collectionItemId, profileId} = req.body
            const comment = await Comment.create({content, collectionItemId, profileId})
            return res.json({comment: {
                                id: comment.id,
                                content: comment.content,
                                collectionItemId: comment.collectionItemId,
                                profileId: comment.profileId,
                            }
            })            
        } catch (e) {
            return res.status(400).json({message: `Server error: ${e.message}`})
        }
    }

    async getCommentsByItemId(req, res) {
        try {
            const _itemId = req.params.itemId
            const comments = await Comment.findAll({
                where: { collectionItemId: _itemId },
                include: {
                    model: Profile,
                    attributes: ['name'],
                },
            })
            
            if(!comments) {
                return res.status(500).json({message: 'Comments not found'})
            }

            return res.json({comments})
        } catch (e) {
            return res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = new CommentController()