"use server";

import { db } from "@/firebase/admin"; 

export const signUp = async (params: SignUpParams) => {

    const {uid, email, name, password} = params

    try {

        console.log("Action Auth Sign Up", params);
        
        const userRecord = await db.collection("users").doc(uid).get();

        if(userRecord.exists){
            return {
                success: false,
                message: "User already exists"
            }
        }

        await db.collection('users').doc(uid).set({
            name, email 
        })

        
    } catch (error) {
        console.error("Error in Action Auth Signup", error);
        
    }
};