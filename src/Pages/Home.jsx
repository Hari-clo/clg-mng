import React from "react";
import { Link } from "react-router-dom";

/**
 * Homepage Component
 * 
 * Beginner Tips:
 * 1. Marquee Tag: Deprecated in standards but kept here with ESLint bypass comment to match original design.
 * 2. Data arrays (events, recruiters, testimonials): Extracted at the top of the component to keep JSX markup clean and readable.
 * 3. Responsive flexbox layouts: Using Bootstrap's card system and grids (`col-lg-8`, `col-md-6`, etc.) for seamless mobile-desktop rendering.
 */
function Homepage() {
  
  // Highlight bullet points
  const highlights = [
    "Online Admission & Registration",
    "Attendance & Examination Management",
    "Student & Faculty Dashboard",
    "Library & Result Management",
    "Fee Payment & Academic Records",
  ];

  // Live notices
  const announcements = [
    {
      type: "danger",
      strongText: "Semester Registration",
      desc: "is currently Open.",
    },
    {
      type: "warning",
      strongText: "Internal Assessment",
      desc: "starts from 15 July.",
    },
    {
      type: "secondary",
      strongText: "Campus Placement Drive",
      desc: "begins next week.",
    },
  ];

  // College numerical statistics
  const stats = [
    { value: "5000+", label: "Students" },
    { value: "250+", label: "Faculty" },
    { value: "10+", label: "Departments" },
    { value: "95%", label: "Placement" },
  ];

  // Departments list
  const departments = [
    { name: "Computer Science", image: "cse.jpg" },
    { name: "Information Technology", image: "it.jpg" },
    { name: "ECE", image: "ece.jpg" },
    { name: "Mechanical", image: "mech.jpg" },
  ];

  // Recruiting partners labels
  const recruiters = [
    "Google", "Microsoft", "Amazon", "TCS", 
    "Infosys", "Wipro", "Cognizant", "Accenture"
  ];

  // Campus Events
  const events = [
    {
      date: "28 Jul",
      title: "National Tech Symposium (Tech-X 2026)",
      desc: "Join project presentations, hackathons, and design contests with exciting prizes.",
    },
    {
      date: "12 Aug",
      title: "Annual Alumni Reunion Meet",
      desc: "Welcoming our distinguished alumni back to campus for mentorship programs.",
    },
    {
      date: "05 Sep",
      title: "Graduation Day Ceremony",
      desc: "Celebrating the degrees and accolades of our outstanding Class of 2026.",
    },
  ];

  // Student reviews and recruiter testimonials
  const testimonials = [
    {
      quote: "The hands-on labs and intensive coding bootcamps at DCET helped me crack technical interviews and secure a software engineer role at Google.",
      author: "Aravind Swamy",
      role: "Software Engineer at Google (Class of 2024)",
    },
    {
      quote: "DCET's research culture and incubation support allowed me to build my IoT prototype and file a design patent while studying in final year.",
      author: "Priya Sharma",
      role: "R&D Engineer at Intel (Class of 2023)",
    },
  ];

  return (
    <div>
      {/* Gold highlights announcement bar */}
      {/* eslint-disable-next-line jsx-a11y/no-distracting-elements */}
      <marquee className="bg-warning text-dark py-2 fw-bold shadow-sm" scrollamount="6">
        🎓 Admissions Open 2026-27 | 📢 Semester Registration Ends on 20 July | 📝 Internal Assessment Starts from 15 July | 💼 Campus Placement Drive Begins Next Week | 🏆 Welcome to DCET College Management Portal
      </marquee>

      <div className="container my-5 flex-grow-1">
        
        {/* Title Header */}
        <div className="text-center mb-5">
          <h1 className="text-danger fw-bold display-4">Welcome to DCET College Management Portal</h1>
          <p className="text-secondary fs-5">Your Digital Campus for Academic Excellence</p>
          <div className="mx-auto bg-warning border-top border-warning border-2" style={{ width: "100px" }}></div>
        </div>

        {/* Video Player */}
        <div className="row mb-5 justify-content-center">
          <div className="col-lg-10">
            <video className="w-100 rounded shadow border border-warning border-3" controls autoPlay muted loop>
              <source src="wel.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Highlights & Announcements Column Split */}
        <div className="row g-4 mt-2">
          
          {/* Portal Highlights Card */}
          <div className="col-md-6">
            <div className="card bg-white border-0 border-top border-warning border-5 shadow-sm p-4 h-100">
              <h4 className="text-danger fw-bold mb-3 border-bottom border-warning border-2 pb-2">Portal Highlights</h4>
              <ul className="list-group list-group-flush">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="list-group-item bg-transparent px-0">
                    <span className="text-warning me-2">★</span> {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Announcements Card */}
          <div className="col-md-6">
            <div className="card bg-white border-0 border-top border-warning border-5 shadow-sm p-4 h-100">
              <h4 className="text-danger fw-bold mb-3 border-bottom border-warning border-2 pb-2">Latest Announcements</h4>
              {announcements.map((ann, idx) => (
                <div 
                  key={idx} 
                  className={`alert alert-${ann.type} border-start border-${ann.type} border-3 bg-${ann.type}-subtle ${
                    idx === announcements.length - 1 ? "mb-0" : "mb-3"
                  }`}
                >
                  <strong>{ann.strongText}</strong> {ann.desc}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Statistics Title */}
        <div className="text-center mt-5">
          <h3 className="text-danger fw-bold mb-4 border-bottom border-warning border-2 pb-2 d-inline-block mx-auto">
            Quick Statistics
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="row g-4 text-center mt-2">
          {stats.map((stat, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="card bg-white border-0 border-top border-warning border-5 shadow-sm p-3">
                <h2 className="text-danger fw-bold display-6">{stat.value}</h2>
                <p className="text-secondary fw-semibold mb-0">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* NEW SECTION: Placement Recruiters */}
        <div className="my-5 pt-3">
          <div className="text-center mb-4">
            <h4 className="text-danger fw-bold border-bottom border-warning border-2 pb-2 d-inline-block">Top Recruiting Partners</h4>
          </div>
          <div className="row g-3 justify-content-center text-center">
            {recruiters.map((company, idx) => (
              <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={idx}>
                <div className="card border border-warning-subtle rounded shadow-sm py-3 bg-dark text-white fw-bold hover-gold cursor-pointer">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Departments Title */}
        <div className="text-center mt-5">
          <h3 className="text-danger fw-bold mb-4 border-bottom border-warning border-2 pb-2 d-inline-block mx-auto">
            Featured Departments
          </h3>
        </div>

        {/* Featured Departments Grid */}
        <div className="row g-4 text-center mt-2">
          {departments.map((dept, idx) => (
            <div className="col-md-3" key={idx}>
              <div className="card bg-white border-0 border-top border-warning border-5 shadow-sm p-3 h-100 transition-hover">
                <img 
                  src={dept.image} 
                  className="img-fluid rounded border border-warning border-2 mb-3" 
                  alt={dept.name} 
                />
                <h5 className="text-danger fw-bold mb-0">{dept.name}</h5>
              </div>
            </div>
          ))}
        </div>

        {/* NEW SECTION: Events & Testimonials Grid */}
        <div className="row g-4 mt-5">
          
          {/* Upcoming Events Column */}
          <div className="col-lg-6">
            <div className="card bg-white border-0 border-top border-warning border-5 shadow-sm p-4 h-100">
              <h4 className="text-danger fw-bold mb-4 border-bottom border-warning border-2 pb-2">Upcoming Campus Events</h4>
              
              {events.map((event, idx) => (
                <div className="d-flex align-items-start mb-4" key={idx}>
                  <div className="bg-danger text-white rounded text-center px-3 py-2 me-3 fw-bold" style={{ minWidth: "80px" }}>
                    <div className="fs-6 leading-none">{event.date.split(" ")[0]}</div>
                    <div className="fs-7 text-uppercase font-sans small">{event.date.split(" ")[1]}</div>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1 text-dark">{event.title}</h6>
                    <p className="text-secondary mb-0 small">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Column */}
          <div className="col-lg-6">
            <div className="card bg-dark text-white border-0 border-top border-warning border-5 shadow-sm p-4 h-100">
              <h4 className="text-warning fw-bold mb-4 border-bottom border-secondary border-2 pb-2">What Our Alumni Say</h4>
              
              {testimonials.map((t, idx) => (
                <div className="mb-4 border-bottom border-secondary pb-3 last-no-border" key={idx}>
                  <p className="fst-italic text-white-50 small mb-2">
                    "{t.quote}"
                  </p>
                  <h6 className="text-warning fw-bold mb-0 small">{t.author}</h6>
                  <span className="text-white-50 fs-8 small">{t.role}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* NEW SECTION: Call to Action (CTA) Action Bar */}
        <div className="card bg-white border-0 border-top border-warning border-5 shadow-sm p-4 mt-5 text-center">
          <h4 className="text-danger fw-bold mb-3">Interested in Joining DCET?</h4>
          <p className="text-secondary mb-4">Admissions are open for the academic year 2026-27. Take the first step towards a bright technical future.</p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link to="/admission-form" className="btn btn-danger btn-crimson fw-bold px-4 py-2 text-decoration-none">Apply Online Now</Link>
            <button className="btn btn-outline-warning text-dark fw-bold px-4 py-2 border-2">Download Brochure</button>
            <button className="btn btn-dark fw-bold px-4 py-2">Admission Enquiry</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Homepage;