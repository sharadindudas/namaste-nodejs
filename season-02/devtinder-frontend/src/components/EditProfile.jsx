import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditProfileSchema } from "../schemas/profileSchema";
import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import ToolTipMessage from "./ToolTipMessage";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/userSlice";

const EditProfile = ({ user }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm({
        resolver: yupResolver(EditProfileSchema),
        mode: "onChange",
        defaultValues: {
            name: user?.name,
            email: user?.email,
            gender: user?.gender,
            age: user?.age,
            about: user?.about,
            photoUrl: user?.photoUrl
        }
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Loading...");
        const { name, email, ...editData } = data;

        try {
            const response = await axiosInstance.patch("/profile/edit", editData);
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(addUser(response.data.data));
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response.data.message);
            }
        } finally {
            setIsSubmitting(false);
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-3xl">
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl">Edit Profile</h2>
                    <p className="text-base-content/70">Update your DevTinder profile information</p>

                    <form
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-6 space-y-6">
                        {/* Name */}
                        <div className="form-control w-full space-y-1">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                placeholder="Enter your name"
                                disabled
                                readOnly
                                className="input input-bordered w-full h-12 focus:outline-0 focus-within:outline-0"
                            />
                        </div>

                        {/* Email */}
                        <div className="form-control w-full space-y-1">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                placeholder="Enter your email"
                                className="input input-bordered w-full h-12 focus:outline-0 focus-within:outline-0"
                                disabled
                                readOnly
                            />
                        </div>

                        {/* Profile Photo */}
                        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                            <div className="avatar">
                                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img
                                        src={user.photoUrl || "https://via.placeholder.com/150"}
                                        alt="Profile"
                                    />
                                </div>
                            </div>

                            <div className="form-control w-full space-y-1 relative">
                                <label className="label">
                                    <span className="label-text">Profile Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("photoUrl")}
                                    placeholder="https://example.com/photo.jpg"
                                    className={`input input-bordered w-full h-12 focus:outline-0 focus-within:outline-0 ${errors?.photoUrl && "border-red-500"}`}
                                />
                                {errors?.photoUrl && <ToolTipMessage message={errors.photoUrl.message} />}
                                <label className="label">
                                    <span className="label-text-alt">Provide a URL to your profile picture</span>
                                </label>
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="form-control space-y-1">
                            <label className="label">
                                <span className="label-text">Gender</span>
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input
                                        type="radio"
                                        {...register("gender")}
                                        className="radio radio-primary"
                                        value="male"
                                    />
                                    <span className="label-text">Male</span>
                                </label>
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input
                                        type="radio"
                                        {...register("gender")}
                                        className="radio radio-primary"
                                        value="female"
                                    />
                                    <span className="label-text">Female</span>
                                </label>
                            </div>
                        </div>

                        {/* Age */}
                        <div className="form-control w-full space-y-1">
                            <label className="label">
                                <span className="label-text">Age</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    min={18}
                                    {...register("age")}
                                    placeholder="Enter your age"
                                    className={`input input-bordered w-full h-12 focus:outline-0 focus-within:outline-0 ${errors?.age && "border-red-500"}`}
                                />
                                {errors?.age && <ToolTipMessage message={errors.age.message} />}
                            </div>
                        </div>

                        {/* About */}
                        <div className="form-control w-full space-y-1">
                            <label className="label">
                                <span className="label-text">About Me</span>
                            </label>
                            <div className="relative">
                                <textarea
                                    {...register("about")}
                                    placeholder="Tell other developers about yourself..."
                                    className={`textarea textarea-bordered h-32 w-full resize-none focus:outline-0 focus-within:outline-0 ${errors?.about && "border-red-500"}`}
                                />
                                {errors?.about && <ToolTipMessage message={errors.about.message} />}
                            </div>
                        </div>

                        <div className="card-actions justify-end mt-6">
                            <button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                                className="btn btn-primary min-w-[120px]">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
