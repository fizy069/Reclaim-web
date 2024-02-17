const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const UserModel = require('./model/Users');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));



mongoose.connect('mongodb+srv://testuser:lvMkhgKItv4ZHEY7@cluster0.b5lrnmi.mongodb.net')
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch(err => {
        console.error('Error occurred while connecting to the database:', err);
    });


app.get('/',(req,res) =>{
    res.sendFile(__dirname + '/test.html')
})
app.get("/log", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});


app.post('/signup',(req,res) =>{
 UserModel.create(req.body)
 .then(users => res.json(users))
 .catch(err => res.json(err))
})


app.post("/login",  (req, res) => {
    try {
        console.log("Request body:", req.body);

        const user =  UserModel.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found");
            return res.json({ message: "User not found" });
        }
        console.log("User found:", user);
        
        // Use a secure method for password comparison (e.g., bcrypt)
        if (req.body.password === user.password) {
            console.log("User Logged in");
            return res.json({ message: "User Logged in" });
        } else {
            console.log("Invalid Credentials");
            return res.json({ message: "Invalid Credentials" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

 


app.listen(3000,()=>{
    console.log(`Server is running at http://localhost:3000`)
})


