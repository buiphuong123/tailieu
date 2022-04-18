const express = require('express');
const User = require('../models/user.model.js');
const nodemailer = require("nodemailer");
var cron = require('node-cron');

const remind = async (req, res) => {
    const { date, user } = req.body;
    console.log(date);
    console.log(user);
    // 30 17 * * daily every at 17h30
    // 30 17 * * every week in Tusday in 17h30
    cron.schedule('30 17 * * Tue', () => {
    console.log('running every minute 1, 2, 4 and 5');
    });
}

module.exports = {
    remind,
};