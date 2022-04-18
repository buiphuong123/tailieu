const Notification = require('../models/notification.model.js');
const axios = require('axios');
const User = require('../models/user.model');
const Comment = require('../models/comment.model.js');
const Grammar = require('../models/grammar.model');

const createNotifi = async (req, res) => {
    const { username, content, time, action } = req.body;
    console.log(username, content, time, action);
    const newNotifi = new Notification({ username, content, time, action });
    await newNotifi.save(function (err) {
        if (err) {
            return res.json({ code: 0, error: err });
        }
        else {
            return res.json({ code: 1, newNotifi: newNotifi });
        }
    })
}

const test1 = async (req, res) => {
    const { titlebody } = req.body;
    console.log('TEST API NE ', titlebody);
    return res.json({ titlebody });
}

const getNotifi = async (req, res) => {
    const {username} = req.body;
    const listNoti = await Notification.find({username});
    return res.json({code: 1, listNoti: listNoti});
}

const sendNotiToDevice = async (req, res) => {
    const { username, username_friends, action, comment_id, word } = req.body;
    console.log(username, username_friends, action, comment_id, word);
    const userfriends = await User.findOne({ username: username_friends });
    console.log('userfriends LA ', userfriends); //cjppx m
    // console.log(userfriends);
    const comment = await Comment.findOne({_id: comment_id}); // nó k tìm ddc cái này nè
    // if (userfriends.token === null ) {}
    
    const content = `${username} ${action} your comment ${comment.content}`;
    var time = new Date();
    const newNotifi = new Notification({ username: username_friends, content, time, action, comment_id, data: word });
    await newNotifi.save(function (err) {
        if (err) {
            return res.json({ code: 0, error: err });
        }
        else {
            axios.post('https://fcm.googleapis.com/fcm/send', {
                // "to": 'cVVGGz4rRCC7_hdLwmHh9K:APA91bG7ceBsLeF7rcziCVbQ0wyGQ0YHXrpVN6VxQVCrQTcxOANdHXsRe-vGguZcrD1c7ubM9wJsX93UhNgKMl5i7lWdVIT8kqcLeA7n28QTQjy2SIqhGdZwzQ4NZn9kKk5pzkNEhhnQ',
                "to": userfriends.notifiToken,
                "notification": {
                    "body": `${username} ${action} your comment ${comment.content}`,
                    "title": "language"
                },
                "data": {
                    "action": action,
                    "routedata": word,
                    "notification_id": newNotifi._id,
                },
            }, {
                headers: {
                    "Authorization": 'key=' + 'AAAAOQ8h2Bo:APA91bE7He0ohIpCkbStbkMl5n-5l6SqSl8cvTO47KcPARZINNozxiRuyD8cSZl8LR7damVxiqjQ90vet9OL-NjflUdEX4dTDFyT00MHxNH1VMKMQ6J64flpb8JkKdYubOSx1vhPqizf',
                    "Content-Type": "application/json"
                }
            })
                .then(() => {
                    res.status(200).send('Notification send successfully');
                }).catch((err) => {
                    res.status(400).send('somethinh went wrongy');
                    console.log(err);
                })
        }
    })


}

const editReadNotifi = async(req, res) => {
    const { notification_id } = req.body;
    const notifi = await Notification.findOne({ _id: notification_id });
    if(notifi) {
        // if(notifi.isRead === false ) {
        //     return res.json({mess: 'da doc r'});
        // }
        notifi.isRead = true;
        notifi.save(function (err) {
            return res.json({code: 1, err})
        })
    }
}

const takeData = async(req, res) => {
    const { grammar_id } = req.body;
    const word = await Grammar.findOne({_id: grammar_id});
    if(word) {
        console.log('Data truyen vaof ExplainScreen', word);
    }
    else {
        console.log('khong co data');
    }
    
}

module.exports = {
    sendNotiToDevice,
    createNotifi,
    getNotifi,
    test1,
    takeData,
    editReadNotifi
};