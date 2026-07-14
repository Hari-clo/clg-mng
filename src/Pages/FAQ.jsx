import React, { useState } from "react";

/**
 * FAQ Component
 * 
 * Beginner Tips:
 * 1. State Management: Instead of relying on Bootstrap's native Javascript (using data-attributes like `data-bs-toggle`),
 *    we use React's `useState` hook. We track the `activeIndex` of the currently expanded question.
 * 2. Conditional CSS Classes: We use template literals to toggle classes dynamically. 
 *    E.g., `${isOpen ? "show" : ""}` adds the "show" class to expand the accordion drawer.
 * 3. Dynamic Lists: We store detailed, realistic questions and answers in an array of objects to render them cleanly.
 */
function FAQpage() {
  // state hook to keep track of the currently opened FAQ index
  const [activeIndex, setActiveIndex] = useState(null);

  // function to toggle accordion tabs open/closed
  const toggleFaq = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Clicked on the currently active tab, close it
    } else {
      setActiveIndex(index); // Clicked on a closed tab, open it
    }
  };

  const faqData = [
    {
      question: "What are the eligibility criteria and documents required for B.E. / B.Tech admissions?",
      answer: (
        <div>
          <p>
            Admissions at DCET are conducted through both state engineering counseling (e.g., TNEA) and the management quota. 
            Candidates must have passed their 10+2 examinations with Physics, Chemistry, and Mathematics as compulsory subjects, 
            scoring a minimum aggregate of 50% (45% for reserved categories).
          </p>
          <p className="mb-0">
            <strong>Required documents for verification:</strong> Original 10th and 12th marksheets, Transfer Certificate (TC), 
            Community Certificate (if applicable), Aadhaar Card, Passport-size photos, and the Counseling Allotment Order.
          </p>
        </div>
      ),
    },
    {
      question: "What is the minimum attendance requirement to appear for end-semester examinations?",
      answer: (
        <div>
          <p>
            Under university and DCET regulations, students must maintain a minimum of <strong>75% attendance</strong> in each subject 
            during the semester to qualify for writing the end-semester examinations.
          </p>
          <p className="mb-0">
            Condonation (exemption) of up to 10% (making 65% eligible) is allowed only in genuine cases of medical emergencies or 
            representing the college in national-level sports/academic events. These requests must be supported by valid medical certificates 
            approved by the Head of Department (HOD) and the Principal. Attendance below 65% will result in a semester redo.
          </p>
        </div>
      ),
    },
    {
      question: "How does the grading and CGPA evaluation system work?",
      answer: (
        <div>
          <p>
            DCET follows a credit-based continuous grading system. Each course has internal assessment marks (40% weightage) 
            comprising internal tests, assignments, and seminars, combined with the end-semester examination (60% weightage).
          </p>
          <p className="mb-0">
            Grades are awarded from 'O' (Outstanding - 10 points) down to 'C' (Average - 5 points). Any grade below C or an 'U' (Reappearance) 
            means failure. The semester GPA (SGPA) and cumulative GPA (CGPA) are calculated by multiplying the grade points earned by the 
            course credits and dividing by the total credits registered.
          </p>
        </div>
      ),
    },
    {
      question: "Are there scholarships or fee concessions available for merit or socio-economically backward students?",
      answer: (
        <div>
          <p>
            Yes, DCET facilitates government scholarships and provides institutional concessions:
          </p>
          <ul>
            <li><strong>First Graduate Concession:</strong> Tuition fee waivers for students who are the first in their family to graduate.</li>
            <li><strong>Post-Matric Scholarship:</strong> Full/partial fee waivers for SC/ST/SCC/SCA candidates based on annual family income.</li>
            <li><strong>Merit Scholarship:</strong> Institutional tuition waivers (25% to 50%) for university rank holders or students maintaining CGPA &gt; 9.0.</li>
          </ul>
          <p className="mb-0">
            For application procedures, contact the college administrative office or login to the Student Portal under the Scholarship module.
          </p>
        </div>
      ),
    },
    {
      question: "How do I reset my portal password or report technical issues with my student dashboard?",
      answer: (
        <div>
          <p>
            For password recovery, visit the portal login page, click <strong>Forgot Password</strong>, and enter your registered Student Registration ID 
            and email. An OTP (One Time Password) will be sent to your registered mobile number and email to allow password resets.
          </p>
          <p className="mb-0">
            For portal glitches, incorrect attendance displays, or billing details issues, submit an academic ticket via the Enquiry page or contact our 
            technical support desk directly at <a href="mailto:portal.support@dcet.edu" className="text-danger fw-semibold">portal.support@dcet.edu</a>.
          </p>
        </div>
      ),
    },
    {
      question: "When does the campus placement drive begin and how does the Placement Cell help?",
      answer: (
        <div>
          <p>
            Registration for campus placements starts in the 6th semester. The DCET Placement Cell conducts systematic soft-skills training, 
            mock interviews, aptitude tests, and resume-building workshops starting from the second year.
          </p>
          <p className="mb-0">
            Placement drives begin during the final year (7th semester) with leading recruiting partners (e.g., Google, Amazon, TCS, Infosys) visiting campus. 
            Students must clear backlogs and maintain a minimum CGPA of 6.0 (or higher as specified by individual companies) to participate.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="container my-5 flex-grow-1">
      
      {/* Page Header */}
      <div className="text-center mb-5">
        <h2 className="text-danger fw-bold display-5">Frequently Asked Questions</h2>
        <p className="text-secondary fs-5">Find detailed answers to common queries about DCET regulations, admissions, and portal systems.</p>
        <div className="bg-warning mx-auto" style={{ width: "80px", height: "4px" }}></div>
      </div>

      {/* Accordion Container */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card bg-white border-0 border-top border-warning border-5 shadow-sm p-4">
            <div className="accordion accordion-flush" id="faqAccordion">
              
              {faqData.map((faq, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div className="accordion-item bg-transparent" key={index}>
                    <h2 className="accordion-header">
                      <button 
                        className={`accordion-button fw-bold text-danger bg-transparent ${isOpen ? "" : "collapsed"}`} 
                        type="button" 
                        onClick={() => toggleFaq(index)}
                        aria-expanded={isOpen}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    {/* 
                      In React, we conditionally add the class "show" to expand the drawer.
                      We also control display transition styling.
                    */}
                    <div 
                      className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
                      style={{ transition: "all 0.3s ease-in-out" }}
                    >
                      <div className="accordion-body text-secondary lh-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default FAQpage;
