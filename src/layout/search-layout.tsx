import { Toaster } from "sonner";
import { Header } from "../components/header/Header";
import { NavigationSidebar } from "../components/navigation/navigation-sidebar";

import { TooltipProvider } from "../components/ui/tooltip"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable"
import { cn } from "../lib"
import bg_popup from '../assets/bg_welcome.png';

import { useContext, useEffect, useState} from "react";
import { UserContext } from "../context/context";
import { AccountSwitcher } from "../components/navigation/user-list";
import { BarChartBig, Blocks, BookOpen, Bug, Building2, GraduationCap, Home, Info, InfoIcon, List, PanelLeftDashed, SearchCheck, Sparkles, X } from "lucide-react";


import { Footer } from "../components/footer/footer";
import { useModal } from "../components/hooks/use-modal-store";
import { Button } from "../components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog"
import { Link } from "react-router-dom";

interface MailProps {
 
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children:React.ReactNode
}
export default function SearchLayout({

  defaultLayout = [265, 440, 655],
  defaultCollapsed = true,
  navCollapsedSize,
  children
}: MailProps) {
  
  const {isCollapsed, setIsCollapsed} = useContext(UserContext)
  
 
  const {onOpen} = useModal()

  useEffect(() => {
    // Função que será chamada quando o evento de teclado ocorrer
    const handleKeyDown = (event:any) => {
      // Verifica se Ctrl + Y foi pressionado
      if (event.ctrlKey && event.key === 'q') {
        onOpen('search')
      }
    };

    // Adiciona o listener de evento quando o componente é montado
    window.addEventListener('keydown', handleKeyDown);

    // Remove o listener de evento quando o componente é desmontado
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  ///popup

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
      // Verifica no localStorage se o modal já foi exibido
      const hasVisited = localStorage.getItem('hasVisited');

      if (!hasVisited) {
          // Se não foi exibido, abre o modal
          setIsModalOpen(true);
          // Marca no localStorage que o modal foi exibido
          localStorage.setItem('hasVisited', 'true');
      }
  }, []);

  const handleClose = () => {
      setIsModalOpen(false);
  };

    return (
    <div>
      
        <TooltipProvider delayDuration={0}>

       

<ResizablePanelGroup

        direction="horizontal"
        onLayout={() => defaultLayout}
        className="h-full  items-stretch"
      >

<ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => { // Função sem parâmetros
            setIsCollapsed(true);
          }}
          onExpand={() => { // Função para expandir também sem parâmetros
            setIsCollapsed(false);
          }}
          className={cn('flex flex-col justify-between', isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out ")}
          >
  
  <div>
  <div className={cn("flex h-[50px] gap-1 items-center justify-center border-b border-b-neutral-200 dark:border-b-neutral-800", isCollapsed ? 'h-[50px]': 'px-2')}>
  <AccountSwitcher isCollapsed={isCollapsed}  />

  {!isCollapsed && (
                <Button 
                  onClick={() => {
                    setIsCollapsed(true)
                  }} 
                  variant="ghost" 
                  size="icon"
                >
                  <PanelLeftDashed className="h-4 w-4" />
                  <span className="sr-only">Recolher Menu</span>
                </Button>
              )}
            </div>
  
          
          <NavigationSidebar
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Página inicial",
                label: "",
                icon: Home,
                link: "/",
              },
              {
                title: "Pesquisar",
                label: "",
                icon: SearchCheck,
                link: "/resultados",
              },
              {
                title: "MarIA",
                label: "",
                icon: Sparkles,
                link: "/marIA",
              },
              {
                title: "Indicadores",
                label: "",
                icon: BarChartBig,
                link: "/indicadores",
              },
              {
                title: "Dicionário",
                label: "",
                icon: List,
                link: "/dicionario",
              },
              {
                title: "Produções recentes",
                label: "",
                icon: BookOpen,
                link: "/producoes-recentes",
              },
             
            ]}
          />

          <div className="w-full h-[0.5px] bg-neutral-200 dark:bg-neutral-800"></div>
  

          <NavigationSidebar
            isCollapsed={isCollapsed}
            links={[
              
              {
                title: "Departamentos",
                label: "",
                icon: Building2,
                link: "/departamentos",
              },

              {
                title: "Pós-graduação",
                label: "",
                icon: GraduationCap,
                link: "/pos-graduacao",
              },

              {
                title: "Grupos de pesquisa",
                label: "",
                icon: Blocks,
                link: "/grupos-pesquisa",
              },
             
            ]}
          />
</div>

<div className="flex flex-col ">
          <NavigationSidebar
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Relatar problema",
                label: "",
                icon: Bug,
                link: "/relatar-problema",
              },
              {
                title: "Informações",
                label: "",
                icon: Info,
                link: "/informacoes",
              },
           
             
            ]}
          />

          </div>
          
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30} className="h-screen">
            <main className="flex-1  flex flex-col h-full">
            {/* Assuming Header is another component */}
            <Header />
            
            <div className="h-full overflow-y-auto overflow-x-hidden flex flex-1">
            {children}
            </div>

          <Footer/>
          </main>

          </ResizablePanel>

        

        <Toaster/>
        </ResizablePanelGroup>
      </TooltipProvider >


      <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="p-0">
              <div className="h-[300px] w-full bg-cover bg-no-repeat bg-center"  style={{ backgroundImage: `url(${bg_popup})` }}></div>
                <DialogHeader className="p-6">
                    <DialogTitle className="text-2xl font-medium">Apresentamos a plataforma Conectee</DialogTitle>
                    <DialogDescription>
                        O jeito mais fácil de visualizar e filtrar as produções técnicas e bibliográficas dos pesquisadores da Escola de Engenharia da UFMG.
                    </DialogDescription>
                   <div className="flex pt-6 items-center justify-between">
                 <div></div>

                   <div className="flex gap-3">
                   <Link to={'/informacoes'}> <Button variant={'ghost'}><InfoIcon size={16}/> Informações</Button></Link>
                   <Button onClick={handleClose}><X size={16}/>Continuar</Button>
                   </div>
                   </div>
                </DialogHeader>
                
            </DialogContent>
        </Dialog>
    </div>
    );
  };
  
