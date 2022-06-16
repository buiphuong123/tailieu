const mongoose = require('mongoose');

const likepostSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    }
}); 

const LikePost = mongoose.model("likepost", likepostSchema);
module.exports = LikePost;