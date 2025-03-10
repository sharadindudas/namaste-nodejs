import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
    const user = useSelector((store) => store.user);
    if (user) {
        return (
            <Navigate
                to="/"
                replace
            />
        );
    }
    return children;
};

export default PublicRoute;
