const mongoose=require('mongoose')

const savenews= mongoose.Schema({
    newsid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'newses',
        required: true
    },
    readerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'reader',
        required:true
    }
  
})

module.exports=mongoose.model('savednews',savenews)

