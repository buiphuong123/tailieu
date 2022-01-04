const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    content: {
        type: String,
        require: true,
    },
    time: {
        type: Date,
        require: true
    },
    action: {
        type: String,
        require: true
    },
    comment_id: {
        type: String,
        require: true
    },
    data: {
        type: Object,
        require: true,
    },
    isRead: {
        type: Boolean,
        default: false,
    }
}); 

const Notification = mongoose.model("notification", notificationSchema);
module.exports = Notification;