const mongoose = require('mongoose');

const WordDisLikeSchema = mongoose.Schema({
    userId: {
        type: String,
        ref: "user"
    },
    wordId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'word',
    },
    isDisLike: {
        type: Boolean,
        default: true,
    },
}); 

const WordDisLike = mongoose.model("worddislike", WordDisLikeSchema);
module.exports = WordDisLike;