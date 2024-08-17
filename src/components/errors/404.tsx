import { useTheme } from "next-themes";
import { LogoConectee } from "../svg/LogoConectee";
import { LogoConecteeWhite } from "../svg/LogoConecteeWhite";

export function Error404() {
    const { theme } = useTheme()

    return(
        <div className="h-screen w-full flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
            <div className='h-16 '>
            {theme == 'dark' ? (<LogoConecteeWhite/>):(<LogoConectee/>)}
        </div>
        </div>
    )
}