import { Toaster } from "sonner";
import { Header } from "../components/header/Header";
import { NavigationSidebar } from "../components/navigation/navigation-sidebar";


import { TooltipProvider } from "../components/ui/tooltip"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable"
import { cn } from "../lib"


import { useContext, useEffect } from "react";
import { UserContext } from "../context/context";
import { AccountSwitcher } from "../components/navigation/user-list";
import { Blocks,  Building2, ClipboardEdit, FlaskConical, GraduationCap,  Info, LayoutDashboard,  Mail, PieChart,  User, Users, Weight } from "lucide-react";

import { UserConfigHeader } from "../components/header/user-config-header";
import { useLocation } from "react-router-dom";

interface MailProps {
 
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children:React.ReactNode
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}



export default function AdminLayout({

  defaultLayout = [265, 440, 655],
  defaultCollapsed = true,
  navCollapsedSize,
  children
}: MailProps) {
  
  const {isCollapsed, setIsCollapsed, permission, pesquisadoresSelecionados, user, setPermission, urlGeralAdm} = useContext(UserContext)
  

  //permissoes
  const hasBaremaAvaliacao = permission.some(
    (perm) => perm.permission === 'criar_barema_avaliacao'
  );

  const hasNotificacoes = permission.some(
    (perm) => perm.permission === 'enviar_notificacoes'
  );

  const has_visualizar_pesquisadores = permission.some(
    (perm) => perm.permission === 'visualizar_pesquisadores'
  );

  const has_visualizar_todos_departamentos = permission.some(
    (perm) => perm.permission === 'visualizar_todos_departamentos'
  );

  const has_visualizar_modulo_administrativo = permission.some(
    (perm) => perm.permission === 'visualizar_modulo_administrativo'
  );

  const has_visualizar_gerencia_modulo_administrativo = permission.some(
    (perm) => perm.permission === 'visualizar_gerencia_modulo_administrativo'
  );


  const has_visualizar_todos_programas = permission.some(
    (perm) => perm.permission === 'visualizar_todos_programas'
  );

  const has_visualizar_grupos_pesquisa = permission.some(
    (perm) => perm.permission === 'visualizar_grupos_pesquisa'
  );

  const has_visualizar_inct = permission.some(
    (perm) => perm.permission === 'visualizar_inct'
  );

  const has_editar_pesos_avaliacao = permission.some(
    (perm) => perm.permission === 'editar_pesos_avaliacao'
  );

  const has_visualizar_indicadores_instituicao = permission.some(
    (perm) => perm.permission === 'visualizar_indicadores_instituicao'
  );

  const links2 = [
    {
      title: "Dashboard",
      label: "",
      icon: LayoutDashboard,
      link: "/dashboard",
    },

    ...(has_visualizar_gerencia_modulo_administrativo
      ? [
          {
            title: "Administrativo",
            label: "",
            icon: LayoutDashboard,
            link: "/dashboard/administrativo",
          },
        ]
      : []),

      ...(has_visualizar_todos_departamentos
        ? [
          {
            title: "Departamentos",
            label: "",
            icon: Building2,
            link: "/dashboard/departamentos",
          },
          ]
        : []),

    ...(has_visualizar_pesquisadores
      ? [
          {
            title: "Pesquisadores",
            label: "",
            icon: Users,
            link: "/dashboard/pesquisadores",
          },
        ]
      : []),


      ...(has_visualizar_todos_programas
        ? [
          {
            title: "Programas",
            label: "",
            icon: GraduationCap,
            link: "/dashboard/programas",
          },
          ]
        : []),

        ...(has_visualizar_grupos_pesquisa
          ? [
            {
              title: "Grupos de pesquisa",
              label: "",
              icon: Blocks,
              link: "/dashboard/grupos-pesquisa",
            },
            ]
          : []),

          ...(has_visualizar_inct
            ? [
              {
                title: "INCT's",
                label: "",
                icon: FlaskConical,
                link: "/dashboard/inct",
              },
              ]
            : []),


            ...(has_editar_pesos_avaliacao
              ? [
                {
                  title: "Pesos de avaliação",
                  label: "",
                  icon: Weight,
                  link: "/dashboard/pesos-avaliacao",
                },
                ]
              : []),

        
              ...(has_visualizar_indicadores_instituicao
                ? [
                  {
                    title: "Indicadores",
                    label: "",
                    icon: PieChart,
                    link: "/dashboard/indicadores",
                  },
                  ]
                : []),


  ]

  const links = [
    ...(hasBaremaAvaliacao
      ? [
          {
            title: "Baremas",
            label: `${pesquisadoresSelecionados.length == 0 ? (''):(pesquisadoresSelecionados.length)}`,
            icon: ClipboardEdit,
            link: "/dashboard/baremas",
          },
        ]
      : []),

      ...(hasNotificacoes
        ? [
           {
                title: "Enviar notificações",
                label: "",
                icon: Mail,
                link: "/dashboard/enviar-notificacoes",
              },
          ]
        : []),
  ];
  
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
<div className={cn("flex h-[50px] items-center justify-center border-b border-b-neutral-200 dark:border-b-neutral-800", isCollapsed ? 'h-[50px]': 'px-2')}>
<AccountSwitcher isCollapsed={isCollapsed}  />
          </div>

          <NavigationSidebar
            isCollapsed={isCollapsed}
            links={links2}
          />

          <div className="w-full h-[0.5px] bg-neutral-200 dark:bg-neutral-800"></div>
  

          <NavigationSidebar isCollapsed={isCollapsed} links={links} />
</div>

<div className="flex flex-col ">
          <NavigationSidebar
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Informações",
                label: "",
                icon: Info,
                link: "/dashboard/informacoes",
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
            
            <div className="h-full overflow-y-auto flex flex-1">
            {children}
            </div>

          
          </main>

          </ResizablePanel>

        

        <Toaster/>
        </ResizablePanelGroup>
      </TooltipProvider >
    </div>
    );
  };
  
