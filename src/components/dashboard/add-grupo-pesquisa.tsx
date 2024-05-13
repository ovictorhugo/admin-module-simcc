import { Alert } from "../ui/alert"
import bg_popup from '../../assets/bg_popup.png';
import { Plus } from "phosphor-react";
import { Button } from "../ui/button";
import { useModal} from "../hooks/use-modal-store";

export function AddGrupoPesquisa() {
    const { onOpen } = useModal();
    
    return  (
        
         <Alert className="max-md:max-w-[90vw] max-sm:max-w-[90vw] bg-cover h-[200px] bg-center bg-no-repeat  gap-6 w-full  flex items-center justify-center py-12" style={{ backgroundImage: `url(${bg_popup})` }} >
             <h3 className="max-w-[260px] font-medium text-2xl mb-4 ">Cadastrar <strong className="bg-blue-700 text-white hover:bg-blue-800 transition-all font-medium">grupos de pesquisa</strong> da instituição</h3>
                    <p className="max-w-[250px] text-zinc-500 text-sm max-sm:hidden">Importe o csv dos grupos de pesquisa gerado na plataforma DGP <a></a> </p>
                    <Button onClick={() => onOpen('add-grupo-pesquisa')} className="text-white  dark:text-white"><Plus size={16} className="" /> Adicionar</Button>
         </Alert>
  
    )
}