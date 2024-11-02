import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
  },
  gender: { type: String },
  address: { type: String },
  data_of_birth: { type: String },
  zip_postal_code: { type: String },
  passport_number: { type: String },
  passport_issued_date: { type: String },
  name_as_it_appear_in_passport: { type: String },
  passport_expiration_date: { type: String },
  nationality: { type: String },
  current_job: { type: String },
  phone_numbers: { type: String },
  emergency_contact: { type: String },
  skills_details: { type: String },
  experience_details: { type: String },
  previous_un_missions: { type: String },
});

const User = mongoose.model("User", userSchema);

export default User;
