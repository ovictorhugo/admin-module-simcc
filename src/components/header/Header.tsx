import { Link, useLocation, useNavigate } from "react-router-dom";

import { useContext} from "react";

import { cn } from "../../lib"
import * as React from "react"



import logo_4 from '../../assets/logo_4.png';
import logo_4_white from '../../assets/logo_4_white.png';

import logo_5 from '../../assets/logo_cimatec.png';
import logo_5_white from '../../assets/logo_cimatec_white.png';


import {
    NavigationMenuLink,
  } from "../../components/ui/navigation-menu"

  

import {  Grip, Laptop, LayoutDashboard, LogIn, Moon,   Sun, User, UserPlus } from "lucide-react";
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
import { LogoIapos } from "../svg/LogoIapos";
import { LogoIaposWhite } from "../svg/LogoIaposWhite";
import { CaretLeft, Funnel, MagnifyingGlass } from "phosphor-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Header() {
  const {loggedIn,  setItensSelecionados, version, searchType , maria, user, permission} = useContext(UserContext)

  const { theme, setTheme } = useTheme()

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
    setItensSelecionados([])
  }

  const location = useLocation();
  const isVisible = location.pathname != '/' && location.pathname != '/resultados' && location.pathname != '/marIA'

const {onOpen} = useModal()

    return(
      <header className={`h-[50px]  z-[3] flex justify-between border-b border-neutral-200 dark:border-neutral-800 px-4   items-center sticky top-0 `}>
      <div className="  flex items-center h-12 gap-4">
      <div className="flex gap-3 items-center h-full justify-center ">
          {version ? (
              <Link to={"/"} className="h-[18px]  " onClick={() => handleClick()} >{(theme ==  'dark' ) ? (<LogoConecteeWhite />):(<LogoConectee />)}</Link>
          ):(
            <Link to={"/"} className="h-[18px]  " onClick={() => handleClick()} >{(theme ==  'dark' ) ? (<LogoIaposWhite />):(<LogoIapos />)}</Link>
          )}

            <div className="h-4 w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>

           
            {version ? (
              <Link to={""} target="_blank" className=" whitespace-nowrap "><img src={(theme ==  'dark' ) ? (logo_4_white):(logo_4)} alt="" className="whitespace-nowrap flex flex-1 h-[24px]" /></Link>
          ):(
            <Link to={""} target="_blank" className=" whitespace-nowrap "><img src={(theme ==  'dark' ) ? (logo_5_white):(logo_5)} alt="" className="whitespace-nowrap flex flex-1 h-[24px]" /></Link>
          )}
            
            </div>

            

          
            </div>
            
            <div>
            

            </div>


            <div className="flex gap-1 items-center justify-center">

            {isVisible && (
        <div onClick={() => onOpen('search')} className="flex  h-8 border border-neutral-200 dark:border-neutral-800 px-1 bg-white dark:bg-neutral-950 rounded-md items-center">
          <MagnifyingGlass size={16} className="w-8" />
          <Input className="border-0 h-full flex flex-1 dark:bg-transparent" placeholder="Fazer pesquisa..." />
<p className="bg-neutral-100 rounded-md text-[10px] mr-1  dark:bg-neutral-800 h-6 flex items-center justify-center px-2">Ctrl + Q</p>
          <Button variant="outline"  className={` h-6 w-6 ${searchType == 'article'  && ('bg-blue-500 dark:bg-blue-500')} ${searchType == 'abstract'  && ('bg-yellow-500 dark:bg-yellow-500')} ${maria && ('bg-[#82AAC0]   dark:bg-[#82AAC0]  ')} ${searchType == 'speaker'  && ('bg-orange-500 dark:bg-orange-500')} ${searchType == 'book'  && ('bg-pink-500 dark:bg-pink-500')} ${searchType == 'patent'  && ('bg-cyan-500 dark:bg-cyan-500')} ${searchType == 'name'  && ('bg-red-500 dark:bg-red-500')} ${searchType == 'area'  && ('bg-green-500 dark:bg-green-500')} ${searchType == ''  && ('bg-blue-700 dark:bg-blue-700')} text-white border-0 `} size={'icon'}>
       <Funnel size={10} className="" /> 
       
        </Button>
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
                 <UserPlus className="h-4 w-4" />
                 Criar conta
               </Button></Link>
)}  
           

           {(loggedIn && permission.length > 0) && (
  <Link to={'/dashboard'}>
  <Button variant="ghost" size="sm" className="h-10" >
                  <LayoutDashboard className="h-4 w-4" />
                  Console
                </Button></Link>
)}

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
    
{loggedIn && (
  
  <TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
    <Button  onClick={() => onOpen('minha-area')}  variant={'ghost'} className="px-2" >
    <CaretLeft size={16}/>
    <Avatar className="cursor-pointer rounded-md  h-6 w-6">
      <AvatarImage  className={'rounded-md h-6 w-6'} src={`${user?.photo_url}`} />
      <AvatarFallback className="flex items-center justify-center"><User size={16}/></AvatarFallback>
  </Avatar>
      </Button>
    </TooltipTrigger>
    <TooltipContent> Minha área</TooltipContent>
  </Tooltip>
  </TooltipProvider>
)}

   


         

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