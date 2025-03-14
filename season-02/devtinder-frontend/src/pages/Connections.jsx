import { useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/slices/connectionSlice";
import { AxiosError } from "axios";
import ConnectionCard from "../components/ConnectionCard";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

    const fetchAllConnections = async () => {
        if (connections) return;
        try {
            const response = await axiosInstance.get("/user/connections");
            if (response.data.success) {
                dispatch(addConnections(response.data.data));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                console.error(err.response.data.message);
            }
        }
    };

    useEffect(() => {
        fetchAllConnections();
    }, []);

    if (!connections || connections?.length === 0) return <h2 className="text-3xl font-bold text-center my-10">No Connections Found!</h2>;

    return (
        <div className="text-center my-8 max-w-3xl w-full mx-auto">
            <h2 className="text-3xl font-bold">My Connections</h2>
            <div className="space-y-6 mt-8">
                {connections?.map((connection) => (
                    <ConnectionCard
                        key={connection._id}
                        connection={connection}
                    />
                ))}
            </div>
        </div>
    );
};

export default Connections;
