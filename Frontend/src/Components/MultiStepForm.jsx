import React, { useState } from "react";
import axios from "axios"; // ✅ Added
import "../Styles/MultiStepForm.css";

export default function MultiStepForm() {
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    regno: "",
    policy: "",
    bikePic: null,
    aadhar: null,
  });

   const API_URL = import.meta.env.VITE_API_URL;
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Prepare form data for file upload
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      // ✅ Send to backend
      const res = await axios.post(`${API_URL}/api/registrations`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Form submitted successfully!");
        setFormData({
      name: "",
      email: "",
      mobile: "",
      address: "",
      city: "",
      regno: "",
      policy: "",
      bikePic: null,
      aadhar: null,
    });

    // 🧽 Clear all file input values
    document.querySelectorAll('input[type="file"]').forEach((input) => (input.value = ""));

    // 🔁 Go back to first step (optional)
    setStep(0);

      console.log("Server response:", res.data);
    } catch (err) {
      console.error("❌ Error submitting form:", err);
      alert("Something went wrong. Please check your backend connection.");
    }
  };

  return (
    <div className="form-bg">
      <div className="form-container">
        <h2 className="form-title">🏍️ Bike Registration Form</h2>

        <div className="step-indicator">
          {["Contact", "Bike Info", "Uploads"].map((label, i) => (
            <div key={i} className={`step ${step === i ? "active-step" : ""}`}>
              {label}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1 */}
          {step === 0 && (
            <div className="form-step">
              <label>Full Name*</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />

              <label>Email*</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />

              <label>Mobile Number*</label>
              <input type="tel" name="mobile" pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} required />

              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} />

              <label>City*</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />

              <div className="button-group">
                <button type="button" className="next-btn" onClick={nextStep}>Next ➜</button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <div className="form-step">
              <label>Bike Registration Number*</label>
              <input type="text" name="regno" value={formData.regno} onChange={handleChange} required />

              <label>Policy Number</label>
              <input type="text" name="policy" value={formData.policy} onChange={handleChange} />

              <div className="button-group">
                <button type="button" className="back-btn" onClick={prevStep}>← Back</button>
                <button type="button" className="next-btn" onClick={nextStep}>Next ➜</button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 2 && (
            <div className="form-step">
              <label>Bike Picture*</label>
              <input type="file" name="bikePic" accept="image/*" onChange={handleChange} required />
              {formData.bikePic && (
                <img src={URL.createObjectURL(formData.bikePic)} alt="bike" className="preview" />
              )}

              <label>Aadhar Softcopy (image/PDF)*</label>
              <input type="file" name="aadhar" accept="image/*,application/pdf" onChange={handleChange} required />
              {formData.aadhar &&
                (formData.aadhar.type === "application/pdf" ? (
                  <p className="file-info">📄 {formData.aadhar.name} (PDF)</p>
                ) : (
                  <img src={URL.createObjectURL(formData.aadhar)} alt="aadhar" className="preview" />
                ))}

              <div className="button-group">
                <button type="button" className="back-btn" onClick={prevStep}>← Back</button>
                <button type="submit" className="submit-btn">✅ Submit</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
