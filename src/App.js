import './App.css';
import * as React from 'react';
import { Routes,Route } from 'react-router-dom';
import Schedule from './pages/Schedule';
import AddProfessor from './pages/AddProfessor';
import AddCourse from './pages/AddCourse';

function App() {
  return (
    <div className="App" style={{height:"100vh",padding:"40px"}}>
      <Routes>
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/addprofessor" element={<AddProfessor/>} />
        <Route path="/addcourse" element={<AddCourse/>} />
      </Routes>
       
    </div>
  );
}

export default App;
