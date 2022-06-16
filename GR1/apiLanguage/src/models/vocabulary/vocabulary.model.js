const mongoose = require('mongoose');

const vocabularySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    data: {
        type: Array,
        require: false,
    },
    share: {
        type: Array,
        require: false,
        public: false,
    },
    usershare: {
        type: String,
        require: false,
    },
    remind: {
        type: String,
        require: false,
    },
    date: {
        type: Date,
        require: true,
    }
  
}); 

const Vocabulary = mongoose.model("vocabulary", vocabularySchema);
module.exports = Vocabulary;