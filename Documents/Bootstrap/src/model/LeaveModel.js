const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const leaveSchema = new mongoose.Schema({
    reason: {
        type: String
    },
    employessId: {
        type: ObjectId,
        ref: "employes",
        require : true
    },
}, {timestamps: true})


module.exports = mongoose.model('Leave', leaveSchema) //Hrs