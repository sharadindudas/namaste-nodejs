import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { updateFeed } from "../store/slices/feedSlice";
import { truncateString } from "../utils/truncateString";

const UserCard = ({ user }) => {
    const { _id, name, about, age, gender, photoUrl } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await axiosInstance.post(`/request/send/${status}/${userId}`);
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(updateFeed(userId));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response.data.message);
            }
        } finally {
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="card bg-base-200 w-96 h-96 shadow-xl">
            <figure>
                <img
                    src={photoUrl}
                    className="h-60 w-full object-top object-cover"
                    alt="user"
                />
            </figure>
            <div className="card-body px-5 py-4">
                <h2 className="card-title text-lg font-semibold">{name}</h2>
                {age || gender ? (
                    <p className="text-sm text-gray-600">
                        {age ? `${age} years old` : ""}
                        {age && gender ? ", " : ""}
                        {gender || ""}
                    </p>
                ) : (
                    <p className="text-sm text-gray-500">Age/Gender not available</p>
                )}
                <p className="text-gray-300">{truncateString(about, 50) || "No description available"}</p>
                <div className="card-actions justify-end mt-4 space-x-2">
                    <button
                        onClick={() => handleSendRequest("ignored", _id)}
                        className="btn btn-error">
                        Ignore
                    </button>
                    <button
                        onClick={() => handleSendRequest("interested", _id)}
                        className="btn btn-primary">
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
