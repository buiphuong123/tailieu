const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    grammar_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    content: {
        type: String,
        require: true,
    },
    time: {
        type: Date,
        require: true,
    },
    review: {
        type: String, // refuse(từ chối), accept(chấp nhận), not approved(chưa duyệt)
        require: true,
    }, 
    time_review: {
        type: Date,
        require: false,
    },
    people_review: {
        type: String,
        require: false,
    },
    reason: {
        type: String,
        require: false,
    },
    like: {
        type: Number,
        require: false,
    },
    dislike: {
        type: Number,
        require: false,
    },
    islike: {
        type: Boolean,
        require: false,
    },
    isdislike: {
        type: Boolean,
        require: false,
    }
}); 

const Comment = mongoose.model("comment", commentSchema);
module.exports = Comment;