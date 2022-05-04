const express = require('express');
const router = express.Router();

const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")



router.post('/create',internController.createInternData)

router.post("/college",collegeController.createCollege)

router.get("/data",collegeController.collegeDetails)



module.exports = router;