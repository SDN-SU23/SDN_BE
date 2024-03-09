/**
 * type: {
        type: String,
        enum: ['payArtWork', 'withdraw '],
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
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
 */
// fake some data

