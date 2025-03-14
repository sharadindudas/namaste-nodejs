import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";
import { AxiosError } from "axios";
import { removeUser } from "../store/slices/userSlice";
import { removeFeed } from "../store/slices/feedSlice";
import { BsFillPeopleFill } from "react-icons/bs";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await axiosInstance.post("/auth/logout");
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(removeUser());
                dispatch(removeFeed());
                navigate("/login");
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
        <header className="navbar bg-base-300 shadow-sm px-5">
            <div className="flex-1">
                <Link
                    to="/"
                    className="text-xl font-bold">
                    DevTinder
                </Link>
            </div>

            {user ? (
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-5">
                        <p>
                            Welcome, <b>{user?.name}</b>
                        </p>
                        <Link
                            to="/connections"
                            className="text-xl btn btn-dash p-0 w-10 rounded-full">
                            <BsFillPeopleFill />
                        </Link>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user.photoUrl}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-base dropdown-content bg-base-100 rounded-box z-1 w-40 shadow p-0 py-2">
                            <p className="font-bold px-3">My Account</p>
                            <div className="divider m-0 mt-1"></div>
                            <div className="space-y-1">
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <a onClick={handleLogout}>Logout</a>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="space-x-4">
                    <button className="btn btn-primary">
                        <Link to="/login">Log In</Link>
                    </button>
                    <button className="btn btn-info">
                        <Link to="/signup">Sign Up</Link>
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;
