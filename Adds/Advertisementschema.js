const mongoose=require ('mongoose')

const addschema=mongoose.Schema({
    advertiserid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'advertiser',
        require:true
    },
    title:{
        type:String,
        required: true
    },
    content:{
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
module.exports=mongoose.model('advertisements',addschema)