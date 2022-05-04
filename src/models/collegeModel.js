const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

//name: { mandatory, unique, example iith }, fullName: { mandatory, example`Indian Institute of Technology, Hyderabad` }, logoLink: { mandatory }, isDeleted: { boolean, default: false } }
const ObjectId = mongoose.Schema.Types.ObjectId
const CollegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    logoLink: {
        type: String,
        required: true,
        trim: true
    },
   isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


module.exports = mongoose.model('College', CollegeSchema)