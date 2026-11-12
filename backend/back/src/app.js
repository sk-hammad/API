import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json());

// property
import Pro_router from "./routes/Property.route.js";
app.use("/api/v1/property", Pro_router);


import router from "./routes/user.route.js";
app.use("/api/v1/users", router);
// example route http://localhost:4000/pai/v1/property/login
export default app;