import { Toaster } from "sonner";
import { Header } from "../components/header/Header";
import { NavigationSidebar } from "../components/navigation/navigation-sidebar";
import { SidebarProvider } from "../components/provider/sidebar-provider";
import { Search } from "../components/search/search";
import { GraficoHome } from "../components/homepage/grafico-home";
import { useModalHomepage } from "../components/hooks/use-modal-homepage";
import { TooltipProvider } from "../components/ui/tooltip"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable"
import { cn } from "../lib"
import { Info, List, Users } from "phosphor-react";
import { Separator } from "../components/ui/separator";
import { useState } from "react";
interface MailProps {
 
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
  children:React.ReactNode
}
export default function AdminLayout({

  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
  children
}: MailProps) {
  
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  
  const { isOpen: isOpenHomepage, type: typeHomepage } = useModalHomepage();
  const isModalOpen = isOpenHomepage && typeHomepage === "initial-home";

    return (
      <TooltipProvider delayDuration={0}>

<ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-[800px] items-stretch"
      >

<ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={(collapsed) => {
            setIsCollapsed(collapsed)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              collapsed
            )}`
          }}
          className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out")}
        >

<div className={cn("flex h-[52px] items-center justify-center", isCollapsed ? 'h-[52px]': 'px-2')}>
          
          </div>

          <NavigationSidebar
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Inbox",
                label: "128",
                icon: Users,
                variant: "default",
              },
              {
                title: "Drafts",
                label: "9",
                icon: Users,
                variant: "ghost",
              },
              {
                title: "Sent",
                label: "",
                icon: Users,
                variant: "ghost",
              },
              {
                title: "Junk",
                label: "23",
                icon: Users,
                variant: "ghost",
              },
              {
                title: "Trash",
                label: "",
                icon: Users,
                variant: "ghost",
              },
              {
                title: "Archive",
                label: "",
                icon: Users,
                variant: "ghost",
              },
            ]}
          />
          <Separator />

          <NavigationSidebar
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Social",
                label: "972",
                icon: Users,
                variant: "ghost",
              },
              {
                title: "Updates",
                label: "342",
                icon: Users,
                variant: "ghost",
              },
              {
                title: "Forums",
                label: "128",
                icon: Users,
                variant: "ghost",
              },
              {
                title: "Shopping",
                label: "8",
                icon: Users,
                variant: "ghost",
              },
              {
                title: "Promotions",
                label: "21",
                icon: Users,
                variant: "ghost",
              },
            ]}
          />

          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
            <main className="flex-1  flex flex-col">
            {/* Assuming Header is another component */}
            <Header />
            <div className="flex h-full ">
            <SidebarProvider/>
            {children}
            
        
            
            </div>


          </main>

          </ResizablePanel>

        

        <Toaster/>
        </ResizablePanelGroup>
      </TooltipProvider >
    );
  };
  
