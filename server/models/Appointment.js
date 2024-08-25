import { model, Schema } from "mongoose";
const apppointmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    apppointmentReason: {
      type: String,
      default: "Regular Checkup",
    },
    appointmentDate: {
      type: Date,
      default: Date.now,
    },
    appointmentType: {
      type: String,
      enum: ["Regular Checkup", "Rotunie Checkup", "Emergency"],
      default: "Regular Checkup",
    },
    appointmentStatus: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },
    completedAt: {
      type: Date,
    },
    cancelledAt: {
      type: Date,
    },
    notes : {
        type: String,
    }
  },
  {
    timestamps: true,
  }
);
const Appointment = model("Appoinment", apppointmentSchema);
export default Appointment