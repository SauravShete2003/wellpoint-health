import { Schema, model } from "mongoose";
const doctorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    opdTimings: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Doctor = model ('Doctor' , doctorSchema)
export default Doctor
