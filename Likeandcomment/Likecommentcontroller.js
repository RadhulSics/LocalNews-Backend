const likeschema = require("./LIkeschema");
const commentschema=require("./Commentschema")

const likeOrDislike = async (req, res) => {
    let likes = 0, flag = false
  await  likeschema.findById({ id: req.params.id }, { id: 0, likes: 1 })
        .exec()
        .then(data => {
          data.likes.filter(x=>{
            if((x._id).equals(req.body.readerid)){
            flag=true
            }
          })
          console.log("flag",flag);
            if (flag) {
                console.log("in array");
                let y=0
               for(let x=0;x<(data.likes).length;x++)
                        if(((data.likes)[x]._id).equals(req.body.readerid)){
                   y=x
                    }
                  
                console.log("index",y);
                if (y > -1) {
                    data.likes.splice(y, 1);
                }
                likeschema.findByIdAndUpdate({ _id: req.params.id }, {
                    likes: data.likes
                }).exec().then(data => {
                    console.log(data);
                   
                }).catch(err => {
                    console.log(err);
                    res.json({
                        status: 500,
                        msg: "No Data obtained",
                        Error: err
                    })
                })
            }
            else {

                data.likes.push(req.body.readerid);
                likeschema.findByIdAndUpdate({ _id: req.params.id }, {
                    likes: data.likes
                }).exec().then(data => {
                    console.log(data);
                   

                }).catch(err => {
                    console.log(err);
                   
                })
            }

            console.log(data);
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            })

        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            })
        })


}



const addcomment = (req, res) => {
    let currentdate = new Date()

    const comments = new commentschema({
        newsid:req.body.newsid,
        readerid: req.body.readerid,
        msg: req.body.msg,
        date:currentdate


    })
    comments.save().then(data => {
        res.json({
            status: 200,
            msg: "added successfully",
            data: data
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err
        })
    })

}
const viewallcomments=(req,res)=>{
    commentschema.find({})
    .populate('readerid')
    .exec()
    .then(data => {
        res.json({
            status: 200,
            msg: "data obtained",
            data: data
        })
    }).catch(err => {
        console.log(err);
        res.json({
            status: 500,
            msg: "Data not get",
            Error: err
        })
    })

}
module.exports = {
    likeOrDislike,
    addcomment,
    viewallcomments
  };
  


