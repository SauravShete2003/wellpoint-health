import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import {
  postSignup,
  postLogin,
  getUser,
  checkJWT,
  getUserAppionment,
} from "./controllers/user.js";

import { postDoctor, getDoctor  ,   getDoctorAppointment,} from "./controllers/doctor.js";

import {
  getAppionment,
  postAppointment,
} from "./controllers/appointment.js";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

(async () => {
  const conn = await mongoose.connect(MONGO_URL);

  if (conn) {
    console.log("MongoDB connected ✅");
  }
})();

app.post("/signup", postSignup);
app.post("/login", postLogin);
app.post("/appoinments", postAppointment);
app.post("/doctors", postDoctor);
app.get("/doctorappionments/:doctorId", getDoctorAppointment);
app.get("/users", getUser);
app.get("/doctors", getDoctor);
app.get("/appointments", getAppionment);
app.get("/userappoinments/:userId",checkJWT , getUserAppionment);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
