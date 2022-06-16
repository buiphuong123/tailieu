const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    nameSchedule: {
        type: String,
        require: true,
    },
    note: {
        type: String,
        require: false
    },
    // datestart: {
    //     type: Date,
    //     require: true,
    // },
    // dateend: {
    //     type: Date,
    //     require: true
    // },
    date: {
        type: String,
        require: true
    },
    time: {
        type: String,
        require: true
    },
    timenoti: {
        type: String,
        require: true,
    },
    method: {
        type: Number,
        require: true
    },
    typetime: {
        type: Number,
        require: false,
    }
}); 

const Schedule = mongoose.model("schedule", scheduleSchema);
module.exports = Schedule;