
const collegeModel = require("../models/collegeModel");


const isvalid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.length === 0) return false;
    return true;
  };
  
  const isvalidRequestBody = function (requestbody) {
    return Object.keys(requestbody).length > 0;
  };

let createrCollege= async function(req,res){

    try{
        let requiredBody=req.body;
        if(!isvalidRequestBody(requiredBody)){
          return res.status(400).send({status :false, msg:"please provide College details"})
        }
        
   let {name,fullName,logoLink,isDeleted}=req.body
   if(isDeleted==true){ return res.status(400).send({status : false , msg :"data is not vailid"})}

   if(!isvalid(name)){
    return res.status(400).send({status : false , msg :"Name is required"})
  }
  if(!isvalid(fullName)){
    return res.status(400).send({status : false , msg :"FullName is required"})
  }

  if(!isvalid(logoLink)){
    return res.status(400).send({status : false , msg :"Logo Link is required"})
  }
 
  let validName=await collegeModel.findOne({name})

  if(validName){
    return res.status(409).send({ status: false, msg: `${name} College Name Already Exists` });
  }
  

    let dataCollege=await collegeModel.create(req.body)
 
    return res.status(201).send({status: true,data: dataCollege})
    }catch(err){
        return res.status(500).send({err: err})
    }
}

module.exports={createrCollege}