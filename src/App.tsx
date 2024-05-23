import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from 'components/Header';
import HomePage from 'pages/Homepage/HomePage';
import Order from 'pages/product';
import Employee from 'pages/employee';
import Sell from 'pages/sell/Sell';
import Asset from 'pages/asstes';
import Etc from 'pages/etc';
import Post from 'pages/etc/Post';
import Lottery from 'pages/etc/Lottery';
import WaterTex from 'pages/etc/utility/WaterTax';
import ATM from 'pages/etc/atm/ATM';
import WithDraw from 'pages/etc/atm/WithDraw';
import DepositToMe from 'pages/etc/atm/DepositToMe';
import ElectricTax from 'pages/etc/utility/ElectricTax';
import GasTax from 'pages/etc/utility/GasTax';
import EventPost from 'pages/events/EventPost';
import LoginPage from 'pages/login/Login';
import OrderList from 'pages/product/OrderList';
import OrderListDetail from "./pages/product/OrderListDetail";
import Signup from 'pages/login/Signup';
import PostList from "./pages/etc/utility/PostList";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login/signup" element={<Signup />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/product/0" element={<Order />} />
        <Route path="/product/1" element={<OrderList />} />
        <Route path="/product/1/:orderId" element={<OrderListDetail />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/asset" element={<Asset />} />
        <Route path="/etc" element={<Etc />} />
        <Route path="/etc/Post/0" element={<Post />} />
        <Route path="/etc/Post/1" element={<PostList />} />
        <Route path="/etc/Post/1/:postId" element={<PostList />} />
        <Route path="/etc/ATM/0" element={<ATM />} />
        <Route path="/etc/ATM/1" element={<WithDraw />} />
        <Route path="/etc/ATM/2" element={<DepositToMe />} />
        <Route path="/etc/Utility/0" element={<WaterTex />} />
        <Route path="/etc/Utility/1" element={<ElectricTax />} />
        <Route path="/etc/Utility/2" element={<GasTax />} />
        <Route path="/etc/Lottery" element={<Lottery />} />
        <Route path="/event/0" element={<EventPost />} />
      </Routes>
    </Router>
  );
}

export default App;
