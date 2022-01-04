const mongoose = require('mongoose');

const grammarSchema = mongoose.Schema({
    level: {
        type: Number,
        require: true,
    },
    lession: {
        type: Number,
        require: true,
    },
    grammar: {
        type: String,
        require: true,
    },
    translation: {
        type: String,
        require: true,
    },
    structure: { 
        type: Array, 
        require: true 
    },
    mean: {
        type: Array, 
        require: true,
    },
    indication: {
        type: Array,
        require: false,
    },
    example: {
        type: Array,
        ref: "example"
    }
}); 

const Grammar = mongoose.model("grammar", grammarSchema);
module.exports = Grammar;