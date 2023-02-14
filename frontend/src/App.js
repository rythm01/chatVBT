import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Otp from './Otp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/otp' element={<Otp />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;