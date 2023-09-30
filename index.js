const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

const cors = require("cors");

app.get("/",(req,res)=>{
    res.send("Budget buddy API by Maverick Bits")
});


app.use((req,res,next)=>{
console.log("HTTP Method - " +req.method +", URL - "+req.url );
next();
});

app.use(cors());
const budgetRoute = require("./routes/budgetroute");
const mongoose  = require("mongoose");

app.use("/budget",budgetRoute); 
const PORT = process.env.PORT || 5001;


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server started at port no 5000");
    });
}).catch((error)=>{
  console.log(error);
});

