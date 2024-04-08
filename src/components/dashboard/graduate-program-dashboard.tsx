import { Plus } from "phosphor-react";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { useModal} from "../hooks/use-modal-store";


export function GraduateProgramDashboard() {
    const { onOpen } = useModal();
   

    return(
        <Alert className="flex flex-col">
            <h3 className="max-w-[250px] font-medium text-2xl mb-4 ">Cadastrar programa de <strong className="bg-blue-700 text-white hover:bg-blue-800 transition-all font-medium">pós-graduação</strong></h3>
                    <p className="text-zinc-500 text-sm">Adicione as informações básicas do programa de pós-graduação como o corpo docente envolvido, classificação e descrição. </p>
                    <Button onClick={() => onOpen('add-graduate-program')} className="text-white mt-8 dark:text-white"><Plus size={16} className="" /> Adicionar</Button>
        </Alert>
    )
}