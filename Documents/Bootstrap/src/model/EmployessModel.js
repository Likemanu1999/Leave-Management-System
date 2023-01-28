const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const EmployessSchema = new mongoose.Schema({
    HrId: {
        type : ObjectId,
        required : true,
        ref : 'Hr'
    },
     employee_fullname:{
        type: String,
        required: true,
        trim:true
    },
    manager_fullname:{
        type:String,
        required: true,
        trim:true
    },
    employee_salary:{
        type: Number,
        required: true,
        trim:true
    },
    manager_salary:{
        type: Number,
        required: true,
        trim:true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});
module.exports = mongoose.model('employes', EmployessSchema)