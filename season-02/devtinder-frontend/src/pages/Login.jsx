import { Link, useNavigate } from "react-router";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../schemas/authSchema";
import ToolTipMessage from "../components/ToolTipMessage";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(LoginSchema),
        mode: "onChange",
        defaultValues: {
            email: "remo@gmail.com",
            password: "Password@123"
        }
    });
    const [showPassword, setShowPassword] = useState("");

    const onSubmit = async (data) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await axiosInstance.post("/auth/login", data);
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(addUser(response.data.data));
                navigate("/");
                reset();
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response.data.message);
                console.error(err.response.data.message);
            }
        } finally {
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center my-14">
            <div className="card bg-base-300 w-96 shadow-xl">
                <h2 className="card-title justify-center text-xl mt-8">Login to your Account</h2>
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body">
                    <div className="space-y-5 my-5">
                        <div className="relative">
                            <label className="floating-label">
                                <span className={`${errors?.email && "text-red-500"}`}>Email Address</span>
                                <input
                                    type="email"
                                    {...register("email")}
                                    placeholder="Email Address"
                                    className={`input w-full h-13 focus:outline-0 focus-within:outline-0 ${errors?.email && "border-red-500"}`}
                                />
                            </label>
                            {errors?.email && <ToolTipMessage message={errors.email.message} />}
                        </div>
                        <div className="relative">
                            <label className="floating-label">
                                <span className={`${errors?.password && "text-red-500"}`}>Password</span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                    placeholder="Password"
                                    className={`input w-full h-13 focus:outline-0 focus-within:outline-0 ${errors?.password && "border-red-500"}`}
                                />
                            </label>
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 -translate-y-1/2 right-10 text-base cursor-pointer text-primary">
                                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                            </span>
                            {errors?.password && <ToolTipMessage message={errors.password.message} />}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <label className="fieldset-label">
                            <input
                                type="checkbox"
                                className="checkbox rounded-sm w-5 h-5"
                            />
                            Remember me
                        </label>
                        <Link
                            to="/forgot-password"
                            className="text-sm">
                            Forgot Password?
                        </Link>
                    </div>

                    <div className="flex items-center flex-col gap-3">
                        <p className="m-auto cursor-pointer font-light">
                            Not Registered Yet ? <span className="font-semibold">Signup</span>
                        </p>
                        <button className=" btn btn-primary w-full h-11">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;
