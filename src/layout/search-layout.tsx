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
import { BarChartBig, Blocks, BookOpen, Bug, Building2, Download, GraduationCap, Home, Info, InfoIcon, Link2, List, PanelLeftDashed, SearchCheck, Sparkles, UserPlus, X } from "lucide-react";


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
import { Link, useLocation } from "react-router-dom";
import { useModalSecundary } from "../components/hooks/use-modal-store-secundary";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";

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
  
  const {isCollapsed, setIsCollapsed, version, permission, pesquisadoresSelecionados} = useContext(UserContext)
  
 
  const {onOpen, isOpen, type: typeModal } = useModal()
  const {onOpen:onOpenSecundary } = useModalSecundary()

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

      if (!hasVisited && (!isOpen)) {
          // Se não foi exibido, abre o modal
          setIsModalOpen(true);
          // Marca no localStorage que o modal foi exibido
          localStorage.setItem('hasVisited', 'true');
      }
  }, []);

  const handleClose = () => {
      setIsModalOpen(false);
  };

//cookies
  useEffect(() => {
    // Verifica no localStorage se o modal já foi exibido
    const hasVisited = localStorage.getItem('cookies');

    if (!hasVisited ) {
        // Se não foi exibido, abre o modal
        onOpenSecundary('cookies')
        // Marca no localStorage que o modal foi exibido
        localStorage.setItem('cookies', 'true');
    }
}, []);

///BUG
const location = useLocation();

useEffect(() => {
  if(location.pathname == '/relatar-problema') {
  onOpen('relatar-problema')
} else  if(location.pathname == '/pesquisadores-selecionados') {
  onOpen('pesquisadores-selecionados')
} 
}, [location]);

const links = [
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
    title: "Pesquisar com IA",
    label: "",
    icon: Sparkles,
    link: "/resultados-ia",
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
    title: "Listagens",
    label: "",
    icon: Download,
    link: "/listagens",
  },
  {
    title: "Produções recentes",
    label: "",
    icon: BookOpen,
    link: "/producoes-recentes",
  },
]

const links2 = [

  ...(version
    ? [
      {
        title: "Departamentos",
        label: "",
        icon: Building2,
        link: "/departamentos",
      },
      ]
    : []),

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
  {
    title: "Painéis de dados externos",
    label: "",
    icon: Link2,
    link: "/paines-dados-externos",
  },
]

const hasBaremaAvaliacao = permission.some(
  (perm) => perm.permission === 'criar_barema_avaliacao'
);


const links3 = [
  ...(hasBaremaAvaliacao
    ? [
        {
          title: "Pesquisadores selecionados",
          label: `${pesquisadoresSelecionados.length == 0 ? (''):(pesquisadoresSelecionados.length)}`,
          icon: UserPlus,
          link: "/pesquisadores-selecionados",
        },
      ]
    : []),

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
]

    return (
    <div>
      
      <SidebarProvider className="  bg-sidebar   ">

      <AppSidebar />

          <SidebarInset className="bg-sidebar ">
          <main className="flex-1  flex flex-col h-full ">
            {/* Assuming Header is another component */}
            <Header />
            
            <div className="h-full ">
            {children}
            </div>

          <Footer/>
          </main>

          </SidebarInset>

        

        <Toaster/>
  
      </SidebarProvider >


      <Dialog open={isModalOpen} >
            <DialogContent className="p-0 ">
              <div className="h-[300px] w-full bg-cover bg-no-repeat bg-center"  style={{ backgroundImage: `url(${bg_popup})` }}></div>
                <DialogHeader className="p-6">
                    <DialogTitle className="text-2xl font-medium">Apresentamos a plataforma {version ? ('Conectee'):('Iapós')}</DialogTitle>
                    <DialogDescription>
                        O jeito mais fácil de visualizar e filtrar as produções técnicas e bibliográficas dos pesquisadores {version ? ('da Escola de Engenharia da UFMG'):('do SENAI CIMATEC')}.
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
  