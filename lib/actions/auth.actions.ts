"use server";

import { db, auth } from "@/firebase/admin";  
import { cookies } from "next/headers";


const ONE_WEEK = 60 * 60 * 24 * 7;

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
            name, email, password
        })

        return {
            success: true,
            message: "Account created successfully! Please sign in."
        }
        
    } catch (error) {
        console.error("Error in Action Auth Signup", error);
        
    }
};


export const signIn = async (params: SignInParams) => {
    const {email, idToken} = params;

    try {
        
        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord){
            return {
                success: false,
                message: "User not found"
            }
        }

        await setSessionCookies(idToken);
        
    } catch (error) {
        console.log('error', error);
        
    }

}

export const setSessionCookies = async (idToken: string) => {

    const cookieStore = await cookies()

    const sessionCookies = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000
    });

    cookieStore.set("session", sessionCookies, {
        maxAge: ONE_WEEK,
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax"
    })

}