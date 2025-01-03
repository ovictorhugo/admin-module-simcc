import * as React from "react"
import {
  AudioWaveform,
  BarChartBig,
  Blocks,
  BookOpen,
  Bot,
  Bug,
  Building2,
  ClipboardEdit,
  Command,
  Download,
  File,
  FlaskConical,
  Frame,
  GalleryVerticalEnd,
  GraduationCap,
  Home,
  Info,
  LayoutDashboard,
  Link2,
  List,
  Mail,
  Map,
  Pencil,
  PieChart,
  SearchCheck,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  SquareTerminal,
  UserPlus,
  Users,
  Weight,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar"
import { UserContext } from "../context/context"
import { useContext} from "react";
import { AccountSwitcher } from "./navigation/user-list"
import { DotsThree } from "phosphor-react"
// This is sample data.

export function AppSidebarAdmin({ ...props }: React.ComponentProps<typeof Sidebar>) {
 const {urlGeral, user, version, permission} = useContext(UserContext)
 
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

const has_atualizar_apache_hop = permission.some(
  (perm) => perm.permission === 'atualizar_apache_hop'
);

const data = {
    user: {
      name: user?.display_name || '',
      email: user?.email || '',
      avatar: user?.photo_url || '',
    },
   
    navMain: [
      {
        title: "Editar informações",
        url: "/",
        icon: Pencil,
        isActive: true,
        items: [
       

        ...(has_visualizar_pesquisadores
          ? [
              
          {
            title: "Pesquisadores",
            url: "/dashboard/pesquisadores",
            icon: Users
          },
        ]
        : []),

        ...(has_visualizar_todos_programas
          ? [
              
          {
            title: "Programas",
            url: "/dashboard/programas",
            icon:GraduationCap,
          },
        ]
        : []),
          
        ...(has_visualizar_todos_departamentos
          ? [
              
          {
            title: "Departamentos",
            url: "/dashboard/departamentos",
            icon:Building2,
          },
        ]
        : []),
        ...(has_visualizar_inct
          ? [
            {
              title: "INCT's",
              icon: FlaskConical,
              url: "/dashboard/inct",
            },
            ]
          : []),
        ],
      },
      {
        title: "A",
        url: "/",
        icon: SquareTerminal,
        isActive: true,
        items: [
          ...(has_editar_pesos_avaliacao
            ? [
              {
                title: "Pesos de avaliação",
 
                icon: Weight,
                url: "/dashboard/pesos-avaliacao",
              },
              ]
            : []),
            ...(hasBaremaAvaliacao
              ? [
                  {
                    title: "Baremas",
                    icon: ClipboardEdit,
                    url: "/dashboard/baremas",
                  },
                ]
              : []),
              ...(hasNotificacoes
                ? [
                   {
                        title: "Enviar notificações",
                        icon: Mail,
                        url: "/dashboard/enviar-notificacoes",
                      },
                  ]
                : []),
        ],
      },

      {
        title: "Outros",
        url: "/",
        icon: DotsThree,
        isActive: true,
        items: [
          {
            title: "Selecionados",
            url: "/dashboard/pesquisadores-selecionados",
            icon: UserPlus
          },
          {
            title: "Relatar problema",
            url: "/dashboard/relatar-problema",
            icon: Bug
          },
          {
            title: "Informações",
            url: "/dashboard/informacoes",
            icon: Info
          },
        ],
      },
   
      
     
    ],
    projects: [
      {
        name: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      ...(has_visualizar_gerencia_modulo_administrativo
        ? [
      {
        name: "Administrativo",
        url: "/dashboard/administrativo",
        icon: SlidersHorizontal
      },
    ]
    : []),
      
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AccountSwitcher/>
      </SidebarHeader>
      <SidebarContent>
      <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
