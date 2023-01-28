const mongoose = require('mongoose')

const isValidField = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true
}

const isValidRequestbody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}
const isValidEmail = function (email) {
    return (/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email.trim()))
}

const isValidPassword = function (password) {
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/.test(password))
}

module.exports = { isValidField , isValidObjectId, isValidRequestbody, isValidEmail ,isValidPassword }


