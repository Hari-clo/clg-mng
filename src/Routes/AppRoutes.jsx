import React from "react";
import {Route,Routes} from "react-router-dom"
import Homepage from "../Pages/Home";
import Aboutpage from "../Pages/About";
import FAQpage from "../Pages/FAQ";
import Signup from "../Pages/signup";
import AdmissionForm from "../Pages/AdmissionForm";
import Login from "../Pages/login";

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/About" element={<Aboutpage />} />
            <Route path="/faq" element={<FAQpage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admission-form" element={<AdmissionForm />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default AppRoutes;