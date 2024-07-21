const mongoose= require("mongoose");

const cSchema=mongoose.Schema({
    
    planId:{
        type:String,
        required: true
    },
    readerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'reader',
        required:true
    },
      
date:{
    type:Date,
    default:new Date()
},

});
module.exports=mongoose.model('subscriptions',cSchema)
