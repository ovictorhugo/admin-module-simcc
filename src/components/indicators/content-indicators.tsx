import { useLocation } from "react-router-dom";

export function ContentIndicators() {
    const location = useLocation();

    // Verifica se a URL é "/programa-teste"
    const indicadores = location.pathname === `/indicadores`;

    const isProgramaTeste3 = location.pathname === `/indicators/profnit`;

    const taxonomia = location.pathname === `/taxonomia`;

    const indicadoresposgraduacao = location.pathname === `/indicadores-pos-graduacao`;

    return (
    

            <div className="w-full h-full flex">
                {indicadores ? (
                <iframe
                title="Report Section"
                className="w-full h-full "
                src="https://app.powerbi.com/view?r=eyJrIjoiNTEwMjUxMzktMzZjYS00ZjM1LWJhYzYtZDY3Y2I2YzE1ZGRiIiwidCI6IjcyNjE3ZGQ4LTM3YTUtNDJhMi04YjIwLTU5ZDJkMGM1MDcwNyJ9"
            ></iframe>
                ):taxonomia ? (
                    <iframe
                    title="Report Section"
                    className="w-full h-full  "
                    src="https://app.powerbi.com/view?r=eyJrIjoiYzJkMTI3ZjktODU2MC00YThmLTg0NDctNmYxZDkzODcxY2FhIiwidCI6IjcyNjE3ZGQ4LTM3YTUtNDJhMi04YjIwLTU5ZDJkMGM1MDcwNyJ9"
                ></iframe>
                ) : isProgramaTeste3 ? (
                    <iframe
                    title="Report Section"
                    className="w-full h-full  "
                    src="https://app.powerbi.com/view?r=eyJrIjoiODNmYTJkNDgtNDI1MS00MTMxLWFlMmItNDFiYjU1YWNmODFhIiwidCI6IjcyNjE3ZGQ4LTM3YTUtNDJhMi04YjIwLTU5ZDJkMGM1MDcwNyJ9"
                ></iframe>
                ) :  indicadoresposgraduacao ?(
                    <iframe
                    title="Report Section"
                    className="w-full h-full "
                    src="https://app.powerbi.com/view?r=eyJrIjoiYTllNWFhYmUtNzVlYi00ZDNjLTgwMzItM2M3MGIzMzZjOGFiIiwidCI6IjcyNjE3ZGQ4LTM3YTUtNDJhMi04YjIwLTU5ZDJkMGM1MDcwNyJ9"
                ></iframe>
                ):('')}
                
            </div>

     
    )
}