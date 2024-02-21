const mongoose= require("mongoose");

const cSchema=mongoose.Schema({
    
    newsid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'newses',
        required: true
    },
    readerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'reader',
        required:true
    },
       msg:{
    type:String
},
date:{
    type:Date
},

});
module.exports=mongoose.model('comments',cSchema)
