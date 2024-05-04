import * as mongoose from 'mongoose';

// Updated Mongoose schema with activation fields
export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  isActivated: { type: Boolean, default: false },
  activationToken: { type: String, required: false },
});

// Updated TypeScript interface to include new fields
export interface User extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  username: string;
  isActivated: boolean;
  activationToken?: string;
}

// Keep the same model registration
export const UserModel = mongoose.model<User>('User', UserSchema, 'Users');
