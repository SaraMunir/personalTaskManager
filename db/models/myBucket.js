const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let myBucket = new Schema (
    {
        adminId: {type: String},
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
            default: true
        }
    },
    {
        timestamps: true
    }
    );

module.exports = mongoose.model('myBucket', myBucket);
