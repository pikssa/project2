// const authorModel = require("../models/authorModel")
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

const valid = function (value) {

    if (typeof value !== "string" || value.trim().length == 0) { return false }
    return true
}

const createCollege = async function (req, res) {
    try {
        let college = req.body
        if (!college.name) { return res.status(400).send({ status: false, message: "name is required" }) }

        if (!college.fullName) { return res.status(400).send({ status: false, message: "fullName is required" }) }

        if (!college.logoLink) { return res.status(400).send({ status: false, message: "logoLink is required" }) }

        if (!valid(college.name)) { return res.status(400).send({ status: false, message: "name is invalid" }) }


        if (!valid(college.fullName)) { return res.status(400).send({ status: false, message: "fullName is not valid" }) }

        let check1 = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))$/
        if (!check1.test(college.logoLink)) { return res.status(400).send({ status: false, message: "logoLink must is not valid " }) }

        else {
            let collegeCreated = await collegeModel.create(author)
            res.status(201).send({ status: true, data: collegeCreated })
        }
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}



const collegeDetails = async function (req, res) {

    try {
        let Name = req.query.name
        if (!Name) { return res.status(400).send({ status: false, message: "Name is required" }) }


        let collegeDetail = await collegeModel.findOne({ name: Name, isDeleted: false })

        if (!collegeDetail.length) { res.status(404).send({ status: false, msg: "collegeDetail not found" }) }

        let id = collegeDetail._id.toString()
        let check2 = await internModel.find({ collegeId: id })

        let obj = {
            "name": collegeDetail.name,
            "fullName": collegeDetail.fullName,
            "logoLink": collegeDetail.logoLink,
            "interests": check2
        }


        res.status(200).send({ status: true, data: obj })

    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }

}






module.exports.createCollege = createCollege

module.exports.collegeDetails = collegeDetails


