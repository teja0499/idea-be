const JobCategory=require('../models/JobCategory')

const add_Category = async (JobCategoryData) => {
    const jobCat = await JobCategory.findOne({'category':JobCategoryData.category});
    if (jobCat) {
        throw new Error('Job category already exists');
    }
    
    const newJobCategory = await JobCategory.create(JobCategoryData);
    return newJobCategory;
}

const getJobCategorie = async () => {
    const jobCat = await JobCategory.find()
    return jobCat;
}

const removeJobCategorie = async (id) => {
    const jobCat = await JobCategory.findByIdAndDelete(id)
}




module.exports={add_Category,getJobCategorie,removeJobCategorie}