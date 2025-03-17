import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { axiosInstance } from "../utils/axiosInstance";
import { addUser } from "../store/slices/userSlice";
import Loader from "./Loader";

const Body = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.get("/profile/view");
            if (response.data.success) {
                dispatch(addUser(response.data.data));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                console.error(err.response.data.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
            <Toaster />
        </>
    );
};

export default Body;
