import { Routes, Route } from "react-router";
import Body from "./components/Body";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

const App = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Body />}>
                <Route
                    path="/"
                    element={<Feed />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/profile"
                    element={<Profile />}
                />
            </Route>
        </Routes>
    );
};

export default App;

