const mongoose= require("mongoose");

const lSchema=mongoose.Schema({
    
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
       like:{

    type:Boolean,
    default:false
}

});
module.exports=mongoose.model('likes',lSchema)