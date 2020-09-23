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
                membName: {type: String},
                membDesc: {type: String},
                membRole: {type: String},
                membSex: {type: String},
                membPic: {type: String},
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
                ]
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
        ],
        myBackLog: [
            { 
                taskName: {type: String},
                taskType: {type: String},
                taskOwner:{type: String},
                taskOwnerPic:{type: String},
                taskOwnerId:{type: String},
                complete : {
                    type: Boolean, 
                    default: false
                }
            }
        ],
        myBucket: [
            {
                bucketName: {type: String},
                bucketOwner: {type: String},
                bucketOwnerId: {type: String},
                bucketTasks: [
                    {
                        taskName:{type: String},
                        taskOwner:{type: String},
                        taskOwnerId:{type: String},
                        complete : {
                            type: Boolean, 
                            default: false
                        }
                    }
                ],
                active: {
                    type: Boolean, 
                    default: false
                }
            }
        ]
    },
    {
        timestamps: true
    }
    );

module.exports = mongoose.model('users', users);
