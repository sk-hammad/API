import User  from "../models/user.model.js";

const registerUser = async (req, res) => {
    try{
        const {username, password} = req.body;

        if(!username || !password){
            return res.status(400).json({message: "all fields are important"});
        }

        const normalizeduser =  username.trim().toLowerCase();
        const existing = await User.findOne({username: normalizeduser});

        if(existing){
            return res.status(400).json({message:"user already exits"});
        };

        const user = await User.create({
            username,
            password,
            loggedIn : true
        });

        res.status(201).json({
            message: "user registered",
            user:{
                id:user._id,
                username:user.username,
                password:user.password
            }
        });
    }catch(error){
        res.status(500).json({
            message:"internal server error",
            error: error.message
        })
    }
};

const LoginUser = async (req, res) => {
    try{
        const {username, password}= req.body;
        
        if(!username ||!password){
            res.status(400).json({message:"all fields requied"});
        };

        const normalizeduser =  username.trim().toLowerCase();

        const user = await User.findOne({username:normalizeduser});
        if(!user){
            return res.status(400).json({message:" user not found"});
        };

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Cridentials"});
        };

        res.status(200).json({
            message:"user logged in",
            user:{
                id:user._id,
                username: user.username
            }
        });
    }catch (error) {
        res.status(500).json({message:"internal server error", error:error.message})
    }
}

export {registerUser, LoginUser};