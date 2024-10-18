import express from "express";
import bodyParser from "body-parser";
import mongoose from"mongoose";
import path from "path"; 
import { fileURLToPath } from 'url'; 

// mongodb connection 
mongoose.connect("mongodb://localhost:27017/userdb").then(()=>{
    console.log(`congrats mongodb is connected`)
}).catch((err)=>{
    console.log(err)
})


const userschema=new mongoose.Schema({
       email:String,
       password:String,
})

const Usermodel= new mongoose.model("contact Us",userschema)


const app = express();
const port = 3000;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

console.log(`Directory Name: ${__dirname}`);

// Set the views directory and view engine
app.set('views', path.join(__dirname, '.')); // Keep it the same if index.js is directly inside views

app.set('view engine', 'ejs');

// Serve static files from the public folder
console.log(path.join(__dirname, '..', 'public'));
app.use(express.static(path.join(__dirname, '..', 'public')));


// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.render("index.ejs", { 
        title: "Contact Us", 
        heading: "Log In",  // or any value you want to display
        formAction:"/submit" // You can also pass formAction if needed
    });
});

app.post("/submit", (req, res) => {
     
    const details =req.body
    

    const newDetails =new Usermodel(details)
    newDetails.save()



    console.log(req.body);
    res.send("Thank you for your submission!");
});

// Start server
app.listen(port, () => {
    console.log(`Your server is running on port ${port}`);
});
