import { Header } from "../components/header/Header";
import { NavigationSidebar } from "../components/navigation/navigation-sidebar";
import { SidebarProvider } from "../components/provider/sidebar-provider";
import { Toaster } from "../components/ui/sonner";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-full flex ">
        <NavigationSidebar />
        <main className="flex-1  flex flex-col ">
          {/* Assuming Header is another component */}
          <Header />
          <div className="flex h-full">
          <SidebarProvider/>
          {children}
          </div>
        </main>

        <Toaster/>
      </div>
    );
  };
  
  export default AdminLayout;