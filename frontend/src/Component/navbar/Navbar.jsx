import  'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import axiosInstance from '../../lib/axios'
import { FaBell, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { IoMdHome } from 'react-icons/io'
import { MdOutlineDarkMode } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => axiosInstance.get("/notifications"),
		enabled: !!authUser,
	});
  const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post("/auth/logout"),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});
  /* const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: async () => axiosInstance.get("/connections/requests"),
		enabled: !!authUser,
	});
  const { data: connectionRequests } = useQuery({
		queryKey: ["connectionRequests"],
		queryFn: async () => axiosInstance.get("/connections/requests"),
		enabled: !!authUser,
	}); */
  
  const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
/* 	const unreadConnectionRequestsCount = connectionRequests?.data?.length; */
 /*  const [dark,setDark]= useState(false);
  const toggleDarkMode = () =>{
    setDark(!dark);
    document.body.classList.toggle("dark");

  } */
  return (
    <nav className="bg-white top-0 start-0 border-b border-gray-300 ">
      
        <div className="max-w-screen flex items-center  mx-5 p-3">
          <div className='flex flex-1'>
              <Link to="/"> <h1 className='text-3xl bold text-blue-600 pr-3 dark:text-white'>DeConnect</h1></Link>
              <div className='flex items-center p-2 h-10 rounded-full border-2 border-black  '>
                    <FaSearch className='h-4 w-4' />
                    <input type='search' placeholder='Search' className='outline bg-transparant outline-none pl-2 '/>
              </div>
              </div>
      <div className="flex    md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <div className='flex items-center justify-center px-3 mx-3 '>
           <MdOutlineDarkMode   className=' flex items-center sm:flex h-[26px] w-[26px]  ml-1 ' />
        </div>
        <div className='flex flex-1'> 
        <button
									className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'
									onClick={() => logout()}
								>
                  <FaSignOutAlt size={20} />
									<span className='hidden md:inline'>Logout</span>
								</button>
      
      </div>
          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        {/* <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" d="M1 1h15M1 7h15M1 13h15"/>
       </svg> */}
          </button>
      </div>
<div className="flex grow w-full md:flex md:w-auto md:order-1" id="navbar-cta">
  <ul className=" flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    <li>
    <Link to="/" className='text-blue-500'> <IoMdHome  className=' inline-block sm:flex h-[28px] w-[28px]  ml-1 text-blue-500' />Home </Link>
    </li>
    <li>
    <Link to="/profile/:id" ><FaUser  className='hidden sm:flex h-[26px] w-[26px]  ml-1'/>Profile</Link>
    </li>
    {/* <li>
    <Link to="" ><GoDiscussionDuplicate className='hidden sm:flex h-[26px] w-[26px]  ml-1 ' /> Chat</Link>
    </li> */}
    <li >
       <Link to="/notification"><FaBell className='justify-center hidden sm:flex h-[26px] w-[26px]  ml-1 '/>Notification</Link>
       {unreadNotificationCount > 0 && (
										<span
											className='absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center'
										>
											{unreadNotificationCount}
										</span>
									)}
    </li>
   
    
  </ul>
</div>
</div>
</nav>
    /* <nav className='mx-auto max-w-screen-2xl bg-fixed border border-gray-600 from-blue-gray-900 to-blue-gray-800 px-3 py-3' >
        
            <div className='flex flex-wrap items-center justify-between gap-y-4'>
                <div className='mr-4 ml-2 cursor-pointer py-1'>
                    <Link to="/">
                       <h1 className='text-2xl bold'>DeConnect</h1>   
                     </Link>
                </div>
              
            <div className='flex items-center pl-4  bg-gray-100 h-10 rounded-md w-[150px]  sm:w-[360px]'>
                    <FaSearch className='h-4 w-4' />
                   <input type='search' placeholder='Search' className='flex bg-gray-100 outline-none text-[#333333] text-[16px]'/>
              </div>
              
              
        <div className="mb-4 mt-2 flex flex-col gap-3 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
                
                <Link to="/">
                   <IoMdHome  className='hidden sm:flex h-[28px] w-[28px]  ml-1' /> 
                </Link>
                <Link to="/profile/:id">
                 <FaUser  className='hidden sm:flex h-[26px] w-[26px]  ml-1'/>
                </Link>
                <Link to="">
                <GoDiscussionDuplicate className='hidden sm:flex h-[26px] w-[26px]  ml-1' />
                </Link>
                <Link to="">
                 <FaBell className='hidden sm:flex h-[26px] w-[26px]  ml-1' />
                </Link>
                <Link to="">
                 <FaBars className='hidden sm:flex h-[26px] w-[26px]  ml-1' />
                </Link>

            </div>
            </div>
            
       
    </nav> */


    
  )}

