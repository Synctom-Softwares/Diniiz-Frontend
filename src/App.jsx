import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { useDispatch } from "react-redux";
import { setCurrentUser, setToken } from "./store/slices/auth/authSlice";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
  const userData = localStorage.getItem("userData");
  const token = localStorage.getItem("authToken");

  if (userData && token) {
    dispatch(setCurrentUser(JSON.parse(userData)));
    dispatch(setToken(token));
  }
}, []);

  return (
    <div className='min-h-screen  flex flex-wrap content-between main'>
      <div className='w-full block'>
        <main >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
