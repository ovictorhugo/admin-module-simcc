import { Link, useLocation } from "react-router-dom";
import { LogoSimcc } from "../svg/LogoSimcc";
import { Separator } from "../ui/separator";
import { useContext} from "react";

import { cn } from "../../lib"
import * as React from "react"



import logo_4 from '../../assets/logo_4.png';
import logo_4_white from '../../assets/logo_4_white.png';

import logo_1 from '../../assets/logo_1.png';
import logo_1_white from '../../assets/logo_1_white.png';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "../../components/ui/navigation-menu"

  
import { ChartLine, Gear, GraduationCap, GridFour, ListDashes, SignIn, Textbox, UserPlus } from "phosphor-react";
import { DotSquare, GitBranch, Grip, Laptop, LogIn, Moon, Search, Sun } from "lucide-react";
import { UserContext } from "../../context/context";
import { Button } from "../ui/button";
import { UserConfigHeader } from "./user-config-header";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

import { useTheme } from "next-themes"
import { LogoWhite } from "../svg/LogoWhite";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import { LogoConecteeWhite } from "../svg/LogoConecteeWhite";
import { LogoConectee } from "../svg/LogoConectee";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Input } from "../ui/input";

export function Header() {
  const {loggedIn, user, setItensSelecionados} = useContext(UserContext)

  const { theme, setTheme } = useTheme()
  const { onOpen } = useModalHomepage();
  const location = useLocation();
  const [versao, setVersao] = React.useState(true)
  
  const posGraduation = location.pathname == '/pos-graduacao'

  const handleClick = () => {
    onOpen('initial-home')
    setItensSelecionados([])
  }
  const [isVisible, setIsVisible] = React.useState(false);
  const SCROLL_THRESHOLD = 10; // Altura em pixels em que o elemento deve aparecer

  React.useEffect(() => {
   
      if (window.scrollY > SCROLL_THRESHOLD) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

    
  }, []);
  

    return(
      <header className={`h-[50px]  z-[3] flex justify-between border-b border-neutral-200 dark:border-neutral-800 px-4   items-center sticky top-0 `}>
      <div className="  flex items-center h-12 gap-4">
      <div className="flex gap-3 items-center h-full justify-center ">
            <Link to={"/"} className="h-[18px]  " onClick={() => handleClick()} >{(theme ==  'dark' ) ? (<LogoConecteeWhite />):(<LogoConectee />)}</Link>

            <div className="h-4 w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>

            <Link to={""} target="_blank" className=" whitespace-nowrap "><img src={(theme ==  'dark' ) ? (logo_4_white):(logo_4)} alt="" className="whitespace-nowrap flex flex-1 h-[24px]" /></Link>

            
            </div>

            

          
            </div>
            
            <div>
            

            </div>


            <div className="flex gap-2 items-center justify-center">

            {isVisible && (
        <div className="flex gap-3 h-8 border border-neutral-200 dark:border-neutral-800 px-4 rounded-md items-center">
          <Search size={16} />
          <Input className="border-0 h-full dark:bg-transparent" />
        </div>
      )}

{!loggedIn && (
  <Link to={'/signIn'}>
  <Button variant="ghost" size="sm" >
                  <LogIn className="h-4 w-4" />
                  Fazer login
                </Button></Link>
)}


{!loggedIn && (
 <Link to={'/signUp'}>
 <Button  size="sm" >
                 <LogIn className="h-4 w-4" />
                 Criar conta
               </Button></Link>
)}   <Link to={'/dashboard'}>   <Button variant="ghost" size="icon" >admin</Button></Link>
             
             <Link to={'/config'}>   <Button variant="ghost" size="icon" ></Button></Link>

             <DropdownMenu>
      <DropdownMenuTrigger asChild>

      <Button variant="ghost" size="icon" >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Menu de ações rápidas</span>
      </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex items-center gap-3" onClick={() => setTheme("light")}>
        <Sun className="h-4 w-4" /> Modo Claro
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-3" onClick={() => setTheme("dark")}>
        <Moon className="h-4 w-4" />   Modo Escuro
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-3" onClick={() => setTheme("system")}>
        <Laptop className="h-4 w-4" />  Padrão do sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    <Link to={'/dashboard'}>admin</Link>

            <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" >
                <Grip className="h-4 w-4" />
                <span className="sr-only">Menu de ações rápidas</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Menu de ações rápidas</TooltipContent>
          </Tooltip>


         

            </div>

        </header>
    )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"