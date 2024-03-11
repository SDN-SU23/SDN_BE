const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'KeyToken';
const COLLECTION_NAME = 'KeyTokens';

var keyTokenSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    publicKey: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, keyTokenSchema);



