// Importa le dipendenze necessarie
import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Interfaccia per il tipo UserDocument
interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  tasks: Schema.Types.ObjectId[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Definizione dello schema per il modello User
const userSchema: Schema<IUser> = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

// Middleware per criptare la password prima di salvare l'utente
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Metodo per verificare la password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Creazione del modello User con lo schema definito
const User = mongoose.model<IUser>("User", userSchema);

export default User;
