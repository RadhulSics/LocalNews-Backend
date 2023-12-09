const express = require("express");
const router = express.Router();


const Reader=require("./Reader/readercontroller")

router.post("/readersignup",Reader.addreader )

module.exports=router