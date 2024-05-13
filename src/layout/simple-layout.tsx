import { Header } from "../components/header/Header";
import { useModalHomepage } from "../components/hooks/use-modal-homepage";
import { NavigationSidebar } from "../components/navigation/navigation-sidebar";
import { SidebarProvider } from "../components/provider/sidebar-provider";
import { Toaster } from "../components/ui/sonner";
import bg_popup from '../assets/bg_popup.png';

const SimpleLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen: isOpenHomepage, type: typeHomepage } = useModalHomepage();
  const isModalOpenBarema = isOpenHomepage && typeHomepage === "baremas";

    return (
      <div className="h-full flex">


        <NavigationSidebar />
        <main className="flex-1  flex flex-col">
          {/* Assuming Header is another component */}
          <Header />
          <div className="flex h-full ">
          <SidebarProvider/>
          {children}
          </div>
        </main>

        <Toaster/>
      </div>
    );
  };
  
  export default SimpleLayout;