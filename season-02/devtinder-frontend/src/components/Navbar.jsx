import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";
import { AxiosError } from "axios";
import { removeUser } from "../store/slices/userSlice";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await axiosInstance.post("/auth/logout");
            if (response.data.success) {
                dispatch(removeUser());
                toast.success(response.data.message);
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
                <div className="flex items-center gap-5 text-sm">
                    <p>
                        Welcome, <b>{user?.name}</b>
                    </p>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
                <div>
                    <button className="btn btn-primary">
                        <Link to="/login">Log In</Link>
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;
