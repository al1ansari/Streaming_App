const mongoose = require("mongoose");
const express = require("express")
const app = express()
const dotenv = require("dotenv")

const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const util = require("util")
const promisify = util.promisify

const promisifiedJWTsign = promisify(jwt.sign)
const promisifiedJWTverify = promisify(jwt.verify)

const userModel = require("./UserModel")

const {getCurrentMovies, getTopRatedMovies} = require("./controller/movieController")

dotenv.config();
/********************************************************************/

const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vrcpfam.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(dbLink)
    .then(function(){
        console.log("Connected to db")
    }).catch(err => console.log(err))

/********************************************************************/
app.use(express.json());
/********************************************************************/
async function signupHandler(req, res){
    try {
        const userObject = req.body
        if(!userObject.email || !userObject.name){
            return res.status(400).json({
                "message":"Required data is missing",
                "status":"failure"
            })
        }
        const user = await userModel.findOne({email:userObject.email})
        if(user){
            return res.status(400).json({
                "message":"user already exist",
                "status":"failure"
            })
        }
        const newUser = await userModel.create(userObject)

        res.status(201).json({
            "message":"user signup successfull",
            "user":newUser,
            status:"success"
        })
    } catch (error) {
        console.log("error",error)
        res.status(500).json({
            "message":error.message,
            "status":"failure"
        })
    }
}

async function loginHandler(req,res){
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
            return res.staus(400).json({
                "message":"Invalid userName or password",
                "staus":"failure"
            })
        }
        if(password!=user.password){
            return res.status(400).json({
                "message":"Invalid userName or password",
                "status":"failure"
            })
        }

        const authToken = await promisifiedJWTsign({},process.env.JWT_SECRET_KEY)

        res.cookie("jwt",authToken,{
            maxAge: 1000*60*60,
            httpOnly:true
        })

        res.status(200).json({
            "message":"login successfull",
            "status":"success",
            "user":user
        })
    } catch (error) {
        console.log("Error_57",error)
        res.status(500).json({
            "message":error.message,
            "status":"failure"
        })
    }
}

const otpGenerator = ()=>{
    return Math.floor(100000 + Math.random() * 900000)
}

async function forgetPasswordHandler(req, res){
    try {
        const { email } = req.body;
        if(email==undefined){
            return res.status(401).json({
                "message":"please enter the email id",
                "status":"failure"
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                "message":"please enter the registered email id",
                "status":"failure"
            })
        }
        const otp = otpGenerator();
        user.otp = otp;
        user.otpExpiry = Date.now()+1000*60*10;

        await user.save({validateBeforeSave:false})

        res.status(200).json({
            "message":"otp is send successfully",
            "status":"success",
            "otp":otp,
            resetURL:`http:localhost:3000/api/auth/resetPassword/${user["_id"]}`
        })
        // const templateData = { name: user.name, otp: user.otp }
        // await emailSender("./templates/otp.html", user.email, templateData);
    } catch (error) {
        console.log("Error",error)
        res.status(500).json({
            "message":error.message,
            "status":"failure"
        })
    }
}

app.post("/api/auth/signup",signupHandler)
app.post("/api/auth/login",loginHandler)
app.patch("/api/auth/forgetPassword",forgetPasswordHandler)


app.get("/api/movies/currentplaying", getCurrentMovies);
app.get("/api/movies/topRated",getTopRatedMovies)

app.listen(3000,function(){
    console.log("Listening on Port 3000")
})