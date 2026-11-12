import { useState } from "react";

function Login(){
    const [userdetails, setUserdetails]  = useState({
        username:"",
        password:""
    });

    const [message, setmessage] = useState("");
    const [loading, setloading] = useState(false);

    const Updatedetails= (e) => {
        const {name, value} = e.target;
        setUserdetails((prev)=>({
            ...prev,
            [name]:value
        }));
    };


    //login api integration
    const handleLogin = async(e) => {
        e.preventDefault();

        try{
            setloading(true);
            
            const response = await fetch(
                "http://localhost:4000/api/v1/users/login",
                {
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userdetails)
                }
            );

            const data = await response.json();

            if(!response.ok){
                return setmessage(data.message || "Login failed")
            };

            setmessage(data.message);
            console.log("login succefully",data);

        }catch(error){
             console.error("API Error:", error);
            setmessage("Backend server is not connected");

        } finally {
            setloading(false);
        }
    };

    return (<>
        <form onSubmit={handleLogin}>
            <label>Username</label>
            <input type="text" name="username" onChange={Updatedetails}/>
            <label>password</label>
            <input type="text" name="password" onChange={Updatedetails}/>

             <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
        </form>
        <p>{message}</p>
    </>);
};

export default Login;