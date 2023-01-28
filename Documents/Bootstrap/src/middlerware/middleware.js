const jwt = require('jsonwebtoken')
const EmployeeModel = require("../model/EmployessModel")
const validator = require("../validator/validator")
const mongoose = require('mongoose')

const authentication = async function (req, res, next) {
    try {
        let token = req.headers['x-api-key']

        if (!token) {
            return res.status(400).send({ status: false, message: "You are not LogIn Please logIn" })
        }
        let decodedToken = jwt.verify(token, "Smartgenesis")
        if (!decodedToken) {
            return res.status(400).send({ status: false, message: "Token valid failed" })
        }
        req.validHrId = decodedToken.HrId;
        next()
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const authorisation = async function (req, res, next) {
    try {

        let validHrId = req.validHrId
        let EmployessId = req.params.EmployessId
        let bodyData = req.body
        let queryData = req.query

        //  <--------Authorisation for Path Params And ReqBody--------->
        if ((Object.keys(req.body) != 0) || (Object.keys(req.params) != 0)) {
            if (req.body.HrId) {
                if (!validator.isValidObjectId(bodyData.HrId))
                    return res.status(400).send({ status: false, message: `This HrId (${bodyData.HrId}) is invalid !!` })

                if (bodyData.HrId != validHrId) {
                    return res.status(403).send({ status: false, message: "Hr is Not Authorised" })
                }
                return next();
            }

            if (req.params.EmployessId) {
                if (!validator.isValidObjectId(EmployessId))
                    return res.status(400).send({ status: false, message: `This EmployessId (${EmployessId}) is invalid !!` })

                let fetchEmployessData = await EmployeeModel.findById(EmployessId);

                if (fetchEmployessData == null) {
                    return res.status(404).send({ status: false, message: `No Book Found With This (${EmployessId})` })
                }

                if (fetchEmployessData.HrId != validHrId) {
                    return res.status(403).send({ status: false, message: "Sorry U are not Authorised !!" })
                }
                return next()
            }
        }
        return next();
    }
    catch (error) {

        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { authentication, authorisation }

