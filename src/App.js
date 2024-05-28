import './App.css';
import * as React from 'react';
import { Routes,Route } from 'react-router-dom';
import Schedule from './pages/Schedule';
import Schedules from './pages/Schedules';
import AddProfessorC from './pages/AddProfessor';
import AddCourse from './pages/AddCourse';
import NavbarCo from './components/Navbar';
import ServerAwakeCheck from './components/ServerAwakeCheck';
import { useState ,useEffect } from 'react';
import LoginForm from './components/LoginForm';
function App() {
  const [user,setUser]=useState(false)
     
  useEffect(()=>{

    if(window.localStorage.getItem("logged") && window.localStorage.getItem("logged")=="true"){
      setUser(true)
    }

  },[]) 

  if(!user){
     return <>
       <ServerAwakeCheck/>
     <LoginForm setUser={setUser}/>
     
     </> 
  }

  return (
    <div className="App" style={{height:"100vh"}}>
      <ServerAwakeCheck/>
      <NavbarCo setUser={setUser}/>
      <Routes>
      <Route path="/" element={<Schedules/>} />
        <Route path="/schedule/:id" element={<Schedule/>} />
        <Route path="/addprofessor" element={<AddProfessorC/>} />
        <Route path="/addcourse" element={<AddCourse/>} />
      </Routes>
       
    </div>
  );
}

export default App;
