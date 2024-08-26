import Doctor from "./../models/Doctor.js";

const postSignup = async (req, res) => {
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

export{postSignup}