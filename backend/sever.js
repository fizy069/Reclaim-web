const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const UserModel = require('./model/Users');
const app=express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://testuser:pokemon@clustlvMkhgKItv4ZHEY7er0.b5lrnmi.mongodb.net/")
.then(()=>{
    console.log("Connected to database");
})
.catch((err)=>{
    console.log(err);
})

app.post('/register',  (req, res) => {
    
    UserModel.create(req.body)
    .then(users =>{res.json(users)
    res.json("User Created")
})
    .catch(err=>res.status(400).json('Error: '+err));
})

app.post('/login',(req,res)=>{
    const {email,password} = req.body;
    UserModel.findOne({email:email})
    .then(user=>{
        if(user){
            if(user.password===password){
                res.json('Login Success');
            }else{
                res.json('Wrong Password');
            }
        }else{
            res.json('User not found');
        }
    })
    .catch(err=>res.status(400).json('Error: '+err));
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})