'use strict'
const { Schema, model } = require('mongoose')

const DOCUMENT_NAME = 'React'
const COLLECTION_NAME = 'Reacts'

const reactSchema = new Schema(
    {
        artworkId: {
            type: Schema.Types.ObjectId,
            ref: 'Artwork'
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)

module.exports = model(DOCUMENT_NAME, reactSchema)