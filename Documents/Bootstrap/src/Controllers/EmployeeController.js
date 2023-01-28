'use strict';
const EmployessModel = require("../model/EmployessModel");
const hrModel = require("../model/HrModel");
const validator = require("../validator/validator");

const createEmployess = async function (req, res) {
    try {
        let requestbody = req.body
        let EmployeeSaved = await EmployessModel.create(requestbody);
        res.status(201).send({ status: true, message: "Employee successfully created", data: EmployeeSaved });
    }
       catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const getEmployess = async function (req, res) {
    try {
        let EmploessCard = await EmployessModel.find();  //DB Call get api
        res.status(201).send({ status: true, message: "Employee All data", data: EmploessCard });
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const addEmployess = async function (req,res){
try{
    let requestbody = req.body
    let { Input_HrId,Input_employee_fullname, Input_manager_fullname ,Input_employee_salary , Input_manager_salary } = requestbody;

   requestbody.push({ Input_HrId:HrId,Input_employee_fullname: employee_fullname, Input_manager_fullname : manager_fullname ,  Input_employee_salary: employee_salary , Input_manager_salary: manager_salary}) 
    const addEmp = await EmployessModel.create(requestbody)
    res.status(201).send({ status: true, data: addEmp });
}
    catch(error){
        res.status(500).send({ status: false, message: error.message });
    }
}

const RemoveEmployess = async function (req,res){
  try{
      let employessId = req.params.employessId;
      let deleteEmployess = await EmployessModel.findOneAndDelete(employessId, req.body);   // DB call
      res.send(deleteEmployess);
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

const updateEmployess= async function (req,res){
    try{
       let employessId = req.params.employessId
       let requestbody = req.body
       let { employee_fullname , manager_fullname , employee_salary , manager_salary} = requestbody

       const updateData = await EmployessModel.findByIdAndUpdate(employessId, req.body)
       return res.status(200).send({ status : true , message: "Success" , data : updateData })
     
    }  catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = { createEmployess , getEmployess , addEmployess , RemoveEmployess , updateEmployess }