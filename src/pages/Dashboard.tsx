
import { useContext, useEffect } from "react";
import { DashboardProvider } from "../components/provider/dashboard-provider";
import AdminLayout from "../layout/admin-layout";
import { useLocation } from "react-router-dom";
import { useModalDashboard } from "../components/hooks/use-modal-dashboard";
import { UserContext } from "../context/context";


export function Dashboard() {

    const { onOpen } = useModalDashboard();
    const {isCollapsed, navCollapsedSize, defaultLayout} = useContext(UserContext)

    const location = useLocation();
    

    useEffect(() => {
        if(location.pathname == '/dashboard') {
            onOpen('general')
        } else if (location.pathname == '/config') {
            onOpen('master')
        } else if (location.pathname == '/dashboard/programas') {
            onOpen('graduate-program')
        } else if (location.pathname == '/dashboard/departamentos') {
            onOpen('departamento')
        } else if (location.pathname == '/dashboard/pesquisadores') {
            onOpen('researcher')
        } else if (location.pathname == '/dashboard/pesos-avaliacao') {
            onOpen('peso-producao')
        } else if (location.pathname == '/dashboard/grupos-pesquisa') {
            onOpen('grupo-pesquisa')
        } else if (location.pathname == '/dashboard/indicadores') {
            onOpen('indicadores')
        }
    }, [location]);
  
    return(
        <>
        <AdminLayout
         defaultLayout={defaultLayout}
         defaultCollapsed={isCollapsed}
         navCollapsedSize={navCollapsedSize}
        >
            <DashboardProvider/>
        </AdminLayout>
        </>
    )
}