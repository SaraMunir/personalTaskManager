const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let myGroceryItems = new Schema (
    {   
        ownerId: String,
        ItemType: String,
        ItemName : String,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('myGroceryItems', myGroceryItems);