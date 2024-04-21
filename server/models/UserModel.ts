import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface User extends Document {
  email: string;
  password: string;
  generateAuthToken: () => string;
  isValidPassword: (password: string) => Promise<boolean>; // Definizione del metodo
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Metodo per generare il token JWT per l'utente
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET as string
  );
  return token;
};

// Metodo per verificare la password
userSchema.methods.isValidPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<User>("User", userSchema);
