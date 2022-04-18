const Word = require('../models/word/word.model');
const WordMem = require('../models/word/wordmem.model');
const WordLike = require('../models/word/wordlike.model');
const WordComment = require('../models/word/wordcomment.model');
const WordDislike = require('../models/word/worddislike.model');
const WordExample = require('../models/word/wordexample.model');
const User = require('../models/user.model');
const Kuroshiro = require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');
const axios = require('axios');

const getWord = async (req, res) => {
    var { id } = req.body;
    Word.aggregate([
        {
            $lookup: {
                from: "wordexamples",
                localField: "_id",
                foreignField: "word_id",
                as: "wordexample"
            }
        },
        {
            $lookup: {
                from: "wordlikes",
                let: { user: "$userId", idd: "$_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        { $eq: ["$userId", id] },
                                        { $eq: ["$$idd", "$wordId"] }
                                    ]
                            }
                        }
                    },
                    { $project: { isLike: 1, _id: 0 } }
                ],
                as: "likes"
            }

        },
        {
            $lookup: {
                from: "wordmems",
                let: { user: "$userId", idd: "$_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr:
                            {
                                $and:
                                    [
                                        { $eq: ["$userId", id] },
                                        { $eq: ["$$idd", "$wordId"] }
                                    ]
                            }
                        }
                    },
                    { $project: { isMemerize: 1, _id: 0 } }
                ],
                as: "memerizes"
            }
        },
    ], function (err, data) {
        if (err) {
            res.json({ code: 0, errMsg: err });
        } else {
            res.json({ code: 1, wordData: data });
        }
    })

}

const createMemWord = async (req, res) => {
    const { userId, wordId } = req.body;
    const word = await WordMem.findOne({ userId, wordId });
    if (word) {
        WordMem.findOneAndRemove({ userId, wordId }, function (err) {
            if (err) {
                console.log(err);
                res.json({ message: 'error' });
            }
            else {
                console.log('remove success');
                res.json({ message: 'remove success' });
            }
        })
    }
    else {
        const newMem = new WordMem({ userId, wordId });
        await newMem.save(function (error, newMem) {
            if (error) {
                return res.json({ code: 0, error: error });
            }
            else {
                console.log('memerize success');
                return res.json({ code: 1, success: 'memerize success', nemWord: newMem });

            }
        })
    }

}

const createLikeWord = async (req, res) => {
    const { userId, wordId } = req.body;
    const word = await WordLike.findOne({ userId, wordId });
    if (word) {
        WordLike.findOneAndRemove({ userId, wordId }, function (err) {
            if (err) {
                console.log(err);
                res.json({ message: 'error' });
            }
            else {
                console.log('remove success');
                res.json({ message: 'remove success' });
            }
        })
    }
    else {
        const newLike = new WordLike({ userId, wordId });
        await newLike.save(function (error, newLike) {
            if (error) {
                return res.json({ code: 0, error: error });
            }
            else {
                console.log('like success');
                return res.json({ code: 1, success: 'like success', likeWord: newLike });

            }
        })
    }

}

const createWordComment = async (req, res) => {
    const { word_id, user_id, content } = req.body;
    var today = new Date();
    const user = await User.findOne({ _id: user_id });
    // var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const newComment = new WordComment({ word_id, user_id: user, content, time: today, review: "not approved" });
    // socket.socket.emit("SEVER-SEND-NEW-WORDCOMMENT", {
    //     comment: newComment,
    //     username: user.username
    // });
    await newComment.save(function (error, newComment) {
        if (error) {
            return res.json({ code: 0, error: error });
        }
        else {
            return res.json({ code: 1, success: "Comment của bạn đợi quản trị viên xét duyệt ", comment: newComment });
        }
    })
}

const createLikeWordComment = async (req, res) => {
    const { comment_id, user_id_like, checkStatus } = req.body;
    const check = await ActionLike.findOne({ comment_id, user_id_like });
    WordDislike.findOneAndRemove({ comment_id, user_id_dislike: user_id_like }, function (err) {
        if (err) {
            console.log(err);
            return res.json({ message: 'remove err' });
        }
        else {
            if (check) {
                WordLike.findOneAndRemove({ comment_id, user_id_like }, function (err) {
                    socket.socket.emit("SEVER-SEND-WORDLIKE", {
                        comment_id: comment_id,
                        islike: true,
                        isdislike: checkStatus,
                    });
                    return res.json('not like success');
                })
            }

            else {
                const newAction = new WordLike({ comment_id, user_id_like });
                newAction.save(function (error, newAction) {
                    if (error) {
                        return res.json({ code: 0, error: "network error" });
                    }
                    else {

                        socket.socket.emit("SEVER-SEND-WORDLIKE", {
                            comment_id: comment_id,
                            islike: false,
                            isdislike: checkStatus,
                        });
                        return res.json({ code: 1, success: "action success", action: newAction });

                    }
                })
            }

        }

    });
}

const countWordLike = async (req, res) => {
    const { comment_id } = req.body;
    const account = await WordLike.find({ comment_id });
    return res.json(account.length);
}

const countwordDisLike = async (req, res) => {
    const { comment_id } = req.body;
    const account = await WordDislike.find({ comment_id });
    return res.json(account.length);
}

const createDisLikeWordComment = async (req, res) => {
    const { comment_id, user_id_dislike, checkStatus } = req.body;
    const check = await WordDislike.findOne({ comment_id, user_id_dislike });
    WordLike.findOneAndRemove({ comment_id, user_id_like: user_id_dislike }, function (err) {
        if (err) {
            console.log(err);
            return res.json({ message: 'remove err' });
        }
        else {
            if (check) {
                ActionDisLike.findOneAndRemove({ comment_id, user_id_dislike }, function (err) {
                    socket.socket.emit("SEVER-SEND-WORDDISLIKE", {
                        comment_id: comment_id,
                        isdislike: true,
                        islike: checkStatus,
                    });
                    return res.json('not dislike success');
                })
            }

            else {
                const newAction = new WordDislike({ comment_id, user_id_dislike });
                newAction.save(function (error, newAction) {
                    if (error) {
                        return res.json({ code: 0, error: "loix xay ra, vui long th lai" });
                    }
                    else {
                        socket.socket.emit("SEVER-SEND-WORDDISLIKE", {
                            comment_id: comment_id,
                            isdislike: false,
                            islike: checkStatus
                        });
                        return res.json({ code: 1, success: "action success", action: newAction });


                    }
                })
            }
        }

    });
}

const createWord = async (req, res) => {
    const { hira, kanji, vn, amhan, kata, level, type, typeWord, verbGround, typeVerb, typeAdj, exampleWord } = req.body;
    console.log('list example la ', exampleWord);
    console.log('gia tri cua kata la', kata);
    console.log(hira, kanji, vn, amhan);
    let newWord;
    let newExample;
    var j;
    if (kata !== '') {
        console.log('gia tri cuar kata day ne ', kata);
        console.log('vao kata khac rong');
        const wordkata = await Word.findOne({ kata });
        if (wordkata) {
            return res.json({ message: 'word da ton tai ben kata' });
        }
        else {
            newWord = new Word({ hira, kanji, vn, amhan, kata, level, type, typeWord, verbGround, typeVerb, typeAdj });
            await newWord.save();
            if (exampleWord.length !== 0) {
                for (j = 0; j < exampleWord.length; j++) {
                    const word_id = newWord._id;
                    const jp = exampleWord[j].jp;
                    const vn = exampleWord[j].vn;
                    const kuroshiro = new Kuroshiro();
                    kuroshiro.init(new KuromojiAnalyzer())
                        .then(function () {
                            return kuroshiro.convert(jp, { mode: "furigana", to: "hiragana" });
                        })
                        .then(function (result) {
                            // "<ruby>感<rp>(</rp><rt>かん</rt><rp>)</rp></ruby>じ<ruby>取<rp>(</rp><rt>と</rt><rp>)</rp></ruby>れたら<ruby>手<rp>(</rp><rt>て</rt><rp>)</rp></ruby>を<ruby>繋<rp>(</rp><rt>つな</rt><rp>)</rp></ruby>ごう"
                            var str1 = result.replaceAll("<ruby>", "a");
                            var str2 = str1.replaceAll("</rt><rp>)</rp>", "b");
                            var str3 = str2.replaceAll("<rp>(</rp><rt>", "c");
                            var str4 = str3.replaceAll("</ruby>", "m");
                            var str5 = str4.split(/a|m/);
                            var i;
                            const strResult = [];
                            for (i = 0; i < str5.length; i++) {
                                if (Kuroshiro.Util.isHiragana(str5[i]) || Kuroshiro.Util.isKatakana(str5[i])) {
                                    strResult.push({ value: str5[i], furi: "" });
                                }
                                else {
                                    if (i == 0) {

                                    }
                                    else {
                                        var ss = str5[i].split(/c|b/);
                                        strResult.push({ value: ss[0], furi: ss[1] });
                                    }
                                }
                            }
                            newExample = new WordExample({ word_id, jp: strResult, vn });
                            newExample.save();

                        })
                }

            }
            return res.json({ exampleWord: exampleWord, message: 'Tao word thanh cong' });
        }
    }
    else if (hira !== undefined && kanji !== undefined) {
        console.log('vao hira vowi kanji khac rong');
        const wordhirakanji = await Word.findOne({ hira, kanji });
        if (wordhirakanji) {
            return res.json({ message: 'word da ton tai ben hira va kanji' });
        }
        else {
            newWord = new Word({ hira, kanji, vn, amhan, kata, level, type, typeWord, verbGround, typeVerb, typeAdj });
            await newWord.save();
            if (exampleWord.length !== 0) {
                for (j = 0; j < exampleWord.length; j++) {
                    const word_id = newWord._id;
                    const jp = exampleWord[j].jp;
                    const vn = exampleWord[j].vn;
                    const kuroshiro = new Kuroshiro();
                    kuroshiro.init(new KuromojiAnalyzer())
                        .then(function () {
                            return kuroshiro.convert(jp, { mode: "furigana", to: "hiragana" });
                        })
                        .then(function (result) {
                            // "<ruby>感<rp>(</rp><rt>かん</rt><rp>)</rp></ruby>じ<ruby>取<rp>(</rp><rt>と</rt><rp>)</rp></ruby>れたら<ruby>手<rp>(</rp><rt>て</rt><rp>)</rp></ruby>を<ruby>繋<rp>(</rp><rt>つな</rt><rp>)</rp></ruby>ごう"
                            var str1 = result.replaceAll("<ruby>", "a");
                            var str2 = str1.replaceAll("</rt><rp>)</rp>", "b");
                            var str3 = str2.replaceAll("<rp>(</rp><rt>", "c");
                            var str4 = str3.replaceAll("</ruby>", "m");
                            var str5 = str4.split(/a|m/);
                            var i;
                            const strResult = [];
                            for (i = 0; i < str5.length; i++) {
                                if (Kuroshiro.Util.isHiragana(str5[i]) || Kuroshiro.Util.isKatakana(str5[i])) {
                                    strResult.push({ value: str5[i], furi: "" });
                                }
                                else {
                                    if (i == 0) {

                                    }
                                    else {
                                        var ss = str5[i].split(/c|b/);
                                        strResult.push({ value: ss[0], furi: ss[1] });
                                    }
                                }
                            }
                            newExample = new WordExample({ word_id, jp: strResult, vn });
                            console.log(newExample);
                            newExample.save();

                        })
                }

            }
            return res.json({ exampleWord: newExample, message: 'Tao word thanh cong' });
        }
    }
    else {
        return res.json({ message: 'word da ton tai' });
    }


}

const getAllWord = async (req, res) => {
    const word = await Word.find();
    return res.json({ word });
}

const testfind = async (req, res) => {
    const dataWordComment = [{ id: "kaka" }, { id: "mama" }];
    const idx = dataWordComment.map(object => object.id).indexOf("kakadaf");
    return res.json(idx);
}

const testData = async (req, res) => {
    axios.post('https://vi.mazii.net/api/search', {
        "dict": "javi",
        "query": "会う",
        "type": "word"

    }, {
        headers: {
            "Accept": "application/json",
                    "Content-Type": "application/json"
        }
    })
    .then((response) => {
        // return res.json({data: response.data.data[0].audio});

        return res.json({data: response.data});
    })
    .catch(function (error) {
        throw error;
    })

}

const wordQuestionTest = async(req, res) => {
    const isN5test = true;
    const isN4test = false;
    const isN3test = false;
    const isN2test = false;
    axios.post('http://192.168.1.72:3002/language/getWord', {
        "id" : "61590bbd7463724428b252d2"

    }, {
        headers: {
            "Accept": "application/json",
                    "Content-Type": "application/json"
        }
    })
    .then((response) => {
        return res.json(response.data.wordData);

    })
    .catch(function (error) {
        throw error;
    })
}

const dataWord = async(req, res) => {
    axios.get('https://vi.mazii.net/db/jlpt/vi-VN/word5.json', {
        headers: {
            "Accept": "application/json",
                    "Content-Type": "application/json"
        }
    })
    .then((response) => {
        return res.json(response.data.length);

    })
    .catch(function (error) {
        throw error;
    })
}

module.exports = {
    createWord,
    getWord,
    createMemWord,
    createLikeWord,
    createWordComment,
    createLikeWordComment,
    createDisLikeWordComment,
    countWordLike,
    countwordDisLike,
    getAllWord,
    testfind,
    testData,
    wordQuestionTest,
    dataWord
};