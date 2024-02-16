const saveschema=require ("./Savenewsschema")

const savenews =(req,res)=>{
    let news=new saveschema({
        newsid:req.body.newsid,
        readerid:req.body.readerid
    })
    news.save()
    .then(response => {
        console.log(response);
        res.json({
            status: 200,
            msg: "saved",
            data: response
        })
    })
    .catch((err) => {
        console.log(err);
        res.json({
            status: 500,
            msg: "error",
            err: err
        });
    });
}
const viewmynewsbyuserid=((req,res)=>{
    saveschema.find({readerid:req.params.id}).populate('newsid')
    .exec()
    .then((result) => {
        res.json({
            status: 200,
            data: result,
            msg: 'data obtained'
        })
    })
    .catch(err => {
        res.json({
            status: 500,
            msg: 'Error in API',
            err: err
        })
    })
})

const deletesavednews=((req,res)=>{
    saveschema.findByIdAndDelete({_id:req.params.id})
        .exec()
        .then((result) => {
            res.json({
                status: 200,
                data: result,
                msg: 'deleted'
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: 'Error in API',
                err: err
            })
        })
})

module.exports={
    savenews,
    viewmynewsbyuserid,
    deletesavednews
}