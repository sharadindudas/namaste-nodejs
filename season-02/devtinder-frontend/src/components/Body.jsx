import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/slices/userSlice";

const Body = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get("/profile/view");
            if (response.data.success) {
                dispatch(addUser(response.data.data));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                console.error(err.response.data.message);
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Body;
