import * as React from "react"
import {
  AudioWaveform,
  BarChartBig,
  Blocks,
  BookOpen,
  Bot,
  Bug,
  Building2,
  Command,
  Download,
  Frame,
  GalleryVerticalEnd,
  GraduationCap,
  Home,
  Info,
  Link2,
  List,
  Map,
  PieChart,
  SearchCheck,
  Settings2,
  Sparkles,
  SquareTerminal,
  UserPlus,
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
 const {urlGeral, user, version} = useContext(UserContext)
 
  const data = {
    user: {
      name: user?.display_name || '',
      email: user?.email || '',
      avatar: user?.photo_url || '',
    },
   
    navMain: [
      {
        title: "Playground",
        url: "/",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Indicadores",
            url: "/indicadores",
            icon: BarChartBig
          },
       
          {
            title: "Dicionário",
            url: "/dicionario",
            icon: List
          },
          {
            title: "Listagens",
            url: "/listagens",
            icon: Download
          },
          {
            title: "Produções recentes",
            url: "/producoes-recentes",
            icon: BookOpen
          },

          {
            title: "Dados externos",
            url: "/paines-dados-externos",
            icon: Link2
          },
        ],
      },
      {
        title: "Playground",
        url: "/",
        icon: SquareTerminal,
        isActive: true,
        items: [
          ...(version
            ? [
              {
                title: "Departamentos",
                url: "/departamentos",
                icon:Building2
              },
              ]
            : []),
          {
            title: "Pós-graduação",
            url: "/pos-graduacao",
            icon: GraduationCap
          },
          {
            title: "Grupos de pesquisa",
            url: "/grupos-pesquisa",
            icon: Blocks
          },
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
            url: "/pesquisadores-selecionados",
            icon: UserPlus
          },
          {
            title: "Relatar problema",
            url: "/relatar-problema",
            icon: Bug
          },
          {
            title: "Informações",
            url: "/informacoes",
            icon: Info
          },
        ],
      },
   
      
     
    ],
    projects: [
      {
        name: "Página Inicial",
        url: "/",
        icon: Home,
      },
      {
        name: "Pesquisar",
        url: "/resultados",
        icon: SearchCheck,
      },
      {
        name: "Pesquisar com IA",
        url: "/resultados-ia",
        icon: Sparkles,
      },
      
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
