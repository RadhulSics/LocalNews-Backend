const express = require("express");
const readerschema = require("./readerschema")

const addreader = (req, res) => {
  console.log(req.body);
  let reader = new readerschema({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    age: req.body.age,
    street: req.body.street,
    city: req.body.city,
    pincode: req.body.pincode,
    state: req.body.state,
    nationality: req.body.nationality,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password
  })
  reader.save()
    .then(response => {
      console.log(response);
      res.json({
        status: 200,
        msg: "saved"
      })
    })
    .catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        res.json({
          status: 409,
          msg: "Email Id Already Registered",

        });
      }
      else {
        console.log(err);
        res.json({
          status: 500,
          msg: "error",
        });
      }
    });
}

const readrelogin = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  readerschema.findOne({ email: req.body.email })
    .exec()
    .then((data) => {
      if (password == data.password) {
        res.json({
          status: 200,
          msg: "Login successfully",
          data: data
        })
      }
      else {
        res.json({
          status: 500,
          msg: "password Mismatch",

        })
      }
    })
    .catch((err)=>{
      res.json({
        status:400,
        msg:"user not found"
      })
    })
}
const readreforgetpswd=(req,res)=>{
  readerschema.findOne({email:req.body.email})
  .exec()
  .then(data=>{
    console.log(data);
    if(data==null){
      res.json({
        status:500,
        msg:"user not found"
      })
    }
    else{
      readerschema.findOneAndUpdate({email:req.body.email},{password:req.body.password})
      .exec()
      .then(data=>{
        res.json({
          status:200,
          msg:"Updated successfully"
        })
      })
      .catch(err=>{
        res.json({
            status:500,
            msg:"Data not Updated",
            Error:err
        })
      })
    }
  })

}
const readerviewbyid=(req,res)=>{
  readerschema.findById({_id:req.params.id})
  .exec()
  .then((data)=>{
    res.json({
      status:200,
      msg:data
    })
  })
  .catch((err)=>{
    res.json({
    status:500,
    msg:"No user  found"
    })
  })
}
const readereditprofile=(req,res)=>{
  readerschema.findByIdAndUpdate({_id:req.params.id},{
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    age: req.body.age,
    street: req.body.street,
    city: req.body.city,
    pincode: req.body.pincode,
    state: req.body.state,
    nationality: req.body.nationality,
    email: req.body.email,
    contact: req.body.contact,
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
}

const viewalluser=(req,res)=>{
  readerschema.find({})
  .then((data)=>{
    if(data.length>0){
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    }else{
      res.json({
        status:500,
        msg:"No Data obtained "
    })
    }
    })
  .catch((err)=>{
    res.json({
      status:400,
      msg:err
    })
  })
  
}
const readerdeletebyid=(req,res)=>{
  readerschema.findByIdAndDelete({_id:req.params.id})
  .exec()
  .then((data)=>{
    res.json({
      status:200,
      msg:"Deleted Succesfully",
      data:data
    })
  })
  .catch((err)=>{
    res.json({
      status:500,
      msg:err
    })
    console.log(err);
  })
}
const searchusersByName = (req, res) => {
  readerschema.find({ firstname: { $regex: req.params.firstname, $options: 'i' } })
  // .populate('shopid')
      .then(services => {
          if (services.length === 0) {
              return res.status(404).json({ message: 'No user found with the name.' });
          }
          res.status(200).json(services);
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Server Error' });
      });
}

module.exports = { addreader,
  readrelogin ,
  readreforgetpswd,
  readerviewbyid,
  readereditprofile
  ,viewalluser
,readerdeletebyid,
searchusersByName
}