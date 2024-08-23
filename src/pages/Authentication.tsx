

import { useLocation } from "react-router-dom";
import { SignUpContent } from "../components/authentication/signUp";
import { SignInContent } from "../components/authentication/signIn";
import { MinhaUfmg } from "../components/authentication/minhaUFMG";

export function Authentication() {
    const location = useLocation();

    return(
        <>
        {location.pathname === '/signIn' && (<SignInContent/>)}
        {location.pathname === '/signUp' && (<SignUpContent/>)}
        {location.pathname === '/ufmg/' && (<MinhaUfmg/>)}
        </>
    )
}