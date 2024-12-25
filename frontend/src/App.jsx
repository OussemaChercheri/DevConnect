

import './App.css'
import Home from './Page/Home/Home'
import Route from './Layout/Layout'
import { useQuery } from 'react-query';
import { Routes, Navigate } from 'react-router-dom';
import toast from "react-hot-toast";
import {axiosInstance} from './lib/axios'
import Profile from './Page/Profile/Profile'
import Register from './Component/auth/Register'
import Login from './Component/auth/login'
import AddPost from './Component/AddPost/AddPost'
import Notifications from './Component/notification/Notification'

function App() {
  
 const {data:authUser ,isLoading}=   useQuery({ 
 useQuery:['authUser'],
 queryFn: async()=>{
  try {
    const res = await axiosInstance.get('/auth/me');
    return res.data;
  }catch (err) {
    if (err.response && err.response.status === 401) {
      return null;
    }
    toast.error(err.response.data.message || "Something went wrong");
  }
},
})

if (isLoading) return null;
  return (
    
    <Routes>
            <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
            <Route path='/signup' element={!authUser ? <Register /> : <Navigate to={"/"} />} />
            <Route path='/login' element={!authUser ? <Login /> : <Navigate to={"/"} />} />
            <Route path='/notifications' element={authUser ? <Notifications /> : <Navigate to={"/login"} />} />
            <Route path='/post/:postId' element={authUser ? <AddPost /> : <Navigate to={"/login"} />} />
            <Route path='/profile/:username' element={authUser ? <Profile /> : <Navigate to={"/login"} />} />
     </Routes>
    
  )
}

export default App
