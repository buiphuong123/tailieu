const Word = require('../models/word/word.model');
const WordMem = require('../models/word/wordmem.model');
const WordLike = require('../models/word/wordlike.model');

const getWord = async (req, res) => {
    var { id } = req.body;
Word.aggregate([
    {
        $lookup: {
            from: "wordlikes",
            let: {user: "$userId", idd: "$_id"},
            pipeline: [
                {
                    $match: 
                    {
                        $expr: 
                        {
                            $and:
                            [
                                {$eq: ["$userId", id]},
                                {$eq: ["$$idd", "$wordId"]}
                            ]
                        }
                    }
                },
                { $project: { isLike: 1, _id: 0 } }
            ],
            as: "likes"
        }
        
    },
    {$lookup: {
        from: "wordmems",
        let: {user: "$userId", idd: "$_id"},
        pipeline: [
            {
                $match: 
                {
                    $expr: 
                    {
                        $and:
                        [
                            {$eq: ["$userId", id]},
                            {$eq: ["$$idd", "$wordId"]}
                        ]
                    }
                }
            },
            { $project: { isMemerize: 1, _id: 0 } }
        ],
        as: "memerizes"
    }},
], function(err, data) {
    if(err) {
        res.json({code: 0, errMsg: err});
    }else {
        res.json({code: 1, wordData: data});
    }
})

}

const createMemWord = async (req, res) => {
    const {userId, wordId} = req.body;
    const word = await WordMem.findOne({userId, wordId});
    if(word) {
        WordMem.findOneAndRemove({userId, wordId}, function(err) {
            if(err) {
                console.log(err);
                res.json({message: 'error'});
            }
            else {
                console.log('remove success');
                res.json({message: 'remove success'});
            }
        })
    }
    else {
        const newMem = new WordMem({ userId, wordId });
        await newMem.save(function (error, newMem ) {
            if(error) {
                return res.json({ code: 0, error: error});
            }
            else {
                console.log('memerize success');
                return res.json({ code: 1, success: 'memerize success', nemWord: newMem});
                
            }
        })
    }
    
}

const createLikeWord = async (req, res) => {
    const {userId, wordId} = req.body;
    const word = await WordLike.findOne({userId, wordId});
    if(word) {
        WordLike.findOneAndRemove({userId, wordId}, function(err) {
            if(err) {
                console.log(err);
                res.json({message: 'error'});
            }
            else {
                console.log('remove success');
                res.json({message: 'remove success'});
            }
        })
    }
    else {
        const newLike = new WordLike({ userId, wordId });
        await newLike.save(function (error, newLike ) {
            if(error) {
                return res.json({ code: 0, error: error});
            }
            else {
                console.log('like success');
                return res.json({ code: 1, success: 'like success', likeWord: newLike});
                
            }
        })
    }
    
}


module.exports = {
    getWord,
    createMemWord,
    createLikeWord
};