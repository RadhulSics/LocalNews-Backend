const reportschema=require ("./Reportnewsschema")

const reportnews =(req,res)=>{
    let report=new reportschema({
        newsid:req.body.newsid,
        readerid:req.body.readerid,
        typeofreport:req.body.typeofreport
    })
    report.save()
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
const viewreportformoderator=((req,res)=>{
    reportschema.find({}).populate('newsid').populate('readerid')
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
const viewreportbyid=((req,res)=>{
    reportschema.findById({_id:req.params.id}).populate('newsid').populate('readerid')
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

module.exports={reportnews,
    viewreportformoderator,
    viewreportbyid
}