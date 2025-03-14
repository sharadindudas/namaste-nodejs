import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../utils/axiosInstance";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { addFeed } from "../store/slices/feedSlice";
import UserCard from "../components/UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        try {
            const response = await axiosInstance.get("/user/feed");
            if (response.data.success) {
                dispatch(addFeed(response.data.data));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                console.error(err.response.data.message);
            }
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed || feed?.length === 0) return <h2 className="text-center my-10 font-bold text-3xl">No New Users Found!</h2>;

    return (
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-10 my-10">
            {feed?.map((user) => (
                <UserCard
                    key={user?._id}
                    user={user}
                />
            ))}
        </div>
    );
};

export default Feed;
