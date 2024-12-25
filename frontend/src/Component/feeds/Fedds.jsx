import  { useState } from 'react'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { FaComment, FaHeart, FaShare } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { IoIosSend } from 'react-icons/io'
import { LuLoaderCircle } from 'react-icons/lu'
import axiosInstance from '../../lib/axios'
import PostAction from "../../Component/PostAction";
import toast from "react-hot-toast";
 // Adjust the path to where your Loader component is located
import { formatDistanceToNow } from "date-fns";
export default function Feeds(post) {


  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);

 /*  const isOwner = authUser._id === post.author._id; */
	const isLiked = post.likes.includes(authUser._id);
  const queryClient = useQueryClient();

 /*  const { mutate: deletePost, } = useMutation({
		mutationFn: async () => {
			await axiosInstance.delete(`/posts/delete/${post._id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Post deleted successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	}) */;
  const { mutate: createComment, isPending: isAddingComment } = useMutation({
		mutationFn: async (newComment) => {
			await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Comment added successfully");
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Failed to add comment");
		},
	});

	const { mutate: likePost, isPending: isLikingPost } = useMutation({
		mutationFn: async () => {
			await axiosInstance.post(`/posts/${post._id}/like`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post", post._id] });
		},
	});
 /*  const handleDeletePost = () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		deletePost();
	}; */

	const handleLikePost = async () => {
		if (isLikingPost) return;
		likePost();
	};

	const handleAddComment = async (e) => {
		e.preventDefault();
		if (newComment.trim()) {
			createComment(newComment);
			setNewComment("");
			setComments([
				...comments,
				{
					content: newComment,
					user: {
						_id: authUser._id,
						name: authUser.name,
						profilePicture: authUser.profilePicture,
					},
					createdAt: new Date(),
				},
			]);
		}
	};
  return (
    <div className=' rounded-lg bg-white w-full overflow-hidden'>
      <div className='flex justify-between mb-10px'>
        <Link to={`/profile/${post?.author?.username}`}>
          <div className='flex items-center p-2 '>
            <img src={post.author.profilePicture || "/avatar.png"} className="w-10 rounded-full" alt="Avatar"/>
            <div className='p-2'>
             <h5>{post.author.name}</h5>
              <small className='text-inherit'>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</small>
            </div>
          </div>
        </Link>
      </div>
      <div>
        <p className='mb-4 p-1'>{post.content}</p>
        {post.image && <img className='max-h-400 rounded-lg p-2' src={post.image}/>}
      </div>
      <div className='flex items-center gap-10 p-2'>
        <div className='flex items-center space-x-1'>
        <PostAction
						icon={<FaHeart size={18} className={isLiked ? "text-blue-500  fill-blue-300" : ""} />}
						text={`Like (${post.likes.length})`}
						onClick={handleLikePost}
					/>

        </div>
        <div className='flex items-center space-x-1'>
        <PostAction
						icon={<FaComment size={18} />}
						text={`Comment (${comments.length})`}
						onClick={() => setShowComments(!showComments)}
					/>
         

          
        </div>
        <div className='flex items-center space-x-1'>
        <PostAction icon={<FaShare size={18} />} text='Share' />
         
          
        </div>
      </div>
      {showComments && (
				<div className='px-4 pb-4'>
					<div className='mb-4 max-h-60 overflow-y-auto'>
						{comments.map((comment) => (
							<div key={comment._id} className='mb-2 bg-base-100 p-2 rounded flex items-start'>
								<img
									src={comment.user.profilePicture || "/avatar.png"}
									alt={comment.user.name}
									className='w-8 h-8 rounded-full mr-2 flex-shrink-0'
								/>
								<div className='flex-grow'>
									<div className='flex items-center mb-1'>
										<span className='font-semibold mr-2'>{comment.user.name}</span>
										<span className='text-xs text-info'>
											{formatDistanceToNow(new Date(comment.createdAt))}
										</span>
									</div>
									<p>{comment.content}</p>
								</div>
							</div>
						))}
            </div>
            <form onSubmit={handleAddComment} className='flex items-center'>
						<input
							type='text'
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder='Add a comment...'
							className='flex-grow p-2 rounded-l-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary'
						/>

						<button
							type='submit'
							className='bg-primary text-white p-2 rounded-r-full hover:bg-primary-dark transition duration-300'
							disabled={isAddingComment}
						>
              {isAddingComment ? <LuLoaderCircle size={18} className='animate-spin' /> : <IoIosSend size={18} />}
							
						</button>
					</form>
					</div>
          )}
    </div>
  );
};
