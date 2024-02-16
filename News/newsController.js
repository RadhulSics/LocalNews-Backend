const newsSchema = require("./newsSchema");
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

const viewnewsById = (req, res) => {
    newsSchema.findById({ _id: req.params.id }).populate('contributorid').exec()
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
const viewnewsByContributorId = (req, res) => {
    newsSchema.find({ contributorid: req.params.id }).exec()
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
    newsSchema.find({ isactive: true }).populate('contributorid').sort({ date: -1 }).exec()
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
    newsSchema.find({ isactive: false }).populate('contributorid').exec()
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
    newsSchema.find({ category: req.body.category }).populate('contributorid').exec()
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
    newsSchema.findByIdAndUpdate({ _id: req.params.id }, { isactive: true }).exec()
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

const deleteNewsById = (req, res) => {
    newsSchema.findByIdAndDelete({ _id: req.params.id }).exec()
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

}


module.exports = {
    addNews,
    viewallnewses,
    viewnewsById,
    viewallNewsByCategory,
    viewallNewsReqsForModerator,
    upload,
    viewnewsByContributorId,
    acceptNewsById,
    deleteNewsById
}