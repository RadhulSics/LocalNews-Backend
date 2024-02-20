const mongoose=require('mongoose')

const likecomment= mongoose.Schema({
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

  
})

module.exports=mongoose.model('likecomment',likecomment)


