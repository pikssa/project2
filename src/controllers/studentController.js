const collegeModel = require("../models/collegeModel");
const studentModel = require("../models/studentModel")
const validator = require("email-validator");
const { findOne } = require("../models/collegeModel");


const isvalid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.length === 0) return false;
  return true;
};

const isvalidRequestBody = function (requestbody) {
  return Object.keys(requestbody).length > 0;
}

let createStudent = async function (req, res) {
  try {

    let requiredBody = req.body;
    if (!isvalidRequestBody(requiredBody)) {
      return res.send({ status: false, msg: "please provide author details" })
    }

    let { name, email, collegeId, mobile, isDeleted } = req.body

    if (!isvalid(name)) {
      return res.status(400).send({ status: false, msg: "Name is required" })

    } if (!isvalid(email)) {
      return res.status(400).send({ status: false, msg: "Email is required" })
    }

    if (!isvalid(collegeId)) {
      return res.status(400).send({ status: false, msg: "Email is required" })
    }

    if (!isvalid(mobile)) {
      return res.status(400).send({ status: false, msg: "Mobile Number is required" })
    }


    if (mobile.length != 10 || mobile[0] == "0") {
      return res.status(400).send({ status: false, msg: "Enter the Valid Number" })
    }


    let validEmailFormat = await validator.validate(email);
    if (!validEmailFormat) {
      return res.status(400).send({ status: false, msg: "Invalid Email" });
    }


    let validEmail = await studentModel.findOne({ email });
    if (validEmail) {
      return res.status(409).send({ status: false, msg: "Email Alrady Exist" });
    }



    let validNumber = await studentModel.findOne({ mobile: mobile });
    if (validNumber) {
      return res.status(409).send({ status: false, msg: "Mobile Number Alrady Exist" });
    }


    let validCollege = await collegeModel.findById(collegeId)

    if (!validCollege) {
      return res.status(404).send({ status: false, msg: "College Does Not Exists" })
    }

    let StudentData = await studentModel.create(req.body)


    return res.status(201).send({ status: true, data: StudentData })
  } catch (err) {
    return res.status(500).send({ err: err.message })

  }
}

let collegeDetails = async function (req, res) {
  try {
    let collegeName = req.query.name;
     if(!collegeName){
      return res.status(400).send({ status: false, msg: "Enter College Name" })
     }

    let collegeFind = await collegeModel.findOne({ name: collegeName })

    if (!collegeFind) {
      return res.status(400).send({ status: false, msg: "College Name is invalid" })
    }

    if (collegeFind.isDeleted == true) {
      return res.status(404).send({ status: false, msg: "College is not Exist" })
    }
    let StudentData = await studentModel.find({ $and: [{ collegeId: collegeFind._id }, { isDeleted: false }] })

    let studentDatabyCollege = {
      name: collegeFind.name,
      fullName: collegeFind.fullName,
      logoLink: collegeFind.logoLink,
      interests: (StudentData.length != 0) ? StudentData : "No One Student"



    }

    return res.status(200).send({ status: true, data: studentDatabyCollege })
  } catch (err) {
    return res.status(500).send({ err: err })

  }

}




module.exports = { createStudent, collegeDetails }