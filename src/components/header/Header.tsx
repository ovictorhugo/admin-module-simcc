import { Link, useNavigate } from "react-router-dom";

import { useContext} from "react";

import { cn } from "../../lib"
import * as React from "react"



import logo_4 from '../../assets/logo_4.png';
import logo_4_white from '../../assets/logo_4_white.png';


import {
    NavigationMenuLink,
  } from "../../components/ui/navigation-menu"

  

import {  Grip, Laptop, LogIn, Moon, PanelRightOpen, Search, Sun } from "lucide-react";
import { UserContext } from "../../context/context";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

import { useTheme } from "next-themes"

import { LogoConecteeWhite } from "../svg/LogoConecteeWhite";
import { LogoConectee } from "../svg/LogoConectee";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Input } from "../ui/input";
import { SymbolEE } from "../svg/SymbolEE";
import { SymbolVPWhite } from "../svg/SymbolVPWhite";
import { SymbolVP } from "../svg/SymbolVp";
import { SymbolEEWhite } from "../svg/SymbolEEWhite";
import { useModal } from "../hooks/use-modal-store";

export function Header() {
  const {loggedIn,  setItensSelecionados} = useContext(UserContext)

  const { theme, setTheme } = useTheme()



  const navigate = useNavigate()
  


  const handleClick = () => {
    navigate('/')
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
  
const {onOpen} = useModal()

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
    
{loggedIn && (
  
  <TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
    <Button  onClick={() => onOpen('minha-area')}  variant={'ghost'} size={'icon'}><PanelRightOpen size={16}/></Button>
    </TooltipTrigger>
    <TooltipContent> Minha área</TooltipContent>
  </Tooltip>
  </TooltipProvider>
)}

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" >
                <Grip className="h-4 w-4" />
                <span className="sr-only">Menu de ações rápidas</span>
              </Button>

              
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" >
        <div className="grid gap-3 grid-cols-3">
        <Link to={'https://vitrinepatrimonio.eng.ufmg.br/'} target="_blank">
        <DropdownMenuItem className="flex flex-col justify-center px-2 py-4 cursor-pointer">
                      <div className="h-8 mb-4">{(theme ==  'dark' ) ? (<SymbolVPWhite />):(<SymbolVP />)}</div>
                      <div className="flex  text-xs font-medium max-w-[70px] truncate  text-center"> Vitrine Patrimônio</div>
                      </DropdownMenuItem></Link>

                      <Link to={'https://conectee.eng.ufmg.br/'} target="_blank">
        <DropdownMenuItem className="flex flex-col justify-center px-2 py-4 cursor-pointer">
                      <div className="h-8 mb-4">{(theme ==  'dark' ) ? (<SymbolEEWhite />):(<SymbolEE />)}</div>
                      <div className="flex  text-xs font-medium max-w-[70px]  truncate text-center"> Conectee</div>
                      </DropdownMenuItem></Link>

                      <Link to={'/'}>
        <DropdownMenuItem className="flex flex-col justify-center px-2 py-4 cursor-pointer">
                      <div className="h-8 mb-4"></div>
                      <div className="flex  text-xs font-medium max-w-[70px]  truncate text-center"> CEGRADEE</div>
                      </DropdownMenuItem></Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>


         

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