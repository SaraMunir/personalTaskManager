const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let houseMembers = new Schema (
    {
        name : { 
            type: String,
            trim: true,
            required: true
        },
        email : { 
            type: String, 
            required: true, 
            trim: true, 
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address'] 
        },
        password :  { 
            type: String, 
            required: true, 
            trim: true
        },
        profileImg: {
            type: String,
            default: 'https://getdrawings.com/free-icon-bw/anonymous-avatar-icon-19.png'  
        },
        membDesc: {type: String},
        membRole: {type: String},
        membSex: {type: String},
        membPersonalTasks: [
            {
                membTaskId: {type: String},
                membTask: {type: String},
                membTaskType: {type: String},
            }
        ],
        membBuckets: [
            {
                membBucketName: {type: String},
                membTask: {type: String},
                membTaskType: {type: String},
            }
        ],
    },
    {
        timestamps: true
    }
    );

module.exports = mongoose.model('houseMembers', houseMembers);
