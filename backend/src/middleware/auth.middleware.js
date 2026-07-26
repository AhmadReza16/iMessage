import {getAuth} from "@clerk/express";
import User from "../models/user.model.js";

function hasClerkConfig() {
    return Boolean(process.env.CLERK_SECRET_KEY);
}

export async function protectRoute(req,res,next){
    try{
        if (!hasClerkConfig()) {
            return res.status(503).json({message: "Authentication is not configured. Set CLERK_SECRET_KEY and CLERK_PUBLISHABLE_KEY before using protected routes."});
        }

        const {userId} = getAuth(req);

        if (!userId){
            res.status(401).json({message : "Unauthorized"});
            return;
        }

        const user = await User.findOne({clerkId:userId});

        if (!user){
            res.status(404).json({message : "User profile is not synced yet"});
            return;
        }

        req.user = user;
        next();

    }catch (error){
        console.error("Error in protectRoute middleware:", error.message);
        res.status(500).json({message : "Internal server error"});
    }
}