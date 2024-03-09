const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'Comment'
const COLLECTION_NAME = 'Comments'

const commentSchema = new Schema(
    {
        authorId: {
            type: Schema.Types.ObjectId,
            trim: true,
            required: true,
            ref: 'User',
        },
        content: {
            type: String,
            trim: true,
            required: true,
        },
        artworkId: {
            type: Schema.Types.ObjectId,
            trim: true,
            required: true,
            ref: 'Artwork',
        },
        comment_children: {
            type: Array,
            default: [],
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
)

module.exports = model(DOCUMENT_NAME, commentSchema)
