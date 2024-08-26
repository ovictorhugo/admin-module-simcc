import { Sparkles } from "lucide-react";
import { Alert } from "../ui/alert";
import { CardContent, CardHeader } from "../ui/card";
import { SymbolEEWhite } from "../svg/SymbolEEWhite";
import { SymbolEE } from "../svg/SymbolEE";
import { useTheme } from "next-themes";
import { Skeleton } from "../ui/skeleton";

export function MariaHome() {
    const {theme} = useTheme()
    return(
        <Alert className="backgroundMaria w-full dark:bg-transparent p-6  border dark:border-neutral-800 rounded-md my-4 md:my-8">
        <CardHeader className="flex flex-row mb-4 items-center justify-between space-y-0 pb-2">
        <div className="flex gap-3  items-center">
               <div className="h-4">{theme == 'dark' ? (<SymbolEEWhite/>):(<SymbolEE/>)}</div>
             <h2 className="font-bold text-lg ">Visão geral criada pela MarIA</h2>
            
             </div>
                          <Sparkles className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>

                        <CardContent>
                        <div className="flex flex-col gap-4">
                <Skeleton className="h-4 rounded-md w-full"/>
                <Skeleton className="h-4 rounded-md w-[90%]"/>
                <Skeleton className="h-4 rounded-md w-[95%]"/>
                <Skeleton className="h-4 rounded-md w-1/2"/>
            </div>
                        </CardContent>
       
        </Alert>
    )
}