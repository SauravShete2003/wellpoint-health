import Appointment from "../models/Appointment.js";

const postAppointment = async (req, res) => {
  const {
    user,
    doctor,
    appointmentReason,
    appointmentDate,
    appointmentType,
    appointmentStatus,
    notes,
  } = req.body;

  if (!user || !doctor || !appointmentReason || !appointmentDate) {
    return res.status(400).json({
      message: "Missing required fields",
      success: false,
    });
  }

  const appointment = new Appointment({
    user,
    doctor,
    appointmentReason,
    appointmentDate,
    appointmentType,
    appointmentStatus,
    notes,
  });

  try {
    const savedAppointment = await appointment.save();
    res.status(201).json({
      message: "Appointment created successfully",
      success: true,
      data: savedAppointment,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error while creating appointment",
      success: false,
      error: err.message,
    });
  }
};

const getAppionment = async (req, res) => {
  const allAppionment = await Appointment.find();
  res.json({
    message: "all appiontment fetched successfully",
    success: true,
    data: allAppionment,
  });
};

export { postAppointment, getAppionment };
