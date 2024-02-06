// import logo from './logo.svg';
// import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/dashboard/Dashboard";
import { Box } from '@mui/material';
import SignUp from './pages/signUp/SignUp';
import SignIn from './pages/signIn/SignIn';
import Expenses from './pages/expenses/Expenses';
import Income from './pages/income/Income';

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
        <Route path="/expenses/:id" element={<Expenses />} />
        <Route path="/income" element={<Income />} />
        <Route path="/income/:id" element={<Income />} />
      </Routes>
    </Box>
  );
}

export default App;
