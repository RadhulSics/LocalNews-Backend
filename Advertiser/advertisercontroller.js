const express=require("express")
const advertiserschema=require("./advertiserschema")

const addadvertiser=(req,res)=>{
    let advertiser=new advertiserschema({
        firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      companyname: req.body.companyname,
      regno:req.body.regno,
      street: req.body.street,
      city: req.body.city,
      pincode: req.body.pincode,
      state: req.body.state,
      email: req.body.email,
      contact: req.body.contact,
      password: req.body.password
    })
    advertiser.save()
    .then(response=>{
        console.log(response);
        res.json({
            status:200,
            msg:"saved"
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

const advertiserlogin=(req,res)=>{
    const email=req.body.email
    const password=req.body.password

    advertiserschema.findOne({email:req.body.email})
    .exec()
    .then((data)=>{
        if(password==data.password){
            res.json({
                status:200,
                msg:"login successfully",
                data:data
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
const advertiserforgetpswd=(req,res)=>{
  advertiserschema.findOne({email:req.body.email})
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
      advertiserschema.findOneAndUpdate({email:req.body.email},{password:req.body.password})
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
const viewalladvertiser=(req,res)=>{
  advertiserschema.find({})
  .exec()
      .then(data=>{
        res.json({
          status:200,
          msg:"data found succesfully",
          data:data
        })
      })
      .catch(err=>{
        res.json({
            status:500,
            msg:"Data not found",
            Error:err
        })
      })

}
const viewsingleadvertiser=(req,res)=>{
  advertiserschema.findOne({_id:req.params.id})
  .exec()
      .then(data=>{
        res.json({
          status:200,
          msg:"data found succesfully",
          data:data
        })
      })
      .catch(err=>{
        res.json({
            status:500,
            msg:"Data not found",
            Error:err
        })
        console.log(err);
      })
}
const deleteadvertiser=(req,res)=>{
  advertiserschema.findByIdAndDelete({_id:req.params.id})
  .exec()
      .then(data=>{
        res.json({
          status:200,
          msg:"data deleted succesfully",
          data:data
        })
      })
      .catch(err=>{
        res.json({
            status:500,
            msg:"Data not found",
            Error:err
        })
        console.log(err);
      })
}

const editadvertiser=(req,res)=>{
  advertiserschema.findByIdAndUpdate({_id:req.params.id},{
    firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      companyname: req.body.companyname,
      regno:req.body.regno,
      street: req.body.street,
      city: req.body.city,
      pincode: req.body.pincode,
      state: req.body.state,
      email: req.body.email,
      contact: req.body.contact,
      password: req.body.password
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



module.exports={addadvertiser,
  advertiserlogin,
  advertiserforgetpswd,
  viewalladvertiser,
  viewsingleadvertiser,
  deleteadvertiser,
  editadvertiser
}