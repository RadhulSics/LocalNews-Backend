const express = require("express");
const router = express.Router();


const Reader=require("./Reader/readercontroller")

router.post("/readersignup",Reader.addreader )
router.post("/readerlogin",Reader.readrelogin)
router.post("/readreforgetpswd",Reader.readreforgetpswd)
router.post("/readerviewbyid/:id",Reader.readerviewbyid)


const Contributer=require("./Contibuter/contributercontroller")

router.post("/contributersignup",Contributer.addcontributer)
router.post("/contibuterlogin",Contributer.contributerlogin)
router.post("/contributerforgetpswd",Contributer.contributerforgetpswd)


const Advertiser=require("./Advertiser/advertisercontroller")
router.post("/advertisersignup",Advertiser.addadvertiser)
router.post("/advertiserlogin",Advertiser.advertiserlogin)
router.post("/advertiserforgetpswd",Advertiser.advertiserforgetpswd)

module.exports=router