import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !"username" ||
    !"email" ||
    !"password" ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, 'All fields are required!'));
  }

  //usiamo npm i bcryptjs package per creare hashed password, cosi non nessuno può avere a disposizione il password ne anche admin.
  const hashedPassword = bcryptjs.hashSync(password, 10); // metodo per creare hashed password

  const newUser = new User({
    username,
    email,
    password: hashedPassword, // ora il password è un hashed password
  });
  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (error) {
    next(error);
  }
};


//1:49