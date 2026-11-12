import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

dotenv.config();

const StartServer = async()=>{
    try{
        await connectDB();
        app.on("error", (error)=>{
            console.log("error", error);
            throw error;
        });

        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
        process.exitCode = 1;
    }
};

StartServer();