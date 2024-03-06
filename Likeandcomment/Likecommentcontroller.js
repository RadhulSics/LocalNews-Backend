const likeschema = require("./LIkeschema");
const commentschema = require("./Commentschema");

const likeOrDislike = async (req, res) => {
  console.log("params", req.params);
  console.log("body", req.body);
  let likes = 0,
    flag = false,
    likeid = null,
    newflag = false;
  await likeschema
    .findOne({ newsid: req.params.id, readerid: req.body.readerid })
    .exec()
    .then((data) => {
      if (data!=null) {console.log(data);
      flag = data.like;
      likeid = data._id;
      }
      console.log("likeid",likeid);
    })
    .catch((err) => {
      console.log(err);
    
    });
   newflag = !flag;
   console.log(flag);
if(likeid==null){
const newLike=new likeschema({
    newsid: req.params.id, 
    readerid: req.body.readerid,
    like:true
})
newLike.save()
.then((data) => {
    console.log(data);
    res.json({
      status: 200,
      msg: "Like added",
    });
  })
  .catch((err) => {
    console.log(err);
    res.json({
      status: 500,
      msg: "No Data obtained",
      Error: err,
    });
  });
}
else{
  await likeschema
    .findByIdAndUpdate({ _id: likeid }, { like: newflag })

    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Like added",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
}
};

const addcomment = (req, res) => {
  let currentdate = new Date();

  const comments = new commentschema({
    newsid: req.body.newsid,
    readerid: req.body.readerid,
    msg: req.body.msg,
    date: currentdate,
  });
  comments
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "added successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
const viewcommentsbynewsid = (req, res) => {
  commentschema
    .find({ newsid: req.params.id })
    .populate("readerid")
    .exec()
    .then((data) => {
      if (!data || data.length === 0) {
        return res.status(404).json({
          status: 404,
          msg: "No comments found for the provided newsid",
        });
      }
      res.json({
        status: 200,
        msg: "data obtained",
        data: data,
      });
    })
    .catch((err) => {
      console.error("Error fetching comments:", err);
      res.status(500).json({
        status: 500,
        msg: "Internal server error",
        Error: err.message,
      });
    });
};
module.exports = {
  likeOrDislike,
  addcomment,
  viewcommentsbynewsid,
};
