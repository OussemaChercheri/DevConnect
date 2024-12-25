import  'react'
import AddPost from '../../Component/AddPost/AddPost'
/* import Feeds from "../../Component/feeds/feeds" */
import Feeds from '../../Component/feeds/Fedds'
import { useQuery } from 'react-query'
import Lefbar from '../../Component/leftbar/Leftbar'
import Rightbar from '../../Component/rightbar/Rightbar'
import axiosInstance from '../../lib/axios'



export default function Home() {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const {data:recommendedUsers}= useQuery({
    queryKey:['recommendedUsers'],
    queryFn:async()=>{
        const res = await axiosInstance.get('/users/recommended');
        return res.data;
      },
  });

  const {data:posts}= useQuery({
    querykey:['posts'],
    queryFn:async()=>{
        const res = await axiosInstance.get('/posts');
        return res.data;
      },
    });
  return (
    
     <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
      <div className='hidden lg:block lg:col-span-1'>
        <Lefbar user={authUser}/>

      </div>
      <div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
      <AddPost user={authUser}/>
      {posts?.map((post) => <Feeds key={post._id} post={post} />)}
       </div>
     {recommendedUsers?.length > 0 && (
      <div className='col-span-1 lg:col-span-1 hidden lg:block'>
        <div className='bg-secondary rounded-lg shadow p-4'>
          <h2 className='font-semibold mb-4'>People you may know</h2>
          {recommendedUsers?.map((user) => (
            <Rightbar key={user._id} user={user} />
          ))}
        </div>
      </div>
    )}
     </div>
    );
  }   
   /*  <AddPost/>
    <Feeds/> */
    
    
 