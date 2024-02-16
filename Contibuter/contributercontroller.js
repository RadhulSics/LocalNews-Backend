const express=require("express")
const contibuterschema=require("./contibuterschema")

const addcontributer= (req, res) => {
    console.log(req.body);
    let contibuter = new contibuterschema({
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
    contibuter.save()
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

  const contributerlogin = (req, res) => {
    const email = req.body.email
    const password = req.body.password
  
    contibuterschema.findOne({ email: req.body.email })
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

  const contributerforgetpswd=(req,res)=>{
    contibuterschema.findOne({email:req.body.email})
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
        contibuterschema.findOneAndUpdate({email:req.body.email},{password:req.body.password})
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
  const contibuterviewbyid=(req,res)=>{
    contibuterschema.findOne({_id:req.params.id})
    .exec()
    .then((result)=>{
      res.json({
        status:200,
        msg:"success",
        data:result
      })
    })
      .catch(err=>{
        res.json({
            status:500,
            msg:err
        })
      })

  }
  const viewallcontributer=(req,res)=>{
    contibuterschema.find({})
    .then((result)=>{
      res.json({
        status:200,
        data:result
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
  const updatecontributer=(req,res)=>{
    contibuterschema.findByIdAndUpdate({_id:req.params.id},{
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
      contact: req.body.contact
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
  const deletecontributer=(req,res)=>{
    contibuterschema.findByIdAndDelete({_id:req.params.id})
    .exec()
    .then((response)=>{
      res.json({
        status:200,
        msg:"Deleted succesfully"
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
  
  module.exports={addcontributer,
    contributerlogin,
    contributerforgetpswd,
    contibuterviewbyid,
    viewallcontributer,
    updatecontributer,
    deletecontributer
  }