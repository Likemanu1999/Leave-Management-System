'use strict';
const HrModel = require("../model/HrModel");
const jwt = require("jsonwebtoken");
const validator = require("../validator/validator");
const vm = require("v-response");

const createHr = async function (req, res) {
    try {
        let requestbody = req.body
        // BODY VALIDATION
        if (!validator.isValidRequestbody(requestbody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, Please provide user details" })
        }

        // EMAIL VALIDATION
        if (!validator.isValidField(requestbody.email)) {
            return res.status(400).send({ status: false, message: "email is required" })
        }
        const isEmailAlreadyUsed = await HrModel.findOne({ email: requestbody.email });
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${requestbody.email} email is already registered` })
        }

        // PASSWORD VALIDATION
        if (!validator.isValidField(requestbody.password)) {
            return res.status(400).send({ status: false, message: 'password is required' })
        }

        if (!(requestbody.password.length >= 8 && requestbody.password.length <= 15)) {
            return res.status(400).send({ status: false, message: 'password length should be greter then 8 and less than 15' })
        }
        let HrSaved = await HrModel.create(requestbody);
        res.status(201).send({ status: true, message: "Hr successfully created", data: HrSaved });

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

const loginHr = async function(req,res){
    try{
        let requestBody = req.body
        let { email, password } = requestBody

        let validHr = await HrModel.findOne({ email: requestBody.email, password: requestBody.password });
        if (validHr == null) {
            return res.status(401).send({ status: false, message: "Email or Password is not correct" })
        }
     
        let payload = { HrId: validHr._id, exp: Math.floor(Date.now() / 1000) + (100 * 60), iat: (Date.now() / 1000) }
        let token = jwt.sign(payload, 'Smartgenesis')
        res.setHeader('x-api-key', token);
        res.status(200).send({ status: true, message: "Hr logged in successfully", data: { token, HrId : validHr._id, exp: payload.exp, iat: payload.iat } })

    }  catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createHr, loginHr }
