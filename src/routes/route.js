const express = require('express');
const router = express.Router();
const CollegeController = require("../controllers/collegeController")
const StudentController = require("../controllers/studentController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.post("/colleges", CollegeController.createrCollege)
router.post("/interns", StudentController.createStudent)
router.get("/collegeDetails", StudentController.collegeDetails)



module.exports = router;