import Doctor from "./../models/Doctor.js";

const postDoctor = async (req, res) => {
  const { name, description, speciality, opdTimings } = req.body;
  const doctor = new Doctor({
    name,
    description,
    speciality,
    opdTimings,
  });
  try {
    const savedDoctor = doctor.save();
    res.json({
      message: "Doctor Added Successfully",
      success: true,
      data: savedDoctor,
    });
  } catch (err) {
    res.json({
      message: "Error Occured",
      success: false,
      data: err,
    });
  }
};

const getDoctor = async (req, res) => {
  const doctor = await Doctor.find();
  try {
    res.json({
      success : true,
      message: "Doctor found successfully",
      success: doctor,
    });
  } catch (err) {
    res.json({
      message: "Error Occured",
      success: false,
      data: err.message,
    });
  }
};
const getDoctorAppointment = async (req, res) => {
  const doctorId = req.params.doctorId;

  try {
    const doctorAppointments = await Appointment.find({ doctor: doctorId });

    if (doctorAppointments) {
      res.status(200).json({
        message: "Doctor appointments fetched successfully",
        success: true,
        data: doctorAppointments,
      });
    }
  } catch (err) {
    console.error("Error while fetching doctor appointments:", err);
    res.status(500).json({
      message: "Error while fetching doctor appointments",
      success: false,
      error: err.message,
    });
  }
};

export { postDoctor , getDoctor , getDoctorAppointment};
