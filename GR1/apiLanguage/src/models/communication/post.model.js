const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user_id: {
        type: Object,
        require: true
    },
    time: {
        type: Date,
        require: true
    },
    title: {
        type: String,
        require: false
    },
    theme: {
        type: String,
        require: true
    },
    content: {
        type: Object,
        require: true,
    },
    comment: {
        type: Array,
        require: false
    },
    countlike: {
        type: Number,
        require: false
    },
    dataVocuShare: {
        type: String,
        require: false,
    },
    review: {
        type: Number, //0 refuse(từ chối),1  accept(chấp nhận), 2 not approved(chưa duyệt)
        require: true

    }
    
}); 

const Post = mongoose.model("post", postSchema);
module.exports = Post;