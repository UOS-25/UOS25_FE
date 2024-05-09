import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "components/Header";
import HomePage from "pages/HomePage";
import Product from "pages/product";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
