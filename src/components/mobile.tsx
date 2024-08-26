import { Laptop } from "phosphor-react";

export function Mobile() {
    return(
        <div className="flex flex-col h-screen justify-center items-center sm:hidden w-full fixed top-0 left-0 z-[999999999999999999999999999] bg-neutral-50 dark:bg-neutral-950"> 
            <Laptop size={128} className="mb-6" />

            <p className="font-medium px-16">Entre pelo computador ou notebook </p>
        </div>
    )
}