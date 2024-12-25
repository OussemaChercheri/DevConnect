import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const queryClient = useQueryClient();

	const { mutate: loginMutation, isLoading } = useMutation({
		mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			toast.success("Login successful!");
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Something went wrong");
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		loginMutation({ username, password });
	};

	// OAuth Handlers
	const handleGitHubLogin = () => {
		window.location.href = `${axiosInstance.defaults.baseURL}/auth/github`;
	};

	const handleGoogleLogin = () => {
		window.location.href = `${axiosInstance.defaults.baseURL}/auth/google`;
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6 w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg'>
			<h2 className='text-2xl font-bold text-center'>Login</h2>
			<input
				type='text'
				placeholder='Username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className='input input-bordered w-full'
				required
			/>

			<button
				type='submit'
				className='btn btn-primary w-full bg-blue-700 hover:bg-blue-900 text-white flex items-center justify-center'
			>
				{isLoading ? <Loader className='w-5 h-5 animate-spin' /> : "Login"}
			</button>

			{/* OAuth Section */}
			<div className='flex flex-col items-center space-y-4 mt-4'>
				<p className='text-gray-500'>Or continue with</p>
				<button
					type='button'
					onClick={handleGitHubLogin}
					className='btn btn-outline w-full border-gray-300 text-gray-900 hover:bg-gray-300 flex items-center justify-center space-x-2'
				>
					<FaGithub className='w-5 h-5' />
					<span>Login with GitHub</span>
				</button>
				<button
					type='button'
					onClick={handleGoogleLogin}
					className='btn btn-outline w-full border-gray-300 text-gray-900 hover:bg-gray-300 flex items-center justify-center space-x-2'
				>
					<FaGoogle className='w-5 h-5' />
					<span>Login with Google</span>
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
