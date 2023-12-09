const mongoose=require("mongoose")

const readerschema= mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    street:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    pincode:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    nationality:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique: true        
    },
    contact:{
        type:Number,
        required: true
    },
    password:{
        type:String,
        required: true
    },
})

module.exports=mongoose.model('reader',readerschema)