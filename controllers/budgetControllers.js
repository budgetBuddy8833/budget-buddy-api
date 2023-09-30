const budgetModel = require("../models/budget");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;


//get budget function
const getbudget  = async(req,res)=>{
    
    try{
        const budget = await budgetModel.find({
            userId : req.userId
        });
        console.log(budget.userId);
        res.status(200).json(budget);
    }catch(e){
        console.log(e)
        return res.status(500).json({message:"something went wrong"});
    }
       
    
}


//update budget functoin
const updatebudget =async(req,res)=>{

    try{
        const budget = await budgetModel.findByIdAndUpdate(req.params.id, req.body,{ new: true});
        res.status(200).json(budget);
    }catch(e){
       console.log(e)
       return res.status(500).json({message:"something went wrong"});
    }
   
}


//delete budget function
const deletebudget = async(req,res)=>{

    try{
        await budgetModel.findByIdAndDelete(req.params.id);
     
        res.status(200).json({
            idRemoved: req.params.id
        });
    }catch(e){
        console.log(e)
        return res.status(500).json({message:"something went wrong"});
    }
    
}



//create budget function
const createbudget = async(req,res)=>{
    const {image,category,limit,spent} = req.body;
    console.log(req.userId);
    const newBudget = new budgetModel({
        image:image,
        category:category,
        limit:limit,
        spent:spent,
        userId : req.userId
       
    });
   

    try{
        await newBudget.save();
        res.status(201).json(newBudget);
    }catch(error){
        console.log(error);
       res.status(500).json({message: "Something went wrong!!"});
       }
}


//signup function
const signup =async(req,res)=>{

const {username, email, password} = req.body;

try{
const existingUser = await userModel.findOne({email:email})
if(existingUser){
    return res.status(400).json({message:"User already exists"});
}
const hashedPass = await bcrypt.hash(password,10);
const result = await userModel.create({
    username:username,
    email:email,
    password:hashedPass
});

const token = jwt.sign({email: result.email, id:result._id}, SECRET_KEY);

res.status(201).json({user:result, token:token});

}catch(error){
console.log(error);
res.status(500).json({message:"Something went wrong!!"});
}

}


//signin function
const signin = async(req,res)=>{
const {email, password} = req.body;

try{
const existingUser = await userModel.findOne({email:email});
if(!existingUser){
    return res.status(404).json({message : "User not found!"});
}

const matchPassword = await bcrypt.compare(password, existingUser.password);
if(!matchPassword){
    return res.status(400).json({
        message:"Invalid Credentials"
    });
}
const token = jwt.sign({email: existingUser.email, id : existingUser._id}, SECRET_KEY);
res.status(200).json({user:existingUser, token:token});

}catch(error){
    console.log(e);
    res.status(500).json({message:"Something went wrong!!"});
}

}
module.exports = {createbudget,getbudget,updatebudget, deletebudget,signin,signup};