const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { getExpenses ,getExpensesById ,addExpense,deleteExpense,loggerFunc,checkAdmin} = require('./controller/expense.js')
mongoose.connect('mongodb://localhost:27017/expenses-tracker',
{
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error: "));
db.once("open",function(){
  console.log("Connected successfully");
});


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// get,post,put,delete
app.get("/api/v1/health",(req,res)=>{
     res.status(200).json({
        message:"It worked",
        status:"sucess"
     })
})
// const expenses = [
//     {id: 1,name:"Movie",amount:300,desc:"Leo"},
//     {id:2,name:"Food",amount:2000,desc:"Restarunt"},
//     {id:3,name:"Rent",amount:5000,desc:"home rent"}
// ];
// const expenseDetails=[
//     {id:1,paymentmode:"UPI"},
//     {id:2,paymentmode:"cash"},
//     {id:3,paymentmode:"Netbanking"}
// ]
// app.get('/api/v1/expenses',(req,res)=>{
//     res.status(200).json(expenses);
// })
// app.get("/api/v1/expenses/:id",(req,res)=>{
//     let id = req.params.id;
//     for(i=0;i<expenses.length;i+=1){
//         if(expenses[i].id == id ){
//             let detailedExpense = {
//                 id : id,
//                 name : expenses[i].name,
//                 amount : expenses[i].amount,
//                 desc : expenses[i].desc,
//                 paymentMode : expenseDetails[i].paymentmode,
//             }
//             res.status(200).json(detailedExpense);
//         }
//     }
// })
// app.post('/api/v1/expenses',(req,res)=>{
//     let newExpense = req.body;
//     newExpense.id = expenses[expenses.length-1].id+1;
//     expenses.push(newExpense);
//     let newExpense1 = {
//         id: newExpense.id,
//         paymentmode: newExpense.paymentMode
//     }
//     expenseDetails.push(newExpense1);
//     res.status(201).json(newExpense);
//     console.log(expenseDetails);
// })
// app.delete('/api/v1/expenses/:id',(req,res)=>{
//     for(let i=0;i<expenses.length;i+=1){
//         if(expenses[i].id == req.params.id){
//             expenses.splice(i,1);
//         }
//     }
//     res.send('Deleted');
// })
// app.put('/api/v1/expenses/:id',(req,res)=>{
//     console.log(req.body);
//     for(let i=0;i<expenses.length;i+=1){
//         if(expenses[i].id == req.params.id){
//             if(req.body.amount){
//                 expenses[i].amount = req.body.amount;
//             }
//             if(req.body.desc){
//                 expenses[i].desc = req.body.desc;
//             }
//         }
//     }
//     res.send('updated');
// })
app.get('/api/v1/expenses',getExpenses);
app.get('/api/v1/expenses/:id',getExpensesById);
app.post('/api/v1/expenses',loggerFunc,checkAdmin,addExpense);
app.delete('/api/v1/expenses/:id',deleteExpense);
app.listen(3000,()=>{
    console.log("server is running");
})