const newsSchema = require("./newsSchema");
const Reportnewsschema = require("../Reportnews/Reportnewsschema");
const BadWordsFilter = require('bad-words');

const multer = require('multer');
const LIkeschema = require("../Likeandcomment/LIkeschema");


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).single("image");

const addNews = (req, res) => {
    let currentdate = new Date()
    let news = new newsSchema({
        contributorid: req.params.id,
        title: req.body.title,
        content: req.body.content,
        subcontent: req.body.subcontent,
        location: req.body.location,
        // contributorname: req.body.contributorname,
        category: req.body.category,
        image: req.file,
        date:currentdate
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


            console.log(err);
            res.json({
                status: 500,
                msg: "error",
                err: err

            });

        });
}

const viewnewsById = async (req, res) => {
    let likecount=0,liked=false
    await LIkeschema.find({newsid: req.params.id}).exec()
    .then((result) => {
       result.map(x=>{
        if(x.like)
        likecount++

       })
        
        console.log(likecount);
    })
    .catch(err => {
        console.log(err);
    })

    await LIkeschema.findOne({newsid: req.params.id,readerid:req.body.readerid}).exec()
    .then((result) => {
       
            liked=result.like
        
        console.log(liked);
    })
    .catch(err => {
        console.log(err);
    })
   await newsSchema.findById({ _id: req.params.id }).populate('contributorid').exec()
        .then((result) => {
            res.json({
                status: 200,
                data: result,
                likecount:likecount,
                liked:liked,
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

}
const viewnewsByContributorId = (req, res) => {
    newsSchema.find({ contributorid: req.params.id}).exec()
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

}
const viewRejectednewsByContributorId = (req, res) => {
    newsSchema.find({ contributorid: req.params.id, isactive: "rejected" }).exec()
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

}

const viewallnewses = (req, res) => {
    newsSchema.find({ isactive: "approved"  }).populate('contributorid').sort({ date: -1 }).exec()
        .then((result) => {
            res.json({
                status: 200,
                msg: result
            })
        })
        .catch((err) => {
            res.json({
                status: 500,
                msg: err
            })
            console.log(err);
        })
}

// view all news reqs for moderator
const viewallNewsReqsForModerator = (req, res) => {
    newsSchema.find({ isactive: "pending" }).populate('contributorid').exec()
        .then((result) => {
            res.json({
                status: 200,
                msg: result
            })
        })
        .catch((err) => {
            res.json({
                status: 500,
                msg: err
            })
            console.log(err);
        })
}
// view all news by Category
const viewallNewsByCategory = (req, res) => {
    newsSchema.find({ category: req.body.category ,isactive: "approved"  }).populate('contributorid').exec()
        .then((result) => {
            res.json({
                status: 200,
                msg: result
            })
        })
        .catch((err) => {
            res.json({
                status: 500,
                msg: err
            })
            console.log(err);
        })
}
const acceptNewsById = (req, res) => {
    newsSchema.findByIdAndUpdate({ _id: req.params.id }, { isactive: "approved" }).exec()
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

}

const deleteNewsById =async (req, res) => {
    await newsSchema.findByIdAndUpdate({ _id: req.params.id },{isactive:"rejected"}).exec()
        .then((result) => {
            res.json({
                status: 200,
                data: result,
                msg: 'data deleted'
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: 'Error in API',
                err: err
            })
        })

        await Reportnewsschema.deleteMany({ newsid: req.params.id }).exec()
        .then((result) => {
            console.log("deleted");
        })
        .catch(err => {
           console.log(err);
        })

}

const deleteNewsByContributer =async (req, res) => {
    await newsSchema.findByIdAndDelete({ _id: req.params.id }).exec()
        .then((result) => {
            res.json({
                status: 200,
                data: result,
                msg: 'data deleted'
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: 'Error in API',
                err: err
            })
        })

        await Reportnewsschema.deleteMany({ newsid: req.params.id }).exec()
        .then((result) => {
            console.log("deleted");
        })
        .catch(err => {
           console.log(err);
        })

}

const updatenews=((req,res)=>{
    newsSchema.findByIdAndUpdate({_id:req.params.id},
        {
            title: req.body.title,
            content: req.body.content,
            subcontent: req.body.subcontent,
            location: req.body.location,
            category: req.body.category,
            image: req.file,
        })
        .exec()
        .then((response)=>{
          res.json({
            status:200,
            msg:"updated successfully",response
          })
        })
        .catch((err)=>{
          res.json({
            status:500,
            msg:"error",err
          })
          console.log(err);
        })
    
})


// Initialize the bad words filter
const filter = new BadWordsFilter();

// Function to check if content contains bad words
const containsBadWords = (text) => {
  return filter.isProfane(text);
};


const checkForBadWords = async(req, res, next) => {
    try {
        const { newsId } = req.params;
    
     
        const newsArticle = await newsSchema.findById(newsId);
    
        if (!newsArticle) {
          return res.status(404).json({
            status: 404,
            msg: "News article not found",
            data: null,
          });
        }
    
        const { title, content, subcontent } = newsArticle;
    
        
        const hasBadWords = containsBadWords(title) ||
                            containsBadWords(content) ||
                            containsBadWords(subcontent) 
                         
    
        if (hasBadWords) {
          return res.status(400).json({
            status: 400,
            msg: "Content contains inappropriate language.",
            data: null,
          });
        }
    
        res.status(200).json({
          status: 200,
          msg: "Content is clean.",
          data: newsArticle,
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};

module.exports = {
    addNews,
    viewallnewses,
    viewnewsById,
    viewallNewsByCategory,
    viewallNewsReqsForModerator,
    upload,
    viewnewsByContributorId,
    acceptNewsById,
    deleteNewsById,
    updatenews,
    checkForBadWords,
    viewRejectednewsByContributorId,
    deleteNewsByContributer
}