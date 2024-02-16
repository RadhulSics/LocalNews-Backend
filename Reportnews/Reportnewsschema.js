const mongoose=require('mongoose')

const reportnews= mongoose.Schema({
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
    typeofreport:{
        type:String,
        required:true
    }

  
})

module.exports=mongoose.model('reportnews',reportnews)

