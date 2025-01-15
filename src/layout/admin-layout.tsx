import { Toaster } from "sonner";

import { toast } from "sonner"

import { useContext,  useEffect,  useState } from "react";
import { UserContext } from "../context/context";
import { AccountSwitcher } from "../components/navigation/user-list";
import { Blocks,  Bug,  Building2, ChevronDown, ChevronUp, ClipboardEdit, File, FlaskConical, GraduationCap,  Info, LayoutDashboard,  Mail, PieChart,  Play,  SlidersHorizontal,  Terminal,   UserPlus,   Users, Weight } from "lucide-react";

import { useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ApacheViewDashboard } from "../components/dashboard/apache-view-dashboard";
import { useModal } from "../components/hooks/use-modal-store";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import { AppSidebarAdmin } from "../components/app-sidebar-admin";
import { SidebarRight } from "../components/sidebar-right";

interface MailProps {
 
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children:React.ReactNode
}

export default function AdminLayout({

  defaultLayout = [265, 440, 655],
  defaultCollapsed = true,
  navCollapsedSize,
  children
}: MailProps) {
  
  const {isCollapsed, setIsCollapsed, permission, pesquisadoresSelecionados,  urlGeralAdm} = useContext(UserContext)
  

  //permissoes


  const has_atualizar_apache_hop = permission.some(
    (perm) => perm.permission === 'atualizar_apache_hop'
  );

 

 

  const location = useLocation()
  const [isOpenConsole, setIsOpenConsole] = useState(false)

  const {onOpen} = useModal()

useEffect(() => {
  if(location.pathname == '/dashboard/relatar-problema') {
  onOpen('relatar-problema')
} else  if(location.pathname == '/dashboard/pesquisadores-selecionados') {
  onOpen('pesquisadores-selecionados')
} 
}, [location]);

  //apache

  const handleSubmit = async () => {

    const data = [
      {
          state:true
      }
    ]

    let urlProgram = urlGeralAdm + 's/hop'
    const fetchData = async () => {
    try {
      const response = await fetch(urlProgram, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '3600',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
       
        toast("Apache hop iniciado", {
            description: "Atualizando dados dos pesquisadores",
            action: {
              label: "Fechar",
              onClick: () => { console.log("Undo"); }
            },
          });
       
      } else if (response.status === 423) {
          toast("O Apache hop já está rodando, tente novamente mais tarde", {
              description: "Em processo de atualização dos dados dos pesquisadores",
              action: {
                label: "Fechar",
                onClick: () => { console.log("Undo"); }
              },
          });
      } else {
          toast("Erro ao iniciar o Apache Hop", {
              description: "Tente novamente mais tarde",
              action: {
                label: "Fechar",
                onClick: () => { console.log("Undo"); }
              },
            });
      }
      
    } catch (err) {
      console.log(err);
    } 
   }
  
  fetchData();
};



    return (
    <div>
      
    <SidebarProvider className="    " defaultOpen={true} open={isCollapsed} onOpenChange={() => setIsCollapsed((prev) => !prev)} >

<AppSidebarAdmin />

  

<SidebarInset className="" props2={<SidebarRight />}>
<main className="h-full flex flex-col flex-1 ">
            {/* Assuming Header is another component */}
         
            
            <div className="h-full ">
            {children}
            </div>
             
          
          </main>
        
          </SidebarInset>
         
         

        <Toaster />
   
      </SidebarProvider  >
    </div>
    );
  };
