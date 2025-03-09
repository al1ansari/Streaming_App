const mongoose = require("mongoose")

const schemaRules = {
    name:{
        type:String,
        required:[true, "name is required"]
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:[true,"email should be unique"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[6, "password should be atleast of 6 character"]
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:6,
        validate:[function(){
            return this.password==this.confirmPassword;
        }, "password should be equal to confirm password"]
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    isPremium:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:["user","admin","feed curator","moderator"],
        default:"user"
    },
    otp:{
        type:String
    },
    otpExpiry:{
        type:Date
    }
}

const userSchema = new mongoose.Schema(schemaRules);

userSchema.pre("save", function(next){
    console.log("pre save was called");
    this.confirmPassword=undefined;
    next()
})

userSchema.post("save",function(){
    console.log("post save was called")
    this.__v = undefined
})

const userModel = mongoose.model("user",userSchema);

module.exports = userModel