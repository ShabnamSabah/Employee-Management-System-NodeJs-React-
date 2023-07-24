import React from "react";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from "./components/Dashboard/Dashboard";
import Employee from "./components/Employee/Employee";
import Profile from "./components/Profile/Profile";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import EditEmployee from "./components/EditEmployee/EditEmployee";
import Start from "./components/Start/Start";
import EmployeeDetail from "./components/EmployeeDetail/EmployeeDetail";
import EmployeeLogin from "./components/EmployeeLogin/EmployeeLogin";


function App() {
  return (
    <div>
    <BrowserRouter>
     <Routes>
       <Route path='/' element={<Dashboard />}>
           <Route path='' element={<Home />}></Route>
           <Route path='/employee' element={<Employee />}></Route>
           <Route path='/profile' element={<Profile />}></Route>
           <Route path='/create' element={<AddEmployee />}></Route>
           <Route path='/editEmployee/:id' element={<EditEmployee />}></Route>
       </Route>
       <Route path='/login' element={<Login />}></Route>
       <Route path='/start' element={<Start />}></Route>
       <Route path='/employeeLogin' element={<EmployeeLogin />}></Route>
       <Route path='/employeeDetail/:id' element={<EmployeeDetail />}></Route>
       
     </Routes>
    
    </BrowserRouter>

    </div>
  );
}

export default App;
