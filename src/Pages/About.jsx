import React from "react";

function Aboutpage() {
  const cardItems = [
    {
      title: "Vision",
      text: "Provide quality education and create industry-ready graduates.",
    },
    {
      title: "Mission",
      text: "Develop technical knowledge, leadership and ethical values.",
    },
    {
      title: "Quality Policy",
      text: "Continuous improvement through quality education and innovation.",
    },
  ];

  const statItems = [
    { number: "2500+", label: "Students" },
    { number: "120+", label: "Faculty" },
    { number: "10+", label: "Departments" },
    { number: "95%", label: "Placements" },
  ];

  const accreditationItems = [
    {
      badge: "AICTE APPROVED",
      title: "Technical Approval",
      desc: "Approved by the All India Council for Technical Education, New Delhi, ensuring compliance with global academic standards.",
    },
    {
      badge: "NAAC A+ GRADE",
      title: "Institutional Excellence",
      desc: "Accredited with an outstanding 'A+' Grade by the National Assessment and Accreditation Council.",
    },
    {
      badge: "NBA ACCREDITED",
      title: "Program Accreditation",
      desc: "Core engineering branches are accredited by the National Board of Accreditation for their rigorous curriculum.",
    },
    {
      badge: "VTU AFFILIATED",
      title: "University Affiliation",
      desc: "Affiliated with the State Technological University, running advanced curriculum designed for industry needs.",
    },
  ];

  const milestones = [
    {
      year: "2001",
      title: "Inception & Founding",
      description: "DCET was established with 3 primary engineering disciplines and a vision to build outstanding technocrats.",
    },
    {
      year: "2008",
      title: "PG & Management Blocks",
      description: "Inaugurated postgraduate programs (M.Tech, MBA) and expanded campus infrastructure with modern seminar halls.",
    },
    {
      year: "2015",
      title: "Center of Excellence Status",
      description: "Collaborated with tech giants to set up state-of-the-art incubation labs and research facilities on campus.",
    },
    {
      year: "2020",
      title: "Accreditation Gold Standards",
      description: "Honored with a NAAC A+ grade rating and received NBA certification for all core engineering departments.",
    },
    {
      year: "2026",
      title: "Silver Jubilee & Digital Campus",
      description: "Celebrating 25 years of educational excellence and transitioning to a fully automated smart campus.",
    },
  ];

  const facilities = [
    {
      title: "Smart Classrooms",
      desc: "Interactive screens, dynamic audio systems, and high-definition projectors in all lecture halls.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      title: "Digital Library",
      desc: "24/7 online access to over 50,000+ international e-journals, books, IEEE archives, and spacious study halls.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      title: "R&D Incubation Labs",
      desc: "Equipped with advanced servers, IoT kits, 3D printers, and tools to support research and patent applications.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      title: "Sports Complex & Gym",
      desc: "Multi-sport fields, indoor badminton courts, table tennis, and a well-equipped strength training gymnasium.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-warning">
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="18" r="3" />
          <path d="M18 12a6 6 0 0 0-6-6M6 12a6 6 0 0 0 6 6" />
        </svg>
      ),
    },
  ];

  return (
    <div className="container my-5 flex-grow-1">
      
      {/* 1. HERO SECTION: About DCET introduction */}
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <h2 className="text-danger fw-bold display-5 mb-3">About DCET</h2>
          <div className="bg-warning mb-4" style={{ width: "80px", height: "4px" }}></div>
          <p className="fs-5 text-secondary leading-relaxed">
            DCET Management Portal is a digital platform designed to manage admissions,
            attendance, examinations, academic results, and faculty/student databases.
            By combining modern engineering values with technical excellence, we simplify college
            administration and enrich student learning.
          </p>
        </div>

        <div className="col-lg-6">
          <img 
            src="col.jpg" 
            className="img-fluid rounded shadow-lg border border-warning border-3" 
            alt="DCET Campus" 
          />
        </div>
      </div>

      {/* 2. VISION, MISSION, POLICY CARDS */}
      <div className="row g-4 mt-4">
        {cardItems.map((item, index) => (
          <div className="col-md-4" key={index}>
            <div className="card bg-white border-0 border-top border-warning border-5 shadow-sm p-4 h-100 transition-hover">
              <div className="card-body px-0 py-2">
                <h4 className="text-danger fw-bold mb-3">{item.title}</h4>
                <p className="text-secondary mb-0">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. ACCREDITATIONS & QUALITY CERTIFICATIONS */}
      <div className="my-5 pt-4">
        <div className="text-center mb-5">
          <h2 className="text-danger fw-bold display-6">Accreditations & Affiliations</h2>
          <div className="bg-warning mx-auto mt-2" style={{ width: "60px", height: "4px" }}></div>
          <p className="text-secondary mt-3">We maintain high pedagogical benchmarks and system qualities recognized nationally.</p>
        </div>

        <div className="row g-4">
          {accreditationItems.map((item, idx) => (
            <div className="col-md-6 col-lg-3" key={idx}>
              <div className="card bg-white border-0 shadow-sm h-100 p-4 border-start border-warning border-4">
                <span className="badge bg-danger text-white align-self-start mb-3 px-2 py-1.5 fs-7 fw-bold">{item.badge}</span>
                <h5 className="fw-bold mb-2 text-dark">{item.title}</h5>
                <p className="text-secondary mb-0 small">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. PRINCIPAL'S MESSAGE SECTION */}
      <div className="card bg-dark text-white border-warning border-3 border-start-0 border-end-0 shadow-lg p-4 my-5">
        <div className="row align-items-center g-4">
          <div className="col-md-4 text-center">
            {/* Elegant vector SVG illustration for the Principal, ensuring it displays beautifully */}
            <div className="d-inline-block rounded-circle bg-warning p-1 shadow mb-3">
              <svg className="rounded-circle bg-secondary" width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background */}
                <circle cx="50" cy="50" r="50" fill="#343a40" />
                {/* Hair */}
                <path d="M25 40C25 25 75 25 75 40" stroke="#1a1d20" strokeWidth="12" strokeLinecap="round" />
                {/* Face */}
                <circle cx="50" cy="45" r="20" fill="#fcd5b5" />
                {/* Glasses */}
                <circle cx="43" cy="43" r="5" stroke="#212529" strokeWidth="2" />
                <circle cx="57" cy="43" r="5" stroke="#212529" strokeWidth="2" />
                <line x1="48" y1="43" x2="52" y2="43" stroke="#212529" strokeWidth="2" />
                {/* Smile */}
                <path d="M45 53C47 55 53 55 55 53" stroke="#212529" strokeWidth="2" strokeLinecap="round" />
                {/* Suit & Shirt */}
                <path d="M25 85C25 70 35 65 50 65C65 65 75 70 75 85Z" fill="#212529" />
                <path d="M42 65L50 78L58 65Z" fill="#ffffff" />
                <path d="M47 65L50 78L53 65Z" fill="#dc3545" /> {/* Red Tie */}
              </svg>
            </div>
            <h5 className="fw-bold mb-1 text-warning">Dr. Rajesh Kumar, Ph.D.</h5>
            <p className="text-white-50 mb-0 small">Principal & Academic Director</p>
          </div>

          <div className="col-md-8 border-start-md border-secondary ps-md-4">
            <h3 className="text-warning fw-bold mb-3">Principal's Desk</h3>
            <p className="fs-5 italic text-white-50">
              "At DCET, we foster a learning ecosystem that goes beyond traditional classrooms, 
              nurturing critical thinking, hands-on engineering capability, and ethical leadership."
            </p>
            <p className="text-light mb-0 small">
              Our campus integrates modern educational workflows with practical industry alignment. 
              Through state-of-the-art facilities, structured portals, and a student-centric system, 
              we prepare you to thrive in a global tech landscape. I welcome you to explore our system 
              and build your careers with us.
            </p>
          </div>
        </div>
      </div>

      {/* 5. CAMPUS INFRASTRUCTURE & FACILITIES */}
      <div className="my-5 pt-2">
        <div className="text-center mb-5">
          <h2 className="text-danger fw-bold display-6">Campus Infrastructure</h2>
          <div className="bg-warning mx-auto mt-2" style={{ width: "60px", height: "4px" }}></div>
          <p className="text-secondary mt-3">We host world-class infrastructure facilities to facilitate learning, research, and recreation.</p>
        </div>

        <div className="row g-4">
          {facilities.map((fac, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card bg-white border-0 shadow-sm p-4 h-100 d-flex flex-row align-items-start g-3">
                <div className="rounded-circle bg-warning-subtle p-3 me-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#fff3cd" }}>
                  {fac.icon}
                </div>
                <div>
                  <h5 className="fw-bold text-dark mb-2">{fac.title}</h5>
                  <p className="text-secondary mb-0 small">{fac.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. INSTITUTIONAL MILESTONES (TIMELINE) */}
      <div className="my-5 pt-3">
        <div className="text-center mb-5">
          <h2 className="text-danger fw-bold display-6">Our Journey & Milestones</h2>
          <div className="bg-warning mx-auto mt-2" style={{ width: "60px", height: "4px" }}></div>
          <p className="text-secondary mt-3">Tracing the growth of DCET from a technical institute to a benchmark technological center.</p>
        </div>

        {/* Timeline Layout */}
        <div className="position-relative ps-4 ps-md-0 border-start border-warning border-3 mx-auto" style={{ maxWidth: "800px" }}>
          {milestones.map((milestone, idx) => (
            <div className="mb-5 position-relative" key={idx}>
              {/* Dot indicator */}
              <div 
                className="position-absolute rounded-circle bg-danger border border-white border-3"
                style={{
                  width: "20px",
                  height: "20px",
                  left: "-12px",
                  top: "2px"
                }}
              ></div>
              
              <div className="ms-4">
                <div className="d-flex align-items-center mb-2">
                  <span className="badge bg-warning text-dark fw-bold px-3 py-1.5 fs-7 me-3">
                    {milestone.year}
                  </span>
                  <h5 className="fw-bold text-dark mb-0">{milestone.title}</h5>
                </div>
                <p className="text-secondary mb-0 small">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. STATS BLOCK: DCET At A Glance */}
      <div className="card bg-white border-0 border-top border-warning border-5 shadow-sm p-4 mt-5 text-center">
        <h3 className="text-danger fw-bold mb-4">DCET At A Glance</h3>
        <div className="row g-4 justify-content-center">
          {statItems.map((stat, index) => (
            <div className="col-6 col-md-3" key={index}>
              <h2 className="text-danger fw-bold display-6">{stat.number}</h2>
              <p className="text-secondary fw-semibold mb-0">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Aboutpage;