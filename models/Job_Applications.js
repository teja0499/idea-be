const { Types } = require('mongoose');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const JobApplicationSchema=new Schema({
    category:{
        // type: Schema.Types.ObjectId, 
        // ref: 'JobCategorie'
        type:String,

    },
    candidate:{
       type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    candidate_Name:{
        type:String 
     },
     candidate_Skills:{
        type: [String],
        required: true,
     },
     candidate_salary:{
        type:Number
     },
     candidate_Experience:{
        type: Number,
        // required: true,
     },
     candidate_description:{
        type: String,
        // required: true,
     },
    job: {
       type: Schema.Types.ObjectId, 
        ref: 'Job'
    },
    title:{
        type:String,
        
    },
    status: {
        type: String,
        enum: ['reject', 'pending', 'select'],
        default: 'pending'
    },
    reason:{
        type: String,
        default: ""
    },
    AtsScore:{
        type:Number,
    },

})

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);

module.exports = JobApplication;