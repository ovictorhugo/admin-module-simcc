import { useContext } from "react";
import { Badge } from "../ui/badge";
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";
import { LayoutDashboard } from "lucide-react";

export function HomeDashboard() {

    const {role, permission} = useContext(UserContext)

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

    return(
        <main className="w-full md:p-8 p-4">
            <div className=" bg-[rgb(113,156,184)] rounded-md w-full h-[40vh]  text-white p-8 flex items-end">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">Módulo administrativo</h1>
                            <Badge>{role}</Badge>
                        </div>
                        <p className="max-w-[750px] mt-2 text-lg font-light text-foreground"></p>
                    </div>
            </div>

            <div className="grid lg:grid-cols-5 gap-4 md:gap-8">
               {has_visualizar_modulo_administrativo}
            </div>
        </main>
    )
}