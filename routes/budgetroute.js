const express = require("express");
const { getbudget, createbudget,updatebudget,deletebudget,signin,signup } = require("../controllers/budgetControllers");
const budgetRouter = express();
const auth =  require("../middleware/auth");

budgetRouter.get("/", auth,getbudget);

budgetRouter.post("/", auth,createbudget);
budgetRouter.put("/:id",auth, updatebudget);
budgetRouter.delete("/:id",auth, deletebudget);
budgetRouter.post("/signin", signin);
budgetRouter.post("/signup", signup); 



module.exports = budgetRouter;