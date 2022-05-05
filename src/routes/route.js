const express = require('express');
const router = express.Router();

const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")



router.post('/functionup/interns',internController.createInternData)

router.post("/functionup/colleges",collegeController.createCollege)

router.get("/functionup/collegeDetails",collegeController.collegeDetails)



module.exports = router;