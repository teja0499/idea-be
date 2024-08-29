
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const JobCategoriesSchema=new Schema({
    category:{
        type:String,
        required:true
    }
    
})


const JobCategory = mongoose.model('JobCategory', JobCategoriesSchema);

module.exports = JobCategory;