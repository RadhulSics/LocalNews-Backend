const express = require("express");
const router = express.Router();


const Reader=require("./Reader/readercontroller")
const news=require("./News/newsController")
const Contributer=require("./Contibuter/contributercontroller")
const Advertiser=require("./Advertiser/advertisercontroller")



router.post("/readersignup",Reader.addreader )
router.post("/readerlogin",Reader.readrelogin)
router.post("/readreforgetpswd",Reader.readreforgetpswd)
router.post("/readerviewbyid/:id",Reader.readerviewbyid)
router.post("/readeredirprofile/:id",Reader.readereditprofile)
router.post("/viewallusers",Reader.viewalluser)
router.post("/readerdeletebyid/:id",Reader.readerdeletebyid)



router.post("/contributersignup",Contributer.addcontributer)
router.post("/contibuterlogin",Contributer.contributerlogin)
router.post("/contributerforgetpswd",Contributer.contributerforgetpswd)
router.post("/contibuterviewbyid/:id",Contributer.contibuterviewbyid)
router.post("/viewallcontributer",Contributer.viewallcontributer)
router.post("/updatecontributer/:id",Contributer.updatecontributer)

router.post("/advertisersignup",Advertiser.addadvertiser)
router.post("/advertiserlogin",Advertiser.advertiserlogin)
router.post("/advertiserforgetpswd",Advertiser.advertiserforgetpswd)



//news Routes
router.post('/addNews',news.upload,news.addNews)
router.post('/viewnewsById/:id',news.viewnewsById)
router.post('/viewallNewsByCategory',news.viewallNewsByCategory)
router.post('/viewallNewsReqsForModerator',news.viewallNewsReqsForModerator)
router.post('/viewallnewses',news.viewallnewses)
router.post('/viewnewsByContributorId/:id',news.viewnewsByContributorId)
router.post('/acceptNewsById/:id',news.acceptNewsById)
router.post('/deleteNewsById/:id',news.deleteNewsById)


module.exports=router