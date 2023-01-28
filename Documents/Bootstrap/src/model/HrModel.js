const mongoose = require("mongoose");

const HrSchema = new mongoose.Schema({
    HR:{
        type:String,
        require:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength : 8,
        maxlength : 15,
        trim:true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Hr', HrSchema) //Hrs