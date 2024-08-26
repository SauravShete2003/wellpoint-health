import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      unique : true
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ['male' , 'female' , 'other'],
      default : 'male'
    },

    role: {
      type: String,
      enum: ["admin", "doctor", "patient"],
      default: "patient",
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
