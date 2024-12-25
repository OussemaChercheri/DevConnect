import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {FaImage, FaTag, FaVideo } from 'react-icons/fa'
import toast from "react-hot-toast";
import { axiosInstance } from '../../lib/axios'; 
const AddPost = ( user ) => {
  const [content, setContent] = useState("");
	const [image, setImage] = useState(null);

  const queryClient = useQueryClient();

  const { mutate: createPostMutation, } = useMutation({
		mutationFn: async (postData) => {
			const res = await axiosInstance.post("/posts/create", postData, {
				headers: { "Content-Type": "application/json" },
			});
			return res.data;

		},
    onSuccess: () => {
			resetForm();
			toast.success("Post created successfully");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Failed to create post");
		},
  });
  const resetForm = () => {
		setContent("");
		setImage(null);

	};

    const handlePostCreation = async () => {
      try {
        const postData = { content };
        if (image) postData.image = await readFileAsDataURL(image);
  
        createPostMutation(postData);
      } catch (error) {
        console.error("Error in handlePostCreation:", error);
      }
    };
    const readFileAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
   
  return (
    <div className='flex flex-col  items-center'>
        <div className='flex flex-col py-3 m-3 w-full bg-white rounded-3xl shadow-lg'>
          <div className='flex items-center border-b-2 boredr-gray-300 pb-4 pl-4 w-full'>
            <img className="w-10 h-10 rounded-full" src= {user.profileimg || "/avatar.png"} alt="Rounded avatar"/>
            <form className='w-full'>
                <div className='flex justify-between items-center'>
                    <div className='w-full ml-4'>
                        <input type='text' name='text' className='outline-none w-full bg-white rounded-md' placeholder="whats's on your mind" value={content} onChange={(e) => setContent(e.target.value)}/>
                    </div>
                    <div className='mr-4'>
                       <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type='submit' onClick={handlePostCreation}>Share</button>  
                    </div>
                </div>
            </form>   
          </div> 
          <div className='flex items-center justify-evenly  p-4'>
                <label className='flex items-center space-x-1'>
                    <input type='file' className='hidden' />
                    <FaImage />
                    <span className='bg-transparent '>media</span>
                </label>
                <label className='flex items-center space-x-1'>
                    <input type='file'  className='hidden'/>
                    <FaVideo />
                    <span className='bg-transparent'>video</span>
                </label>
                <label className='flex items-center space-x-1'>
                    <input type='file'  className='hidden'/>
                    <FaTag />
                    <span className='bg-transparent'>Tags</span>
                </label>
            </div>

    </div>
  </div>
)}
export default AddPost