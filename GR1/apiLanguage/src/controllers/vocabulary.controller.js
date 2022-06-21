const { not } = require('cheerio/lib/api/traversing');
const Vocabulary = require('../models/vocabulary/vocabulary.model');
const nodemailer = require("nodemailer");
const User = require('../models/user.model');

const getVocabulary = async (req, res) => {
    const { user_id } = req.body;
    const vocabulary = await Vocabulary.find({ user_id: user_id });
    return res.json({ vocabulary: vocabulary, code: 1 });
}

const getVocabularyShare = async (req, res) => {
    const { user_id } = req.body;
    var vocabulary = await Vocabulary.find({'user_id': {$nin: user_id},typeShare: 1}).populate("user_id");
    const alldata = await Vocabulary.find({'user_id': {$nin: user_id},typeShare: 2}).populate("user_id");
    // const allData = await Vocabulary.find();
    console.log(alldata);
    console.log(user_id);
    alldata.map((e) => {
        if(e.share.findIndex(x => x._id === user_id) !== -1) {
            vocabulary=vocabulary.concat(e);
        }
    })

    return res.json({ vocabulary: vocabulary, code: 1 });
}


const createVocabulary = async (req, res) => {
    const { user_id, name, dataElement, date } = req.body;
    // const data
    const vocabulary = new Vocabulary({ name, user_id, date, data: dataElement, date, typeShare: 0 });
    await vocabulary.save();
    return res.json({ mess: 'save success', vocabulary: vocabulary });
}
const editVocabulary = async (req, res) => {
    const { id, name, date } = req.body;
    const vocabulary = await Vocabulary.findOne({ _id: id });
    vocabulary.name = name;
    vocabulary.date = date;
    await vocabulary.save();
}

const deleteVocabulary = async (req, res) => {
    const { id } = req.body;
    Vocabulary.findOneAndRemove({ _id: id }, function (err) {
        if (err) {
            console.log('loi roi');
            return res.json({ message: 'remove err' });
        }
        else {
            return res.json({ message: 'remove success' });
        }
    })
}

// const deleteVocabularyShare = async (req, res) => {
//     const { id } = req.body;
    
// }

const createWordInVoca = async (req, res) => {
    const { id, word, translate, vn, type, note, date, explain } = req.body;
    console.log('DATA DAU VAO DE ADD DAY NHE ', id, word, translate, vn, type, note, date, explain);
    const vocabulary = await Vocabulary.findOne({ _id: id });
    if (vocabulary) {
        const a = {};
        a.word = word;
        a.translate = translate;
        a.vn = vn;
        a.type = type;
        a.note = note;
        a.date = date;
        a.explain = explain;
        vocabulary.data.push(a);
        await vocabulary.save();
        return res.json('add success');
    }
    else {
        return res.json('add fail');
    }
}
const create = async (req, res) => {
    const { id, worddata } = req.body;
    const vocabulary = await Vocabulary.findOne({ _id: id });
    if (vocabulary) {
        vocabulary.data.push(worddata);
        await vocabulary.save();
        return res.json('add success');
    }
    else {
        return res.json('error');
    }
}
const editWordInVoca = async (req, res) => {
    const { id, name, newName } = req.body;
    const vocabulary = await Vocabulary.findOne({ _id: id });
    if (vocabulary) {
        const objIndex = vocabulary.data.findIndex(e => e.word === name);
        if (objIndex !== -1) {
            vocabulary.data[objIndex].vn = newName;
            await vocabulary.save(function (error, vocabulary) {
                if (error) {
                    return res.json({ code: 0, error: error });
                }
                else {
                    return res.json({ code: 1, success: 'edit success', vocabulary });
                }
            });
        }
    }
}
const deleteWordInVoca = async (req, res) => {
    const { id, word } = req.body;
    console.log('vao day nhe');
    console.log(id, word);
    const vocabulary = await Vocabulary.findOne({ _id: id });
    if (vocabulary) {
        const objIndex = vocabulary.data.findIndex(e => e.word === word);
        console.log(objIndex);
        if (objIndex !== -1) {
            vocabulary.data.splice(objIndex, 1);
            await vocabulary.save();
            return res.json('delete success');
        }
    }

}

const shareVocabulary = async (req, res) => {
    const date = new Date();
    const { id, listUserShare, remind, noti, userid, typeShare } = req.body;
    // console.log('noti la ', noti);
    // const usersss = await User.findOne({_id: userid});
    console.log('LIST USER SHARE LA ', listUserShare);
    const vocabulary = await Vocabulary.findOne({ _id: id });
    if (vocabulary) {
        vocabulary.share = listUserShare;
        vocabulary.remind = remind;
        vocabulary.typeShare = typeShare;
        await vocabulary.save();
        // if (noti === true) {
        //     //         console.log('vao noti = true');
        //     for (var i = 0; i < listUserShare.length; i++) {
        //         //             // const userss = await User.findOne({_id: listUserShare[i]._id});
        //         //             // const voc   abularyUser = await Vocabulary.find({user_id: listUserShare[i]._id});
        //         //             const vocu = new Vocabulary({name: vocabulary.name, user_id: listUserShare[i]._id, data: vocabulary.data, share: [], usershare: usersss._id, remind: vocabulary.remind, date: date});
        //         //             await vocu.save();
        //         var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env['MAIL_ADDRESS'], pass: process.env['MAIL_PASSWORD'] } });
        //         var mailOptions = { from: process.env['MAIL_ADDRESS'], to: listUserShare[i].email, subject: `Share vocabulary`, text: 'Hello ' + listUserShare[i].username + ` ${usersss.username} share vocabulary ${vocabulary.name} \n\n Now it\'s time to learn Japanese` + '\n\nThank You!\n' };
        //         transporter.sendMail(mailOptions, function (err) {
        //             if (err) {
        //                 console.log('SEND MAIL ERROR');
        //                 console.log(err);
        //                 return res.json({ err });
        //             }
        //             console.log('SEND MAIL SUCCESS');
        //         });
        //     }

        //     return res.json('share success');
        // }
    }
}
module.exports = {
    getVocabulary,
    createVocabulary,
    editVocabulary,
    deleteVocabulary,
    createWordInVoca,
    editWordInVoca,
    deleteWordInVoca,
    create,
    shareVocabulary,
    getVocabularyShare
}