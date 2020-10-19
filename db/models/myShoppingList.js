const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let myShoppingList = new Schema (
    {   
        ownerId: String,
        ItemType: String,
        ItemName : String,
        ItemAmount : String,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('myShoppingList', myShoppingList);