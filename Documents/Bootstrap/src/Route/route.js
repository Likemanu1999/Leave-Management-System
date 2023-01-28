const express = require("express")
const router = express.Router()
const EmployessController = require("../Controllers/EmployeeController")
const HrControllers = require("../Controllers/HrControllers")
const leaveController = require("../Controllers/LeaveControllers")
const {authentication, authorisation} = require ("../middlerware/middleware")

// <-----------Hr register----------------->
router.post("/HrCreate",HrControllers.createHr)
router.post("/Hrlogin",HrControllers.loginHr)

// <-----------Employess register----------------->
router.post("/register",authentication, authorisation, EmployessController.createEmployess)
router.get("/getEmployess",authentication, authorisation,EmployessController.getEmployess)
router.post("/addEmployess",authentication, authorisation,EmployessController.addEmployess)
router.delete("/removeEmployess/:employessId",authentication, authorisation, EmployessController.RemoveEmployess)
router.put("/updateEmployess/:employessId")

// <-----------Employess Leave request----------------->
router.post("/leaveRequest",authentication, authorisation,leaveController.createLeave)

// <-----------No Page Found----------------->
 router.all('*', (req, res) => {res.status(404).send({status : false, message:"No Page Found !!"})})

module.exports=router