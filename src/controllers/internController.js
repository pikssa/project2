const internModel = require("../models/internModel")
const collegeModel = require("../models/collegeModel")
const validator = require("email-validator");





const createInternData = async function (req, res) {
  try {
    let internData = req.body

    if (!internData.name) { return res.status(400).send({ status: false, message: "name is required" }) }

    if (!internData.email) { return res.status(400).send({ status: false, message: "email is required" }) }

    if (!internData.collegeId) { return res.status(400).send({ status: false, message: "collegeId is required" }) }

    if (!internData.mobile) { return res.status(400).send({ status: false, message: " mobile number is required" }) }


    if (typeof (internData.name) !== "string" || internData.name.trim().length == 0) { return res.status(400).send({ status: false, message: "name is not valid" }) }


    let pattern1 = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/

    if (!pattern1.test(internData.email)) { return res.status(400).send({ status: false, message: "email is not valid" }) }

    let validName = await internModel.findOne({ email: internData.email })

    if (validName) {
      return res.status(409).send({ status: false, msg: ` email Already Exists` });
    }

    let check = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[0-9]\d{9}$/


    if (!check.test(internData.mobile)) { return res.status(400).send({ status: false, message: "mobile number is not valid" }) }

    let validNumber = await internModel.findOne({ mobile: internData.mobile })

    if (validNumber) {
      return res.status(409).send({ status: false, msg: ` mobile number Already Exists` });
    }

    let Id = internData.collegeId

    let pattern = /^[0-9A-Fa-f]{24}$/

    if (!pattern.test(Id)) { return res.status(400).send({ status: false, message: "collegeId is not valid" }) }

    let college = await collegeModel.findOne({ _id: Id })

    if (college == null) { return res.status(400).send({ status: false, message: "college is not persent" }) }


    let internCreated = await internModel.create(internData)
    res.status(201).send({ status: true, data: internCreated })
  } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }



}

module.exports.createInternData = createInternData



