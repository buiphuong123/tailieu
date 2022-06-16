const QuestionGrammar = require('../models/questiongrammar.model.js');
const ResultGrammar = require('../models/resultgrammar.model');
const Question = require('../models/question.model');

const createQuestion = async (req, res) => {
    const {  question, listAns, answer, explain, level, lession } = req.body;
    const newquestion = new QuestionGrammar({question, listAns, answer, explain, level, lession });
    await newquestion.save(function (error, newquestion) {
        if (error) {
            return res.json({ code: 0, err: error });
        }
        else {
            return res.json({ code: 1, question: newquestion });
        }

    })
}

const getQuestion = async (req, res) => {
    const { grammar_id } = req.body;
    const question = await QuestionGrammar.find({ grammar_id });
    return res.json({ code: 1, question: question });
}

const createResult = async (req, res) => {
    const { grammar_id, user_id, question_id, isTrue, chooseAns } = req.body;
    const result = await ResultGrammar.findOne({ user_id, grammar_id, question_id });
    if (result) {
        result.isTrue = isTrue;
        result.chooseAns = chooseAns;
        await result.save(function (err) {
            if (err) {
                return res.json({ code: 1, error: err });
            }
            else {
                return res.json({ code: 1, mess: 'success' });
            }
        });
    }
    else {
        const newResult = new ResultGrammar({ grammar_id, user_id, question_id, isTrue, chooseAns });
        await newResult.save(function (error, newResult) {
            if (error) {
                return res.json({ code: 0, err: error });
            }
            else {
                return res.json({ code: 1, result: newResult });
            }

        })
    }
}

const getResult = async (req, res) => {
    const { user_id, grammar_id } = req.body;
    ResultGrammar.aggregate([
    {
        $lookup: {
            from : "questiongrammars",
            localField : "question_id",
            foreignField: "_id",
            as: "questiongrammars"
        },
        
    },
    { $match : {$and: [{ user_id : user_id }, { grammar_id: grammar_id }]} } 
], function(err, result) {
        if(err) {
            return res.json({ code: 0, err: 'not find' });
        }
        return res.json({ code: 1, result: result });
    })
}

const image = async(req, res) => {
    const T = require("tesseract.js");
    T.recognize('https://res.cloudinary.com/languageword/image/upload/v1643357552/bdwytt1bbbml6midgfrt.png', 'jpn', { logger: e => console.log(e) })
        .then(({ data: { text } }) => {
            const c = text.split(' ').join('');
            const ss = c.split(/c|b/);
            const kaka = ss[0].split('\n');
            const question = kaka[0];
            const ansA = kaka[1].slice(1);
            const ansB = ss[1];
            const ansC = ss[2];
            // const result = kaka[1].split(' ').join('');
            // const resultC = result.split('c');
            // const ansC = resultC[1];
            // const resultB = resultC[0].split('b');
            // const ansB = resultB[1];
            // const resultA = resultB[0].split('a');
            // const ansA = resultA[1];
           return res.json({question, ansA, ansB, ansC});
        });
}

const readImage = async (req, res) => {
    const { grammar_id, urlImage, explain, answer } = req.body;
    const T = require("tesseract.js");
    T.recognize(urlImage, 'jpn', { logger: e => console.log(e) })
        .then(({ data: { text } }) => {
            const c = text.split(' ').join('');
            const ss = c.split(/c|b/);
            const kaka = ss[0].split('\n');
            const question = kaka[0];
            const ansA = kaka[1].slice(1);
            const ansB = ss[1];
            const ansC = ss[2];
            const newquestion = new QuestionGrammar({ grammar_id, question, ansA, ansB, ansC, answer, explain });
             newquestion.save(function (error, newquestion) {
                if (error) {
                    return res.json({ code: 0, err: error });
                }
                else {
                    return res.json({ code: 1, question: newquestion });
                }

            })
        });

}

const readImage1 = async (req, res) => {
    const {  urlImage, explain, answer, level, lession, data } = req.body;
    console.log(urlImage, explain, answer, level, lession, data);
    const T = require("tesseract.js");
    T.recognize(urlImage, 'jpn', { logger: e => console.log(e) })
        .then(async({ data: { text } }) => {
            const c = text.split("\n");
            const question = c[0];
            c.splice(0,1);
            // return res.json({question: question, answer: c});
            const newquestion = new QuestionGrammar({ question: question, listAns: c, answer: answer, explain, level, lession, data });
           await newquestion.save();
           console.log(newquestion);
           return res.json(newquestion);
        });

}
const getQuestionLevellession = async(req, res) => {
    const question = await QuestionGrammar.find({level: 5, lession: 1});
    return res.json(question);
}

const changeType = async(req, res) => {
    const question = await Question.find();
    // for (var i=0;i<question.length; i++) {
    //     const kaka = question[i].data._id;
    //     question[i].data = kaka;
    //     // question[i].data = kaka;
    //     // await question[i].save();
    //     // console.log('save success');
    // }
    // console.log(question);
    const kaka = await QuestionGrammar.insertMany(question);
    // await ka.save();
    console.log(kaka);
}

const getAllQuestionGrammar = async(req, res) => {
    const question = await QuestionGrammar.find().populate("data");
   return res.json({question: question});
}

module.exports = {
    getAllQuestionGrammar,
    createQuestion,
    getQuestion,
    createResult,
    getResult,
    readImage,
    image, 
    readImage1,
    getQuestionLevellession,
    changeType
};