import React, { useState } from "react";

function AdmissionForm() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    course: "Computer Science and Engineering",
    marks: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    dob: false,
    marks: false,
    email: false,
    phone: false,
  });

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        return value.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(value);
      case "dob":
        if (!value) return false;
        const dobDate = new Date(value);
        const today = new Date();
        return dobDate < today;
      case "marks":
        if (value === "") return false;
        const num = parseFloat(value);
        return !isNaN(num) && num >= 0 && num <= 100;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value.trim());
      case "phone":
        // Optional field: valid if empty OR if it has exactly 10 digits
        return value.trim() === "" || /^[0-9]{10}$/.test(value.trim());
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation
    const isValid = validateField(name, value);
    setErrors((prevErr) => ({ ...prevErr, [name]: !isValid }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameValid = validateField("name", formData.name);
    const dobValid = validateField("dob", formData.dob);
    const marksValid = validateField("marks", formData.marks);
    const emailValid = validateField("email", formData.email);
    const phoneValid = validateField("phone", formData.phone);

    setErrors({
      name: !nameValid,
      dob: !dobValid,
      marks: !marksValid,
      email: !emailValid,
      phone: !phoneValid,
    });

    if (nameValid && dobValid && marksValid && emailValid && phoneValid) {
      // Store application data in local storage as a list
      let existingApps = [];
      try {
        const parsed = JSON.parse(localStorage.getItem("admissionApplications"));
        if (Array.isArray(parsed)) {
          existingApps = parsed;
        }
      } catch (err) {
        console.error("Error reading admission applications from localStorage:", err);
      }

      existingApps.push(formData);
      localStorage.setItem("admissionApplications", JSON.stringify(existingApps));

      // Keep single record for backward compatibility
      localStorage.setItem("admissionApplication", JSON.stringify(formData));

      alert("Admission Application Submitted Successfully!");
      console.log("Submitted Admission Data:", formData);

      // Reset form
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      dob: "",
      course: "Computer Science and Engineering",
      marks: "",
      email: "",
      phone: "",
    });
    setErrors({
      name: false,
      dob: false,
      marks: false,
      email: false,
      phone: false,
    });
  };

  return (
    <main className="container my-5 flex-grow-1 animate__animated animate__fadeIn">
      <div className="text-center mb-5">
        <h2 className="text-danger fw-bold display-5">Admission Application Form</h2>
        <p className="text-secondary fs-5">Apply online for academic enrollment at DCET. Fill out all sections below.</p>
        <div className="bg-warning mx-auto" style={{ width: "80px", height: "4px" }}></div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          {/* Card with Targaryen-style yellow/gold top border */}
          <div className="card bg-white border-0 border-top border-warning border-5 shadow-sm p-4">
            <div className="card-body">
              <h4 className="text-danger fw-bold mb-4 border-bottom border-warning border-2 pb-2">
                New Admission Form
              </h4>

              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-semibold text-secondary">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`form-control border-secondary-subtle ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a valid full name (minimum 3 characters, letters only).
                  </div>
                </div>

                <div className="row">
                  {/* Date of Birth */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="dob" className="form-label fw-semibold text-secondary">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className={`form-control border-secondary-subtle ${errors.dob ? "is-invalid" : ""}`}
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid date of birth (must be in the past).
                    </div>
                  </div>

                  {/* Course select */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="course" className="form-label fw-semibold text-secondary">
                      Course Applying For
                    </label>
                    <select
                      className="form-select border-secondary-subtle"
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                    >
                      <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Electronics and Communication">Electronics and Communication</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  {/* Previous percentage */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="marks" className="form-label fw-semibold text-secondary">
                      Previous Percentage (10+2 / Diploma)
                    </label>
                    <input
                      type="number"
                      className={`form-control border-secondary-subtle ${errors.marks ? "is-invalid" : ""}`}
                      id="marks"
                      name="marks"
                      min="0"
                      max="100"
                      placeholder="e.g. 85"
                      value={formData.marks}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid percentage between 0 and 100.
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label fw-semibold text-secondary">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className={`form-control border-secondary-subtle ${errors.email ? "is-invalid" : ""}`}
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address.
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label htmlFor="phone" className="form-label fw-semibold text-secondary">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className={`form-control border-secondary-subtle ${errors.phone ? "is-invalid" : ""}`}
                    id="phone"
                    name="phone"
                    placeholder="Enter contact number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid 10-digit phone number.
                  </div>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-danger btn-crimson px-4 text-white fw-bold bg-danger border-0"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-outline-secondary px-4 fw-semibold"
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default AdmissionForm;
