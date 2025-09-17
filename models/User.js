import mongoose from "mongoose";
const {Schema, model} = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String,  },
    username: { type: String, required: true },
    profilePicture: { type: String},
    coverPicture: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    razorpayId : { type: String },
    razorpaySecret : { type: String },
});


export default  mongoose.models.User || model("User", userSchema);