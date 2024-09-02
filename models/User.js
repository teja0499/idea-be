const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  mobileNumber: {
    type: String,
    unique: true,
    required: true
  },
  JobToBeApplied: {
    // type: [String],
    // required: false
    type: [Schema.Types.ObjectId], 
    ref: 'Job', 
    // required: true
  },
  password: {
    type: String,
    required: true
  },
  otp:{
    type:Number
  }
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
