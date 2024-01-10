const express = require("express");
const router = express.Router();


const Reader=require("./Reader/readercontroller")

router.post("/readersignup",Reader.addreader )
router.post("/readerlogin",Reader.readrelogin)
router.post("/readreforgetpswd",Reader.readreforgetpswd)
router.post("/readerviewbyid/:id",Reader.readerviewbyid)
router.post("/readeredirprofile/:id",Reader.readereditprofile)
router.post("/viewallusers",Reader.viewalluser)
router.post("/readerdeletebyid/:id",Reader.readerdeletebyid)


const Contributer=require("./Contibuter/contributercontroller")

router.post("/contributersignup",Contributer.addcontributer)
router.post("/contibuterlogin",Contributer.contributerlogin)
router.post("/contributerforgetpswd",Contributer.contributerforgetpswd)
router.post("/contibuterviewbyid/:id",Contributer.contibuterviewbyid)
router.post("/viewallcontributer",Contributer.viewallcontributer)
router.post("/updatecontributer/:id",Contributer.updatecontributer)

const Advertiser=require("./Advertiser/advertisercontroller")
router.post("/advertisersignup",Advertiser.addadvertiser)
router.post("/advertiserlogin",Advertiser.advertiserlogin)
router.post("/advertiserforgetpswd",Advertiser.advertiserforgetpswd)

module.exports=router