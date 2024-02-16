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
module.exports={reportnews}