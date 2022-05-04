const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const validator = require("email-validator");

const moment = require('moment');



const createInternData = async function (req, res) {
    try {
        let internData = req.body

        if (!internData.name) { return res.status(400).send({ status: false, message: "name is required" }) }

        if (!internData.email) { return res.status(400).send({ status: false, message: "email is required" }) }

        if (!internData.collegeId) { return res.status(400).send({ status: false, message: "collegeId is required" }) }

        if (!internData. mobile) { return res.status(400).send({ status: false, message: " mobile number is required" }) }


        if (typeof(internData.name)!== "string" || internData.name.trim().length == 0) { return res.status(400).send({ status: false, message: "name is not valid" }) }

       
        let validEmailFormat =  validator.validate(email);
        if (!validEmailFormat) {
          return res.status(400).send({ status: false, msg: "Invalid Email" });
        }
    
        let check=/^(\+\d{1,3}[- ]?)?\d{10}$/

        if(!check.test(internData. mobile)){ return res.status(400).send({ status: false, message: "mobile number is not valid" }) }
        let Id = internData.collegeId

        let pattern = /^[0-9A-Fa-f]{24}$/

        if (!pattern.test(Id)) { return res.status(400).send({ status: false, message: "collegeId is not valid" }) }

        let college = await collegeModel.findOne({ _id: Id })

        if (college == null)  { return res.status(400).send({ status: false, message: "author is not persent" }) }

      
        let internCreated = await internModel.create(blogData)
        res.status(201).send({status:true, data: internCreated })
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }



}

module.exports.createInternData= createInternData



