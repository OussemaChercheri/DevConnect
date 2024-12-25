import  'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Login from '../Page/Auth/login'
import Register from '../Page/Auth/register'
import Home from '../Page/Home/Home'
import Profile from '../Page/Profile/Profile'
import Navbar from '../Component/navbar/Navbar'
import Leftbar from "../Component/leftbar/Leftbar"
import Rightbar from '../Component/rightbar/Rightbar'


export default function route() {
    
    
  
    const Browse =()=>{
        return(
            <>
           <Navbar/>
          

            <main className='grid grid-cols-[30%,40%,30%] gap-[1%] bg-gray-50'>
                <Leftbar/>
                <div>
                    <Outlet />
                </div>
                <Rightbar/>
            </main>
            </>
        )
    }
    const router = createBrowserRouter( [
        {
            path:'/',
            element: <Browse/> ,
            children:[
                {
                    path:'/',
                    element:<Home/>
                },
                {
                    path:'/profile/:id',
                    element:<Profile/>
                }
            ]
          },
      
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/register',
          element:<Register/>
        },
      
       ])
  
    return (
        <>
        
    
        <div >
        <RouterProvider router={router}/>
          </div>
          
        
      </>
  )
}