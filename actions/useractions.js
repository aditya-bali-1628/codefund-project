"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import mongoose from "mongoose";

// Custom DB connection
let isConnected = false;

// this is connection of data base

const dbconnect = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) throw new Error(" MONGODB_URI is undefined");

    if (isConnected) return;

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true;
        console.log(" MongoDB connected");
    } catch (error) {
        console.error(" DB connection error:", error.message);
        throw error;
    }
};

// Create Razorpay order + save in DB
export const initiate = async (amount, to_username, paymentform) => {
    await dbconnect();


    const user = await User.findOne({ username: to_username });
    if (!user) throw new Error(" User not found");

    const instance = new Razorpay({
        key_id: user.razorpayId,            //  CORRECT FIELD
        key_secret: user.razorpaySecret,    // CORRECT FIELD
    });

    const options = {
        amount: Math.round(Number(amount)) * 100,// ₹10 → 1000 paise
        currency: "INR",
    };

    try {
        console.log("Creating Razorpay order with:", options);
        const x = await instance.orders.create(options);

        await Payment.create({
            oid: x.id,
            amount,
            to_username,
            name: paymentform.name,
            message: paymentform.message,
        });

        return x;
    } catch (error) {
        console.error(" Razorpay order creation failed:", error);
        throw new Error("Failed to create Razorpay order. Please try again.");
    }
};
// Fetch a user by username 
export const fetchuser = async (username) => {
    await dbconnect();

    const u = await User.findOne({ username }).lean();

    if (!u) return null; // if

    return {
        ...u,
        _id: u._id.toString(),
        createdAt: u.createdAt?.toISOString(),
        updatedAt: u.updatedAt?.toISOString(),
    };
};
// Get all payments made to a user
export const fetchPayments = async (username) => {
    await dbconnect();

    const payments = await Payment.find({ to_username: username, done: true })
        .sort({ amount: -1 })
        .lean();

    // ✅ Convert _id and dates to plain strings
    return payments.map(p => ({
        ...p,
        _id: p._id.toString(),
        createdAt: p.createdAt?.toISOString(),
        updatedAt: p.updatedAt?.toISOString(),
        __v: undefined, // optionally remove internal Mongoose field
    }));
};

// make sure this is imported
export const updateprofile = async (data, oldusername) => {
    await dbconnect();

    try {
        const ndata = Array.isArray(data) ? Object.fromEntries(data) : data;

        // 1. Find existing user with all their data
        const existingUser = await User.findOne({ username: oldusername });
        if (!existingUser) {
            return { error: "User not found" };
        }

        // 2. Handle username change
        if (ndata.username && ndata.username !== oldusername) {
            // Check if new username exists
            const usernameExists = await User.findOne({ username: ndata.username });
            if (usernameExists) {
                return { error: "Username already exists" };
            }

            // 3. Update ALL existing payment records in database
            await Payment.updateMany(
                {
                    $or: [
                        { to_username: oldusername },  // Payments received
                        { from_username: oldusername } // Payments made
                    ]
                },
                {
                    $set: {
                        to_username: ndata.username,   // Update both fields
                        from_username: ndata.username  // to maintain all relationships
                    }
                }
            );

            // 4. Update user document
            await User.updateOne(
                { username: oldusername },
                { $set: { username: ndata.username } }
            );
        }

        // 5. Update other profile fields
        const result = await User.updateOne(
            { username: ndata.username || oldusername },
            { $set: ndata }
        );

        // 6. Get updated user with all their existing payments
        const updatedUser = await User.findOne({
            username: ndata.username || oldusername
        }).lean();

        const userPayments = await Payment.find({
            $or: [
                { to_username: updatedUser.username },
                { from_username: updatedUser.username }
            ]
        }).lean();

        // 7. Prepare response with all data
        const responseData = {
            user: {
                ...updatedUser,
                _id: updatedUser._id.toString(),
                payments: userPayments.map(p => ({
                    ...p,
                    _id: p._id.toString(),
                    createdAt: p.createdAt?.toISOString(),
                    updatedAt: p.updatedAt?.toISOString()
                }))
            },
            success: true,
            message: "Profile updated with all existing payments"
        };

        return responseData;

    } catch (err) {
        console.error("Update error:", err);
        return {
            error: err.code === 11000
                ? "Username already exists"
                : "Failed to update profile"
        };
    }
};