import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Loader from "./components/Loader";
import NotFound from "./pages/NotFound";

const Feed = lazy(() => import("./pages/Feed"));
const Profile = lazy(() => import("./pages/Profile"));
const Connections = lazy(() => import("./pages/Connections"));
const Requests = lazy(() => import("./pages/Requests"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Body = lazy(() => import("./components/Body"));

const App = () => {
    return (
        <Suspense fallback={<Loader />}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Body />}>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Feed />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/connections"
                            element={
                                <ProtectedRoute>
                                    <Connections />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/requests"
                            element={
                                <ProtectedRoute>
                                    <Requests />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <PublicRoute>
                                    <Signup />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="*"
                            element={<NotFound />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
};

export default App;

