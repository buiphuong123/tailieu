const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        require: true,
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    resetPasswordToken: {
        type: String, 
        require: false,
    },
    resetPasswordExpires: {
        type: Date,
        require: false,
    }
}); 

const User = mongoose.model("user", userSchema);
module.exports = User;