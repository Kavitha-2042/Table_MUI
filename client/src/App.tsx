import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


import './App.css';
import Tables from './Tables';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Tables/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
