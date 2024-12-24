import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import LoginSignup from "./components/LoginSignup";
import PaymentPortal from "./components/PaymentPortal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/subscribe" element={<PaymentPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
