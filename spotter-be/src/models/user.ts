import { NextFunction } from "connect";
import mongoose, { Schema } from "mongoose";
import * as bcrypt from "bcryptjs";
import { genToken } from "../utils/tokens";
import { IUser } from "src/types/models";
// User model

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Please add an email"],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: [6, "Password needs to be at least 6 characters"],
    select: false
  },
  role: {
    type: String,
    enum: ["user"],
    default: "user"
  },
  created: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password on save
UserSchema.pre<IUser>("save", async function(next: NextFunction) {
  if (!this.isModified("password")) {
    next();
  }
  const salt: string = await bcrypt.genSalt(10);
  const newPassword: string = await bcrypt.hash(this.password, salt);
  this.password = newPassword;
});

// Sign token and return
UserSchema.methods.getToken = function(): string {
  return genToken(
    this._id,
    process.env.JWT_SECRET!,
    process.env.JWT_EXPIRE as any
  );
};

// Match password on login
UserSchema.methods.matchPassword = async function(
  pw: string
): Promise<boolean> {
  return await bcrypt.compare(pw, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
