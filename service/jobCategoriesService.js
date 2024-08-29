const JobCategory=require('../models/JobCategory')

const createJobCategorie = async (JobCategoryData) => {
    const jobCat = await JobCategory.findOne({'category':JobCategoryData.category});
    if (jobCat) {
        throw new Error('Job category already exists');
    }
    
    const newJobCategory = await JobCategory.create(JobCategoryData);
    return newJobCategory;
}


module.exports={createJobCategorie}