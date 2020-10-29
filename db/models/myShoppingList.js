const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let myShoppingList = new Schema (
    {   
        tittle: {type: String, default: 'Untitled'},
        ownerId: String,
        status: {
            type: Boolean, 
            default: false
        },
        completed: {
            type: Boolean, 
            default: false
        },
        list:[
            {
                ItemType: String,
                ItemName : String,
                ItemAmount : String,
                done :  {
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

module.exports = mongoose.model('myShoppingList', myShoppingList);