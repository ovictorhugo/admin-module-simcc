"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { useContext, useState } from "react"
import { UserContext } from "../context/context"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()
  const {navbar} = useContext(UserContext)

  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant="outline" className={` relative h-8 w-8`} >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {navbar && (<span className="">{theme}</span>)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="gap-2 flex items-center" onClick={() => setTheme("light")}>
        <Sun size={16}/>  Modo claro
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2 flex items-center" onClick={() => setTheme("dark")}>
        <Moon size={16}/>   Modo escuro
        </DropdownMenuItem>
     
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
