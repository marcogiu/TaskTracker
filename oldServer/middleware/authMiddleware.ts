import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.body.user = user; // Aggiungi l'utente al corpo della richiesta
    next(); // Passa al prossimo middleware
  });
};

// Validation middleware for registration
export const registerValidation = [
  body("email").isEmail().withMessage("Enter a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

// Validation middleware for login
export const loginValidation = [
  body("email").isEmail().withMessage("Enter a valid email address"),
  body("password").exists().withMessage("Password is required"),
];
