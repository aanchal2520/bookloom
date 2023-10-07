const mongoose = require('mongoose');

const interactionEnum = ['LIKE', 'READ'];

const userInteractionSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    book_id: {
        type: String,
        required: true
    }, 
    interaction: {
        type: String,
        enum: interactionEnum,
        required: true
    }
});

const UserInteraction = mongoose.model("userInteraction", userInteractionSchema);
module.exports = UserInteraction;