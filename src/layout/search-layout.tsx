import { Toaster } from "sonner";
import { Header } from "../components/header/Header";
import { NavigationSidebar } from "../components/navigation/navigation-sidebar";
import { SidebarProvider } from "../components/provider/sidebar-provider";
import { Search } from "../components/search/search";
import { GraficoHome } from "../components/homepage/grafico-home";
import { useModalHomepage } from "../components/hooks/use-modal-homepage";


const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen: isOpenHomepage, type: typeHomepage } = useModalHomepage();
  const isModalOpen = isOpenHomepage && typeHomepage === "initial-home";

    return (
      <div className="h-full flex">

<div className=" ">
{isModalOpen && (
  <div className=" overflow-hidden h-screen w-full absolute">
            <GraficoHome/>
          </div>
)}


          
          </div>

        <NavigationSidebar />
        <main className="flex-1  flex flex-col">
          {/* Assuming Header is another component */}
          <Header />
          <div className="flex h-full ">
          <SidebarProvider/>
          {children}
          
       
          
          </div>

         {typeHomepage != "initial-home" && (
          <Search/>
         )}
        </main>

        <Toaster/>
       
      </div>
    );
  };
  
  export default SearchLayout;