import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  // check if user exist// create him if not exist//return to callin client

  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user " });
  }
};

//beging user update

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const {
      fullname,
      gender,
      address,
      data_of_birth,
      zip_postal_code,
      passport_number,
      passport_issued_date,
      name_as_it_appear_in_passport,
      passport_expiration_date,
      nationality,
      current_job,
      phone_numbers,
      emergency_contact,
      skills_details,
      experience_details,
      previous_un_missions,
    } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.fullname = fullname;
    user.gender = gender;
    user.address = address;
    user.data_of_birth = data_of_birth;
      user.zip_postal_code = zip_postal_code;
      user.passport_number = passport_number;
      user.passport_issued_date = passport_issued_date;
      user.name_as_it_appear_in_passport = name_as_it_appear_in_passport;
      user.passport_expiration_date = passport_expiration_date;
      user.nationality = nationality;
      user.current_job = current_job;
      user.phone_numbers = phone_numbers;
      user.emergency_contact = emergency_contact;
      user.skills_details = skills_details;
      user.experience_details = experience_details;
      user.previous_un_missions = previous_un_missions;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
