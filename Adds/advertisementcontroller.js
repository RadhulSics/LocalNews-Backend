const addschema=require("./Advertisementschema")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage }).single("image");

const addadvertisement=(req,res)=>{
    let currentdate = new Date()
    let adds=new addschema({
        advertiserid:req.params.id,
        title:req.body.title,
        content:req.body.content,
        location:req.body.location,
        image:req.file,
        category:req.body.category,
        date:currentdate
    })
    adds.save()
    .then((result)=>{
        console.log(result);
        res.json({
            status:200,
            msg:"succesfully entered",
            data:result
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:500,
            msg:"err",
            err:err
        })
    })
}

const viewnewsbyadvertiserid=(req,res)=>{
    addschema.find({advertiserid:req.params.id})
    .exec()
    .then((result)=>{
        res.json({
            status:200,
            data:result,
            msg:"data obtained"
        })
    })
    .catch((err)=>{
        res.json({
            staus:500,
            msg:err
        })
    })
}
const viewallnewsreqformoderator=((req,res)=>{
    addschema.find({isactive:false})
    .populate('advertiserid')
    .exec()
    .then((result)=>{
        res.json({
            data:result,
            status:200,
            msg:"data obtained"
        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            msg:err
        })
    })
})

const acceptnews=((req,res)=>{
    addschema.findByIdAndUpdate({_id:req.params.id},{isactive:true})
    .exec()
    .then((result)=>{
        res.json({
            status:200,
            data:result,
            msg:"success"
        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            mas:"error ocured",
            err:err
        })

    })
})
const rejectreq=((rea,res)=>{
    addschema.findByIdAndDelete({_id:req.body.id})
    .exec()
    .then((result)=>{
        res.json({
            status:200,
            data:result,
            msg:"successfully deleted"
        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            mas:"error ocured",
            err:err
        })

    })
})
const viewaddbyid=((req,res)=>{
    addschema.findById({_id:req.params.id}).populate('advertiserid')
    .exec()
    .then((result)=>{
        res.json({
            status:200,
            data:result,
            msg:"data obtained"
        })
    })
    .catch((err)=>{
        res.json({
            staus:500,
            msg:err
        })
    })

})


module.exports={addadvertisement,
    upload,viewnewsbyadvertiserid,
    viewallnewsreqformoderator,
    acceptnews,
    viewaddbyid,
    rejectreq
}
