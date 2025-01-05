import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashBoard from './pages/DashBoard';
import TablePage from './pages/Component/Table';
import DashBoardCook from './pages/DashBoardCook';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/dashboard" element={<DashBoard/>} />
    <Route path="/table" element={<TablePage/>} />
    <Route path="/cook" element={<DashBoardCook/>} />
  </Routes>
  </BrowserRouter>
);

reportWebVitals();
