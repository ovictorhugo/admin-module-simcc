"use client"

import * as React from "react"

import { cn } from "../../lib/utils"

import { UserContext } from "../../context/context"

interface AccountSwitcherProps {
  isCollapsed: boolean

}

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "../../components/ui/dropdown-menu"

import {  ChevronsUpDown} from "lucide-react"

import { useTheme } from "next-themes"
import { SymbolEEWhite } from "../svg/SymbolEEWhite"
import { SymbolEE } from "../svg/SymbolEE"
import { useNavigate } from "react-router-dom"
  

export function AccountSwitcher({
  isCollapsed,

}: AccountSwitcherProps) {

  const {user,  setPermission, urlGeralAdm, setRole, role} = React.useContext(UserContext)
  const { theme } = useTheme()






const fetchDataPerm = async (role_id:string) => {
  let urlPermission = urlGeralAdm + `s/permission?role_id=${role_id}`
     console.log(urlPermission)
  try {
    const response = await fetch(urlPermission , {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "3600",
        "Content-Type": "text/plain",
      },
    });
    const data = await response.json();
    if (data) {
      setPermission(data)
      localStorage.setItem('permission', JSON.stringify(data));
      history('/dashboard');
    }
  } catch (err) {
    console.log(err);
  }
};


const history = useNavigate();


  
  return (
    <DropdownMenu>
        <div className={`w-full  flex-1 gap-3 flex items-center  ${isCollapsed ? ('px-2 '):('')}`}>
        <DropdownMenuTrigger className={`flex-1 items-center flex justify-center hover:bg-neutral-100 rounded-md ${isCollapsed ? ('w-[36px] '):('w-full')} `}>
            <div className={cn(
          "flex items-center w-full gap-2 h-10 pr-4",
          isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 "
        )}> 
        
     <div className="flex  w-[36px] items-center justify-center">
     <div className="h-[18px]  "  >{(theme ==  'dark' ) ? (<SymbolEEWhite />):(<SymbolEE />)}</div>
     </div>

           
                {!isCollapsed && (
                <div className="flex gap-3 items-center flex-1 w-full">
                    <p className="text-sm font-medium w-full text-left">{role}</p>
         

            <ChevronsUpDown size={16}/>

                </div>
             )}
             
            
        </div>
        
        </DropdownMenuTrigger>

       


        </div>

        <DropdownMenuContent className="min-w-[200px]">
    <DropdownMenuLabel>Conta pessoal</DropdownMenuLabel>
    <DropdownMenuItem onClick={() => {
       history('/');
    }}>Profile</DropdownMenuItem>
   {user?.roles != undefined &&(
    <div>
       <DropdownMenuSeparator />
       <DropdownMenuLabel>Cargos</DropdownMenuLabel>
    </div>
   )}

{user?.roles != undefined && (
  user.roles!.map((role) => (
    <DropdownMenuItem onClick={() => {
      fetchDataPerm(role.id)
      localStorage.setItem('role', JSON.stringify(role.role_id));
      setRole(role.role_id)
      
    }} key={role.id}>{role.role_id}</DropdownMenuItem>
  ))
)}

   
  </DropdownMenuContent>


    
    </DropdownMenu>
  )
}