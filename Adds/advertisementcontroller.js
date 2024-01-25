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
        date:currentdate
    })
    adds.save()
    .then((res)=>{
        res.json({
            status:200,
            msg:"succesfully entered",
            data:res
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
module.exports={addadvertisement,upload}
