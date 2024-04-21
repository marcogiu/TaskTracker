import { Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(email, hashedPassword);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ error: "User not exist" });
    }
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res
        .status(401)
        .send({ error: `Invalid password from ${user.email}` });
    }
    const token = user.generateAuthToken();
    res.send({ message: "Login successfully", token });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
};
