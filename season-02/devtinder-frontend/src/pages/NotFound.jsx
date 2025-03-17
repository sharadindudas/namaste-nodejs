import { Link } from "react-router";

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h2 className="text-5xl font-bold">404 - Page Not Found</h2>
            <p className="text-lg font-semibold mt-3 mb-4">The page you're looking for doesn't exist or has been moved.</p>
            <Link
                to="/"
                className="bg-white text-black px-5 py-3 rounded-lg font-semibold text-sm">
                Return to Home
            </Link>
        </div>
    );
};

export default NotFound;
