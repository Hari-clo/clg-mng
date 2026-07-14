import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    fname: "",
    email: "",
    phone: "",
    role: "Student",
    dept: "",
    pass: "",
    cpass: "",
  });

  const [errors, setErrors] = useState({
    fname: false,
    email: false,
    phone: false,
    dept: false,
    pass: false,
    cpass: false,
  });

  const validateField = (name, value, currentFormData = formData) => {
    switch (name) {
      case "fname":
        return value.trim().length >= 3;
      case "email": {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(value.trim());
      }
      case "phone":
        return value.trim() === "" || /^[0-9]{10}$/.test(value.trim());
      case "dept":
        return value.trim() !== "";
      case "pass":
        return value.trim().length >= 6;
      case "cpass":
        return value === currentFormData.pass && value.trim() !== "";
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (name !== "role") {
        const isValid = validateField(name, value, updated);
        setErrors((prevErr) => ({ ...prevErr, [name]: !isValid }));
      }

      // If password changes, re-validate confirm password if it's not empty
      if (name === "pass" && prev.cpass !== "") {
        const isCpassValid = validateField("cpass", prev.cpass, updated);
        setErrors((prevErr) => ({ ...prevErr, cpass: !isCpassValid }));
      }

      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validFname = validateField("fname", formData.fname);
    const validEmail = validateField("email", formData.email);
    const validPhone = validateField("phone", formData.phone);
    const validDept = validateField("dept", formData.dept);
    const validPass = validateField("pass", formData.pass);
    const validCpass = validateField("cpass", formData.cpass);

    setErrors({
      fname: !validFname,
      email: !validEmail,
      phone: !validPhone,
      dept: !validDept,
      pass: !validPass,
      cpass: !validCpass,
    });

    if (validFname && validEmail && validPhone && validDept && validPass && validCpass) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = existingUsers.some(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase()
      );

      if (userExists) {
        alert("A user with this email is already registered!");
        setErrors((prevErr) => ({ ...prevErr, email: true }));
        return;
      }

      existingUsers.push(formData);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      alert("Registration Successful!");
      console.log("Registered User details:", formData);
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      fname: "",
      email: "",
      phone: "",
      role: "Student",
      dept: "",
      pass: "",
      cpass: "",
    });
    setErrors({
      fname: false,
      email: false,
      phone: false,
      dept: false,
      pass: false,
      cpass: false,
    });
  };

  return (
    <main className="container my-5 flex-grow-1 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card bg-white border-0 border-top border-warning border-5 shadow p-4">
            <div className="card-body">
              
              <div className="text-center mb-4">
                <h2 className="text-danger fw-bold mb-1">Create Your New Account</h2>
                <p className="text-secondary small">Fill in the fields below to register on the DCET Portal</p>
                <div className="bg-warning mx-auto" style={{ width: "50px", height: "3px" }}></div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="mb-3">
                  <label htmlFor="fname" className="form-label fw-semibold text-secondary">Full Name</label>
                  <input
                    type="text"
                    className={`form-control border-secondary-subtle ${errors.fname ? "is-invalid" : ""}`}
                    id="fname"
                    name="fname"
                    placeholder="Enter your full name"
                    value={formData.fname}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback" id="fnameError">
                    Please enter your full name (minimum 3 characters).
                  </div>
                </div>

                <div className="row">
                  {/* Email Address */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label fw-semibold text-secondary">Email Address</label>
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
                    <div className="invalid-feedback" id="emailError">
                      Please enter a valid email address.
                    </div>
                  </div>
                  
                  {/* Phone Number */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="phone" className="form-label fw-semibold text-secondary">Phone Number</label>
                    <input
                      type="tel"
                      className={`form-control border-secondary-subtle ${errors.phone ? "is-invalid" : ""}`}
                      id="phone"
                      name="phone"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <div className="invalid-feedback" id="phoneError">
                      Please enter a valid 10 digit phone number.
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Register As */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="role" className="form-label fw-semibold text-secondary">Register As</label>
                    <select
                      className="form-select border-secondary-subtle"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="Student">Student</option>
                      <option value="Faculty">Faculty</option>
                    </select>
                  </div>
                  
                  {/* Department */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="dept" className="form-label fw-semibold text-secondary">Department</label>
                    <input
                      type="text"
                      className={`form-control border-secondary-subtle ${errors.dept ? "is-invalid" : ""}`}
                      id="dept"
                      name="dept"
                      placeholder="e.g. CSE, IT, ECE"
                      value={formData.dept}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback" id="deptError">
                      Please enter your department.
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* Create Password */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="pass" className="form-label fw-semibold text-secondary">Create Password</label>
                    <input
                      type="password"
                      className={`form-control border-secondary-subtle ${errors.pass ? "is-invalid" : ""}`}
                      id="pass"
                      name="pass"
                      placeholder="Create password"
                      value={formData.pass}
                      onChange={handleChange}
                      required
                      minLength="6"
                    />
                    <div className="invalid-feedback" id="passError">
                      Password must be at least 6 characters.
                    </div>
                  </div>
                  
                  {/* Confirm Password */}
                  <div className="col-md-6 mb-4">
                    <label htmlFor="cpass" className="form-label fw-semibold text-secondary">Confirm Password</label>
                    <input
                      type="password"
                      className={`form-control border-secondary-subtle ${errors.cpass ? "is-invalid" : ""}`}
                      id="cpass"
                      name="cpass"
                      placeholder="Confirm password"
                      value={formData.cpass}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback" id="cpassError">
                      Passwords do not match.
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-danger btn-crimson text-white fw-bold bg-danger border-0">
                    Register
                  </button>
                  <button type="button" onClick={handleReset} className="btn btn-outline-secondary btn-sm">
                    Clear Form
                  </button>
                </div>
              </form>

              <div className="text-center mt-4 border-top pt-3 border-light">
                <p className="mb-0 text-secondary small fw-semibold">
                  Already registered?{" "}
                  <Link to="/login" className="text-danger fw-bold text-decoration-none">
                    Login here
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;