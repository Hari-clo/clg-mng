import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    utype: "Student",
    uid: "",
    pass: "",
    remember: false,
  });

  const [errors, setErrors] = useState({
    uid: false,
    pass: false,
  });

  const validateField = (name, value) => {
    switch (name) {
      case "uid":
        return value.trim() !== "";
      case "pass":
        return value.trim().length >= 6;
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: val }));

    if (name === "uid" || name === "pass") {
      const isValid = validateField(name, value);
      setErrors((prevErr) => ({ ...prevErr, [name]: !isValid }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const uidValid = validateField("uid", formData.uid);
    const passValid = validateField("pass", formData.pass);

    setErrors({
      uid: !uidValid,
      pass: !passValid,
    });

    if (uidValid && passValid) {
      // Retrieve registered users from LocalStorage
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

      // Check against registered users
      const user = existingUsers.find(
        (u) =>
          (u.email.toLowerCase() === formData.uid.toLowerCase() ||
            u.fname.toLowerCase() === formData.uid.toLowerCase()) &&
          u.pass === formData.pass &&
          u.role.toLowerCase() === formData.utype.toLowerCase()
      );

      // Check against mock users
      const isMockUser =
        (formData.uid.toLowerCase() === "admin" && formData.pass === "admin123" && formData.utype === "Admin") ||
        (formData.uid.toLowerCase() === "student" && formData.pass === "student123" && formData.utype === "Student") ||
        (formData.uid.toLowerCase() === "faculty" && formData.pass === "faculty123" && formData.utype === "Faculty");

      if (user || isMockUser) {
        const sessionUser = user
          ? { fname: user.fname, email: user.email, role: user.role, dept: user.dept }
          : { fname: formData.uid, email: `${formData.uid}@dcet.edu`, role: formData.utype, dept: "CSE" };

        localStorage.setItem("currentUser", JSON.stringify(sessionUser));
        alert(`Login Successful as ${formData.utype}!`);
        console.log("Logged In User details:", sessionUser);
      } else {
        alert("Invalid credentials! Please register first or use correct details.");
        setErrors({
          uid: true,
          pass: true,
        });
      }
    }
  };

  const handleReset = () => {
    setFormData({
      utype: "Student",
      uid: "",
      pass: "",
      remember: false,
    });
    setErrors({
      uid: false,
      pass: false,
    });
  };

  return (
    <main className="container my-5 flex-grow-1 d-flex align-items-center justify-content-center animate__animated animate__fadeIn">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-5 col-md-8 col-sm-10">
          <div className="card bg-white border-0 border-top border-warning border-5 shadow p-4">
            <div className="card-body">
              
              <div className="text-center mb-4">
                <h2 className="text-danger fw-bold mb-1">Secure Login Access</h2>
                <p className="text-secondary small">Enter your credentials to access the DCET Portal</p>
                <div className="bg-warning mx-auto" style={{ width: "50px", height: "3px" }}></div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* Login As */}
                <div className="mb-3">
                  <label htmlFor="utype" className="form-label fw-semibold text-secondary">Login As</label>
                  <select 
                    className="form-select border-secondary-subtle" 
                    id="utype" 
                    name="utype"
                    value={formData.utype}
                    onChange={handleChange}
                  >
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {/* User ID */}
                <div className="mb-3">
                  <label htmlFor="uid" className="form-label fw-semibold text-secondary">User ID / Username</label>
                  <input 
                    type="text" 
                    className={`form-control border-secondary-subtle ${errors.uid ? "is-invalid" : ""}`} 
                    id="uid" 
                    name="uid" 
                    placeholder="Enter your ID" 
                    value={formData.uid}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Please enter your User ID.</div>
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="pass" className="form-label fw-semibold text-secondary">Password</label>
                  <input 
                    type="password" 
                    className={`form-control border-secondary-subtle ${errors.pass ? "is-invalid" : ""}`} 
                    id="pass" 
                    name="pass" 
                    placeholder="Enter password" 
                    value={formData.pass}
                    onChange={handleChange}
                    required 
                    minLength="6"
                  />
                  <div className="invalid-feedback">Password must be at least 6 characters.</div>
                </div>

                {/* Remember Me */}
                <div className="mb-4 form-check">
                  <input 
                    type="checkbox" 
                    className="form-check-input border-secondary-subtle" 
                    id="remember" 
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  <label className="form-check-label text-secondary small fw-semibold" htmlFor="remember">Remember Me</label>
                </div>

                {/* Buttons */}
                <div className="d-grid gap-2 mb-3">
                  <button type="submit" className="btn btn-danger btn-crimson text-white fw-bold bg-danger border-0">Sign In</button>
                  <button type="button" onClick={handleReset} className="btn btn-outline-secondary btn-sm">Clear Form</button>
                </div>
              </form>

              <div className="text-center mt-4 border-top pt-3 border-light">
                <p className="mb-1 text-secondary small fw-semibold">
                  New here? <Link to="/signup" className="text-danger fw-bold text-decoration-none">Create an account</Link>
                </p>
                <p className="mb-0 text-secondary small fw-semibold">
                  Forgot password? <Link to="/forgot-password" className="text-danger fw-bold text-decoration-none">Reset it here</Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
