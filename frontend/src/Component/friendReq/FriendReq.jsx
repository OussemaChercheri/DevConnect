import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import axiosInstance from "../../lib/axios"; // Adjust the path as needed
import { Clock, Check, X, UserCheck, UserPlus } from "react-icons/fa";

export default function FriendReq( user ) {
  const queryClient = useQueryClient();

  const { data: connectionStatus,  } = useQuery({
    queryKey: ["connectionStatus", user._id],
    queryFn: () => axiosInstance.get(`/connections/status/${user._id}`),
  });

  const { mutate: sendConnectionRequest } = useMutation({
    mutationFn: (userId) => axiosInstance.post(`/connections/request/${userId}`),
    onSuccess: () => {
      toast.success("Connection request sent successfully");
      queryClient.invalidateQueries(["connectionStatus", user._id]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const { mutate: acceptRequest } = useMutation({
    mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries(["connectionStatus", user._id]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const { mutate: rejectRequest } = useMutation({
    mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request rejected");
      queryClient.invalidateQueries(["connectionStatus", user._id]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const handleConnect = () => {
    if (connectionStatus?.data?.status === "not_connected") {
      sendConnectionRequest(user._id);
    }
  };

  const renderButton = () => {
    switch (connectionStatus?.data?.status) {
      case "pending":
        return (
          <button
            className="px-3 py-1 rounded-full text-sm bg-yellow-500 text-white flex items-center"
            disabled
          >
            <Clock size={16} className="mr-1" />
            Pending
          </button>
        );
      case "received":
        return (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => acceptRequest(connectionStatus.data.requestId)}
              className="rounded-full p-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white"
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => rejectRequest(connectionStatus.data.requestId)}
              className="rounded-full p-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white"
            >
              <X size={16} />
            </button>
          </div>
        );
      case "connected":
        return (
          <button
            className="px-3 py-1 rounded-full text-sm bg-green-500 text-white flex items-center"
            disabled
          >
            <UserCheck size={16} className="mr-1" />
            Connected
          </button>
        );
      default:
        return (
          <button
            className="px-3 py-1 rounded-full text-sm border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 flex items-center"
            onClick={handleConnect}
          >
            <UserPlus size={16} className="mr-1" />
            Connect
          </button>
        );
    }
  };

  return (
    <div className="relative flex w-80 justify-center m-4 flex-col">
      <h4 className="text-xl font-bold p-2">Friend Requests</h4>
      <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
        <img
          className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
          src={user.profilePicture || "/avatar.png"}
          alt={`${user.name}'s profile`}
        />
        <div className="text-center space-y-2 sm:text-left">
          <div className="space-y-0.5">
            <p className="text-lg text-black font-semibold">{user.name}</p>
            <p className="text-slate-500 font-medium">{user.headline}</p>
          </div>
          <div className="flex items-center flex-row gap-1">{renderButton()}</div>
        </div>
      </div>
    </div>
  );
}