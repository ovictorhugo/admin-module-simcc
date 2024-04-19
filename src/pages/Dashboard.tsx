
import { useEffect } from "react";
import { DashboardProvider } from "../components/provider/dashboard-provider";
import AdminLayout from "../layout/admin-layout";
import { useLocation } from "react-router-dom";
import { useModalDashboard } from "../components/hooks/use-modal-dashboard";


export function Dashboard() {

    const { onOpen } = useModalDashboard();
    

    const location = useLocation();
    

    useEffect(() => {
        if(location.pathname == '/admin') {
            onOpen('general')
        } else if (location.pathname == '/config') {
            onOpen('master')
        } else if (location.pathname == '/admin/researcher') {
            onOpen('researcher')
        }
    }, [location]);
  
    return(
        <>
        <AdminLayout>
            <DashboardProvider/>
        </AdminLayout>
        </>
    )
}