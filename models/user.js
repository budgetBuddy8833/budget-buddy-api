const mongoose = require("mongoose");

const BudgetSchema  = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        require:true
    }
},{timestamps : true});

module.exports= mongoose.model("user", BudgetSchema);