import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { AxiosError } from "axios";
import { addUser } from "../store/slices/userSlice";
import Loader from "./Loader";

const Body = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = async () => {
        if (user) return;
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
        </>
    );
};

export default Body;
