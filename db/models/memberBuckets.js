const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let memberBuckets = new Schema (
    {
        bucketName : { 
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
