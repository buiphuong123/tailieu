const mongoose = require('mongoose');

const wordactiondislikeSchema = mongoose.Schema({
    comment_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    user_id_like: {
        type: mongoose.Schema.Types.ObjectId,
        require: false,
    }
}); 

const WordActiondislike = mongoose.model("wordactiondislike", wordactiondislikeSchema);
module.exports = WordActiondislike;