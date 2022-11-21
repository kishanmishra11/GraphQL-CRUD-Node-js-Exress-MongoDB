const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        userName :{
            type: String,
            required:true
        },
        password:{
            type:String,
            required: true,
            select:false
        },
        email:{
            type:String,
            required:true,
            unique:true,
            match:[
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please Enter a Valid Email"
            ],
        },
        displayName:{
            type:String,
            required:true,
        },

    },{ collection: "user", timestamps: true}
)

const User = new mongoose.model('User', userSchema);

module.exports = User;

