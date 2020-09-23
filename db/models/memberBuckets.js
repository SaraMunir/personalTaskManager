const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let memberBuckets = new Schema (
    {
        userId : { 
            type: String,
            trim: true,
            required: true
        },
        bucketName : { 
            type: String,
            trim: true,
            required: true
        },
        bucketOwner : { 
            type: String,
            trim: true,
            required: true
        },
        bucketOwnerId : { 
            type: String,
            trim: true,
            required: true
        },
        bucketTasks: [
            {
                taskName:{type: String},
                complete : {
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

module.exports = mongoose.model('memberBuckets', memberBuckets);
