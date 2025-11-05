import { isAuthenticated } from "@/lib/actions/auth.actions";
import { redirect } from "next/navigation";
import { ReactNode } from "react"

const AuthLayout = async ({ children }: { children: ReactNode }) => {

    const isAuthenticate = await isAuthenticated();

    if (isAuthenticate) redirect('/');

    return <div className="auth-layout"> {children} </div>
}

export default AuthLayout;