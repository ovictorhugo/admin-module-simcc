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

import {  ChevronsUpDown, GalleryVerticalEnd, User} from "lucide-react"

import { useTheme } from "next-themes"
import { SymbolEEWhite } from "../svg/SymbolEEWhite"
import { SymbolEE } from "../svg/SymbolEE"
import { useLocation, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { TeamSwitcher } from "../team-switcher"
  

export function AccountSwitcher() {

  const {user,  setPermission, urlGeralAdm, setRole, role, loggedIn} = React.useContext(UserContext)
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
   
    }
  } catch (err) {
    console.log(err);
  }
};


const history = useNavigate()

const location = useLocation()


const teams = [
  {
    name: 'Visitante', // Define o que deseja exibir no campo 'name'
    logo: GalleryVerticalEnd, // Personalize conforme necessário
    plan: "Usuário", // Ajuste conforme necessário
  },
  ...(user?.roles?.map((rola) => ({
    name: rola.role_id, // Define o que deseja exibir no campo 'name'
    logo: GalleryVerticalEnd, // Personalize conforme necessário
    plan: "Administrativo", // Ajuste conforme necessário
  })) || []), // Garante que 'teams' seja um array vazio caso 'user.roles' seja undefined
];

  return (
    <TeamSwitcher teams={teams} />
  )
}