import { useSelector } from "react-redux";
import { Link } from "react-router";

const Navbar = () => {
    const user = useSelector((store) => store.user);

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
                                    <a>Logout</a>
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
