const express = require('express');
const router = express.Router();

const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")



router.post("/createAuthor", collegeController.createCollege)

router.post("/createBlog", internController.createInternData)



router.get("/blogs", collegeController.collegeDetails)



module.exports = router;