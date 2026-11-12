
import { useState } from "react";

function Register() {

    const [userdetails, setUserdetails] = useState({
        username: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Update input fields
    const Updatedetails = (e) => {
        const { name, value } = e.target;

        setUserdetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Register API
    const RegisterAPi = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            const response = await fetch(
                "http://localhost:4000/api/v1/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userdetails)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || "Registration failed");
                return;
            }

            setMessage(data.message);

            console.log("Registration successful:", data);

            setUserdetails({
                username: "",
                password: ""
            });

        } catch (error) {
            console.error("API Error:", error);
            setMessage("Backend server is not connected");

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2>Register Page</h2>

            <form onSubmit={RegisterAPi}>

                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={userdetails.username}
                    onChange={Updatedetails}
                />

                <br /><br />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={userdetails.password}
                    onChange={Updatedetails}
                />

                <br /><br />

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

            </form>

            <p>{message}</p>
        </>
    );
}

export default Register;
