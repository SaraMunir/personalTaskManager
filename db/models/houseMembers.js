const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let houseMembers = new Schema (
    {   
        adminId: { 
            type: String,
        },
        name : { 
            type: String,
        },
        timeTrack:{
            type: Boolean,
            default: false
        },
        timeLogIns:[
            {   
                present:{ type: Boolean, default: false },
                loggedOut:{ type: Boolean, default: false },
                date: String,
                logInDay: { type: Date, default: Date.now },
                logInTime: { type: Date, default: Date.now },
                logOutTime: { type: Date },
            }
        ],
        profileImg: {
            type: String,
            default: 'https://getdrawings.com/free-icon-bw/anonymous-avatar-icon-19.png'  
        },
        profileImgClass: {
            type: String
        },
        membRole: {type: String},
        membSex: {type: String},
        membPersonalTasks: [
            {
                Task: {type: String},
                taskDone: {
                    type: Boolean, 
                    default: false}
            }
        ],
    },
    {
        timestamps: true
    }
    );

module.exports = mongoose.model('houseMembers', houseMembers);
