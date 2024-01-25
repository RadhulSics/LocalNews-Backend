const mongoose=require('mongoose')

const newsschema= mongoose.Schema({
    contributorid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'contributor',
        required: true
    },
    title:{
        type:String,
        required: true
    },
    content:{
        type:String,
        required: true
    },
    subcontent:{
        type:String,
        required: true
    },
    location:{
        type:String,
        required: true
    },image:{
        type:Object,
        required: true
    },
    // contributorname:{
    //     type:String,
    //     required: true
    // },
    category:{
        type:String,
        required: true
    },
    date:{
        type:Date
    },
    isactive:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('newses',newsschema)

