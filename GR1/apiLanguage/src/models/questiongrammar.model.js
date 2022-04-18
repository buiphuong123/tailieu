const mongoose = require('mongoose');

const questiongrammarSchema = mongoose.Schema({
    grammar_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    question: {
        type: String,
        require: true,
    },
    ansA: {
        type: String,
        require: false,
    },
    ansB: {
        type: String,
        require: false,
    },
    ansC: {
        type: String,
        require: false,
    },
    answer: {
        type: String,
        require: true,
    },
    explain: {
        type: String,
        require: false,
    },

}); 

const QuestionGrammar = mongoose.model("questiongrammar", questiongrammarSchema);
module.exports = QuestionGrammar;