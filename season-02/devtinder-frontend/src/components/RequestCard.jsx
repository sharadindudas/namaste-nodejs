import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { updateRequests } from "../store/slices/requestSlice";

const RequestCard = ({ request }) => {
    const dispatch = useDispatch();

    const handleReviewRequest = async (status, requestId) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await axiosInstance.post(`/request/review/${status}/${requestId}`);
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(updateRequests(requestId));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response.data.message);
            }
        } finally {
            toast.dismiss(toastId);
        }
    };

    const { _id: requestId } = request;
    const { photoUrl, name, about } = request.fromUserId;

    return (
        <div className="flex items-center bg-base-300 p-5 rounded-lg">
            <div className="flex items-center gap-5 flex-1">
                <img
                    src={photoUrl}
                    className="w-16 h-16 rounded-full"
                    alt="photo"
                />
                <div className="text-left space-y-1">
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-sm">{about}</p>
                </div>
            </div>
            <div className="space-x-3">
                <button
                    onClick={() => handleReviewRequest("rejected", requestId)}
                    className="btn btn-error">
                    Reject
                </button>
                <button
                    onClick={() => handleReviewRequest("accepted", requestId)}
                    className="btn btn-primary">
                    Accept
                </button>
            </div>
        </div>
    );
};

export default RequestCard;
