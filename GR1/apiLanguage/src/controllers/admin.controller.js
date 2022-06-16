const User = require('../models/user.model');

const addAdmin = async(req, res) => {
    const {id} = req.body;
    const user = await User.findOne({_id: id});
    if(user) {
        user.role =1;
        await user.save();
        return res.json({mess: 'save success'});
    }
}

const addSupManager = async(req, res) => {
    const {id} = req.body;
    const user = await User.findOne({_id: id});
    if(user) {
        user.role =2;
        await user.save();
        return res.json({mess: 'save success'});
    }
}

const deleteSupManager = async(req, res) => {
    const {id} = req.body;
    const user = await User.findOne({_id: id});
    if(user) {
        user.role = 0;
        await user.save();
        return res.json({mess: 'save success'});
    }
}
const deleteAdmin = async(req, res) => {
    const {id} = req.body;
    const user = await User.findOne({_id: id});
    if(user) {
        user.role = 0;
        await user.save();
        return res.json({mess: 'save success'});
    }
}

const deleteUser = async(req, res) => {
    const {id} = req.body;
    User.findOneAndRemove({_id: id}, function(err) {
        if(err) {
            console.log(err);
            return res.json({ message: 'remove err' });
        }
        else {
            return res.json({mess: 'save success'});
        }
    })
}

module.exports = {
    addAdmin,
    addSupManager,
    deleteAdmin, 
    deleteSupManager,
    deleteUser
}