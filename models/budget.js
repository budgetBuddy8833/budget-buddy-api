const mongoose = require("mongoose");

const BudgetSchema  = mongoose.Schema({
    image:{
        type:Number,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    limit:{
        type:Number,
        require:true
    },
    spent:{
        type:Number,
        require:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required :  true
    }
},{timestamps : true});

module.exports= mongoose.model("Budget", BudgetSchema);