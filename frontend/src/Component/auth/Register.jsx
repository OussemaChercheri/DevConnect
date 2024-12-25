import {useState} from 'react'
import {useMutation,useQueryClient} from 'react-query'
import { FaLock, FaUser } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom';
import {axiosInstance} from "../../lib/axios.jsx"
import { toast } from "react-hot-toast";
const Register=()=> {
    const [email, setEmail] = useState('');
    const[username,setUsername]=useState('');  
    const[password,setPassword]=useState('');     
    const queryClient = useQueryClient();
    const {mutate:signUpMutation,isLoading }=useMutation({
      mutationFn: async (data) => {
        const response = await axiosInstance.post('/auth/signup',data)
        return response.data },
        onSuccess: () => {
          toast.success("Account created successfully");
          queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (err) => {
          toast.error(err.response.data.message || "Something went wrong");
        },
        });


    const handleSignup =  (e) => {
        e.preventDefault();
        signUpMutation({email,username,password}) 
    }
  return (
    <div className='h-[100vh] flex flex-col items-center bg-background bg-cover justify-center text-white'>
      <div className=' h-[370px] w-80  bg-blue-600/20 border border-blue-600/20 backdrop-blur-lg  px-6 my-4'>
         <div className='w-full'>
           <h2 className='text-3xl font bold pb-6 text-center'>Sgin up</h2>
           <form className="flex flex-col items-center" action='' onSubmit={handleSignup}>
           <div className='w-full relative '>
                    <input className='border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent' placeholder='Username' type='text' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <FaUser className='absolute top-[35%] right-3' />
                </div>
                <div className='w-full relative '>
                    <input className='border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent' placeholder='Email' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <MdEmail className='absolute top-[35%] right-3' />
                </div>
                <div className='w-full relative '>
                    <input className='border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent'placeholder='Password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <FaLock className='absolute top-[35%] right-3' />
                </div>
                <button type='submit' disabled={isLoading} className='my-2 py-2 w-full rounded-full bg-blue-600'> sgin-up</button>
                <span>Already have an account? <Link className='text-blue-500' to="/login">sgin-in</Link></span>
           </form>
         </div>
      </div>
    </div>
  )
}
export default Register