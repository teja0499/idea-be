const { Types } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const JobSchema = new Schema({
    category: {
        //     type: Schema.Types.ObjectId, 
        //     ref: 'JobCategorie'
        type: String,
        required: true
    },
    type: {
        type: String,
        default:'fulltime'
        // required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true,
    },
    experience: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        require: true
    },
    customFields: {
        type: Map,
        of: Schema.Types.Mixed, 
        default: {}
    }
})


const Job = mongoose.model('Job', JobSchema);

module.exports = Job;