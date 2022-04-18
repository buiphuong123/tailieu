const QuestionGrammar = require('../models/questiongrammar.model.js');
const ResultGrammar = require('../models/resultgrammar.model');

const createQuestion = async (req, res) => {
    const { grammar_id, question, ansA, ansB, ansC, answer, explain } = req.body;
    const newquestion = new QuestionGrammar({ grammar_id, question, ansA, ansB, ansC, answer, explain });
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
            // const kaka = text.split('\n');
            // const question = kaka[0].split(' ').join('');
            // const result = kaka[1].split(' ').join('');
            // const resultC = result.split('c');
            // const ansC = resultC[1];
            // const resultB = resultC[0].split('b');
            // const ansB = resultB[1];
            // const resultA = resultB[0].split('a');
            // const ansA = resultA[1];
            // console.log('result A la ', resultA[0], resultA[1]);
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

module.exports = {
    createQuestion,
    getQuestion,
    createResult,
    getResult,
    readImage,
    image
};