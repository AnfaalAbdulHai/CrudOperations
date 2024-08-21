import React from "react";
import { Route, Routes } from "react-router-dom";  
import Home from "./Screens/Home";      
import CreateUser from "./Screens/CreateUser";  
import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
   
const App = () => {  
  return (          
    <Routes>
      <Route path="/" element={<Signup />} /> 
      <Route path="/login" element ={<Login/>}/>
      <Route path="/home" element={<Home />} />           
      <Route path="createUser" element={<CreateUser />} />      
    </Routes>       
  );
};

export default App;