const EmployessModel = require("../model/EmployessModel");
const hrModel = require("../model/HrModel");
const LeaveModel = require("../model/LeaveModel")

const createLeave = async function (req,res){
    try{
        let data = req.body
           let leaveRequest = await LeaveModel.create(data);
        res.status(201).send({ status: true, message: "Employee successfully created", data: leaveRequest })
        console.log(leaveRequest)

    }
    catch (error) {
        res.status(500).send({ status: false, message: "error", err: error.message })
      }
}

module.exports = { createLeave }