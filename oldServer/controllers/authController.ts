import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken";
import User from "../models/UserModel";
import bcrypt from "bcrypt";

export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const loginUser = await User.findOne({ email });

  if (loginUser && (await loginUser.com(password))) {
    const token = generateToken(loginUser._id);

    res.status(201).json({
      _id: loginUser._id,
      name: loginUser.,
      email: loginUser.email,
      token,
    });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).send({ error: "Unable to register user." });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "User does not exist." });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send({ error: "Invalid password." });
    }
    const token = user.generateAuthToken();
    res.send({ message: "Login successfully", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).send({ error: "Login failed." });
  }
};
