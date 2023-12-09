const express = require("express");
const readerschema=require("./readerschema")

const addreader=(req,res)=>{
    let reader=new readerschema({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        gender:req.body.gender,
        age:req.body.age,
        street:req.body.street,
        city:req.body.city,
        pincode:req.body.pincode,
        state:req.body.state,
        nationality:req.body.nationality,
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password
    })
    reader.save()
    .then(response=>{
        console.log(response);
        res.json({
            status:200,
            msg:"saved"
        })
    })
    .catch((err) => {
        console.log(err);
        if(err.code===11000){
          res.json({
            status: 409,
            msg: "Email Id Already Registered",
            
          });
        }
        else{
        console.log(err);
        res.json({
          status: 500,
          msg: "error",
        });}
      });
}
module.exports={addreader}