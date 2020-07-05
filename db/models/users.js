const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let users = new Schema (
    {
    firstName : { 
        type: String,
        trim: true,
        required: true
    },
    lastName : { 
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
    groceryList: [
        {
            itemId: {type: String},
            itemType: {type: String},
            itemName: {type: String},
            itemQty: {type: Number}
        }
    ],
    tasks: [
        {
            task: {type: String},
            completionDate: {type: Date},
            taskDo: {
                type: Boolean, 
                default: true},
            taskDoing: {
                type: Boolean, 
                default: false
            },
            taskDone: {
                type: Boolean, 
                default: false}
        }
    ],
    myHouseMembers: [
        { 
            memberId: {type: String},
            memberName: {type: String},
        }
    ],
    myEmployee: [
        { 
            employeeId: {type: String},
            employeeName: {type: String},
            employeeRole: {type: String},
            employeeLogIns: [
                {
                    loginDate: {type: String},
                    loginTime: {type: String},
                    logoutTime: {type: String}
                }
            ], 
            employeeTasks: [
                {
                    empTaskId: {type: String},
                    empTask: {type: String},
                }
            ]
        }
    ]},
    {
        timestamps: true
    }
    );

module.exports = mongoose.model('users', users);
