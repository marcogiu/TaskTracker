import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const generateToken = (_id: string) => {
  return jwt.sign({ _id }, config.jwtSecret, {
    expiresIn: "3d",
  });
};
