import { Toaster } from "sonner";
import { Header } from "../components/header/Header";
import { NavigationSidebar } from "../components/navigation/navigation-sidebar";
import { SidebarProvider } from "../components/provider/sidebar-provider";
import { Search } from "../components/search/search";
import { GraficoHome } from "../components/homepage/grafico-home";

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="h-full flex">

<div className=" ">
          <div className=" overflow-hidden h-screen w-full absolute">
            <GraficoHome/>
          </div>
          </div>

        <NavigationSidebar />
        <main className="flex-1  flex flex-col">
          {/* Assuming Header is another component */}
          <Header />
          <div className="flex h-full ">
          <SidebarProvider/>
          {children}
          
       
          
          </div>

          <Search/>
        </main>

        <Toaster/>
       
      </div>
    );
  };
  
  export default SearchLayout;