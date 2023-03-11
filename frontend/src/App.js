import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Pages/Login';
import Form from './Pages/Form';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/profile' element={<Form />}></Route>
        <Route path='/ChatPage' element={<ChatPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;