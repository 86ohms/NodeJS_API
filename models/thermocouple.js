const mongoose = require('mongoose')

const thermocoupleSchema = new mongoose.Schema({
    
    _id: {
        type: Number,
        required: true,
        default: 1
    },

    temp: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true,     
    },
    sp1_time: {
        type: Number,
        required: false,
        default: 1,     
    },
    sp1_temp: {
        type: Number,
        required: false,
        default: 23,     
    },
    sp2_time: {
        type: Number,
        required: false,
        default: -1,     
    },
    sp2_temp: {
        type: Number,
        required: false,
        default: -256,     
    },
    sp3_time: {
        type: Number,
        required: false,
        default: -1,     
    },
    sp3_temp: {
        type: Number,
        required: false,
        default: -256,     
    },
    performdate: {
        type: Date,
        required: true,
        default: Date.now     
    }

})
  
// args are database name and database schema
module.exports = mongoose.model('Thermocouple', thermocoupleSchema)