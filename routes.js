const express = require("express");
const router = express.Router();


const Reader=require("./Reader/readercontroller")
const news=require("./News/newsController")
const Contributer=require("./Contibuter/contributercontroller")
const Advertiser=require("./Advertiser/advertisercontroller")
const Advertisement = require("./Adds/advertisementcontroller")
const Savenews=require('./Savenews/Savenewscontroller')
const Reportnews=require('./Reportnews/Reportnewscontroller')


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
router.post("/deletecontributer/:id",Contributer.deletecontributer)


router.post("/advertisersignup",Advertiser.addadvertiser)
router.post("/advertiserlogin",Advertiser.advertiserlogin)
router.post("/advertiserforgetpswd",Advertiser.advertiserforgetpswd)
router.post("/viewalladvertiser",Advertiser.viewalladvertiser)
router.post("/viewoneadvertiser/:id",Advertiser.viewsingleadvertiser)
router.post("/editadvertiser/:id",Advertiser.editadvertiser)



//news Routes
router.post('/addNews/:id',news.upload,news.addNews)
router.post('/viewnewsById/:id',news.viewnewsById)
router.post('/viewallNewsByCategory',news.viewallNewsByCategory)
router.post('/viewallNewsReqsForModerator',news.viewallNewsReqsForModerator)
router.post('/viewallnewses',news.viewallnewses)
router.post('/viewnewsByContributorId/:id',news.viewnewsByContributorId)
router.post('/acceptNewsById/:id',news.acceptNewsById)
router.post('/deleteNewsById/:id',news.deleteNewsById)
router.post('/updatenews/:id',news.upload,news.updatenews)


//adds route
router.post("/addadvertisement/:id",Advertisement.upload,Advertisement.addadvertisement)
router.post("/viewaddsbyadvertiserid/:id",Advertisement.viewnewsbyadvertiserid)
router.post("/viewrequests",Advertisement.viewallnewsreqformoderator)
router.post("/acceptnews/:id",Advertisement.acceptnews)
router.post("/viewaddbyid/:id",Advertisement.viewaddbyid)
router.post("/rejectreq/:id",Advertisement.viewaddbyid)

//save news
router.post("/savenews",Savenews.savenews)
router.post("/viewmynewsforuser/:id",Savenews.viewmynewsbyuserid)
router.post("/deletesavednews/:id",Savenews.deletesavednews)

//report news
router.post("/reportnews",Reportnews.reportnews)
router.post("/viewreportformoderator",Reportnews.viewreportformoderator)
router.post("/viewreportbyid/:id",Reportnews.viewreportbyid)


module.exports=router