import { FaLock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { Link } from 'react-router-dom';
import {useState} from 'react'
import { useMutation } from 'react-query'
import {useQueryClient} from 'react-query'
import axiosInstance from '../../lib/axios';
import toast from 'react-hot-toast';

export default function Login() {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const queryClient = useQueryClient();

  const{mutate:loginMutation} = useMutation({
    mutation:(userData)=>axiosInstance.post('/auth/login',userData),
    onSuccess:()=>{
      toast.success('Login successful');
      queryClient.invalidateQueries({queryKey:['authUser']})
    },
    onError:(err)=>{
      toast.error(err.response.data.message || 'Something went wrong');
    }
  
  })
  const handleSubmit = (e) => {
		e.preventDefault();
		loginMutation({email, password });
	};

  return (
    <div >
      <div className=' h-[370px] w-100 bg-blue-600/20 border border-blue-600/20 backdrop-blur-lg px-6 my-4'>
         <div >
           <h2 className='text-3xl font bold pb-6 text-center'>Sgin in</h2>
           <form className="flex flex-col items-center" action='' onSubmit={handleSubmit}>
                <div className='w-full relative '>
                    <input className='border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent' placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <MdEmail className='absolute top-[35%] right-3' />
                </div>
                <div className='w-full relative '>
                    <input className='border border-gray-200 w-full rounded-full py-2 px-4 my-2 bg-transparent'placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <FaLock className='absolute top-[35%] right-3' />
                </div>
                <button type='submit' className='my-2 py-2  w-full rounded-full bg-blue-600'> sgin-in</button>
                <span className='mb-2'>Don&apos; have an account ? <Link className='text-blue-500' to="/register"> Create an Account</Link></span>
               
                <div className='w-full h-auto flex items-center gap-x-1 my-3'>
                  <div className='w-1/2 h-[1.5px] bg-gray-200/40 rounded-md'></div>
                  <p className='text-sm text-gray-300 font-normal px-2'>OR</p>
                  <div className='w-1/2 h-[1.5px] bg-gray-200/40 rounded-md'></div>

                </div>
                <div className='w-full h-auto flex items-center gap-7'>
                  <div className='w-1/2 h-auto'>
                  <button className='w-full h-12 p-4 outline-none bg-transparent border-[2px] justify-center border-gray-200/40 text-white rounded-md flex items-center gap-x-2 hover:bg-slate-700'>
                  <svg xmlns="http://www.w3.org/2000/svg" 
                  width="15" 
                  height="15" 
                  viewBox="0 0 256 262">
                  <path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"/><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/></svg>Google</button>
                  </div>
                  <div className='w-1/2 h-auto'>
                  <button className='w-full h-12 p-4 outline-none bg-transparent border-[2px] justify-center border-gray-200/40 text-white rounded-md flex items-center gap-x-2 hover:bg-slate-700'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"/></svg>Github</button>
                  </div>
                </div>
                
                
           </form>
         </div>
      </div>
    </div>
  )
}
