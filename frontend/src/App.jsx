
import { useState } from "react";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";

import Property from "./Property.jsx";


// ================= LOGIN COMPONENT =================

function Login() {

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const API_URL = "http://localhost:4000/api/v1/users";


    // HANDLE INPUT CHANGE

    const HandleChange = (e) => {

        const { name, value } = e.target;

        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));

    };


    // LOGIN FUNCTION

    const HandleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            const response = await fetch(`${API_URL}/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(credentials)

            });

            const data = await response.json();


            if (!response.ok) {

                setMessage(data.message || "Login failed");

                return;
            }


            // GET JWT TOKEN

            const token = data.JWT;


            if (!token) {

                setMessage("JWT token not received");

                return;
            }


            // STORE JWT TOKEN

            localStorage.setItem("JWT", token);


            // REDIRECT TO PROPERTY PAGE

            navigate("/property");


        } catch (error) {

            setMessage("Server connection failed");

        } finally {

            setLoading(false);

        }

    };


    // LOGIN UI

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={HandleLogin}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
            >

                <h2 className="text-2xl font-bold text-center mb-6">
                    User Login
                </h2>


                <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={HandleChange}
                    required
                    className="w-full border p-3 rounded-lg mb-4"
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={HandleChange}
                    required
                    className="w-full border p-3 rounded-lg mb-4"
                />


                {message && (

                    <p className="text-red-600 mb-4">
                        {message}
                    </p>

                )}


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >

                    {loading ? "Logging in..." : "Login"}

                </button>

            </form>

        </div>

    );

}



// ================= PROTECTED ROUTE =================

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("JWT");


    if (!token) {

        return <Navigate to="/" replace />;

    }


    return children;

}



// ================= MAIN APP =================

function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* LOGIN PAGE */}

                <Route
                    path="/"
                    element={<Login />}
                />


                {/* PROTECTED PROPERTY PAGE */}

                <Route
                    path="/property"
                    element={

                        <ProtectedRoute>

                            <Property />

                        </ProtectedRoute>

                    }
                />


                {/* INVALID URL */}

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />


            </Routes>

        </BrowserRouter>

    );

}


export default App;
