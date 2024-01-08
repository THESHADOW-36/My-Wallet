// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/dashboard/Dashboard";
import { Box } from '@mui/material';
import SignUp from './components/signUp/SignUp';
import SignIn from './components/signIn/SignIn';
import Expenses from './components/expenses/Expenses';
import Income from './components/income/Income';

interface mainProps {
  loggedIn: any,
  setLoggedIn: any,
}


function App(prop: mainProps) {
  return (
    <Box className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn loggedIn={prop.loggedIn} setLoggedIn={prop.setLoggedIn} />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/income" element={<Income />} />
      </Routes>
    </Box>
  );
}

export default App;
