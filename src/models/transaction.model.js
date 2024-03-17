const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'Transaction';
const COLLECTION_NAME = 'transactions';

const transactionSchema = new Schema({
    type: {
        type: String,
        enum: ['payArtWork', 'withdraw ', 'registerCreator'],
        required: true
    },
    content: {
        type: String,
        trim: true,
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    artworkId: {
        type: Schema.Types.ObjectId,
        ref: 'Artwork',
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }


}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, transactionSchema);