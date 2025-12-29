
import React, { useState , useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import './App.css';

import Login from './pages/Login';
import Meallist from './pages/meallist';
import Uploadimage from './pages/uploadpage';
import Pridict from './pages/predict';
import Dashboard from './pages/dashboard';
import Nutrition from './pages/nutritionccard';
import Navbar from './components/Navbar';
import Ragistration from './pages/ragister';
import Home from './pages/home';
import Frontpage from './pages/FRONTpage';
import Registration from './pages/ragister';

function App() {

 const [user , setuser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
     console.log("running...")
    try {
      const token = localStorage.getItem("token");
     console.log(token)
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/auth/getuser", {
         
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await res.json();
  console.log(data)
      if (res.ok) {
        setuser(data.user); // backend should send { user: {...} }
      } else {
        console.error(data.message);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) return <h3>Loading...</h3>;
  return (
    <>
      <div>
       
        <Router>
          <Routes>
            <Route path='/' element = {<Home user = {user}/>}></Route>
            <Route path='/dashboard' element={ user ? <Dashboard user = {user}/>:<Navigate to = '/' />}></Route>
            <Route path='/meallist' element={<Meallist/>}></Route>
            <Route path='/predict' element={<Pridict/>}></Route>
            <Route path='/upload' element={<Uploadimage/>}></Route>
            <Route path='/nutrition' element={<Nutrition/>}></Route>
            <Route path='/ragister' element = { !user ? <Registration setuser = {setuser}/> :<Navigate to = "/" />}></Route>
            <Route path='/login' element = {  !user ? <Login setuser = {setuser}/> :<Navigate to = "/" />}></Route>
            <Route path='/front' element = {<Frontpage/>}></Route>

          </Routes>


        </Router>
      </div>

    </>


  )
}

export default App;