import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserScheme = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Hash password only when it is modified
UserScheme.pre("save", async function () {
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// Compare entered password with stored hash
UserScheme.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// Use existing MongoDB collection named "User"
const User = mongoose.model("User", UserScheme);

export default User;