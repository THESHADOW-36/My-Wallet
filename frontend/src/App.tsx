// import logo from './logo.svg';
// import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/dashboard/Dashboard";
import { Box } from '@mui/material';

function App() {
  return (
    <Box className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Box>
  );
}

export default App;
