import { Alert } from "../ui/alert"
import bg_popup from '../../assets/bg_popup.png';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library
import { UserContext } from "../../context/context";

export function AddResearcherDashboard() {
    const [nomePesquisador, setNomePesquisador] = useState('');
    const [lattesID, setLattesID] = useState('');

    const { user, urlGeralAdm } = useContext(UserContext);

    const handleSubmitPesquisador = async () => {

        const docId = uuidv4();

        try {
          const data = [
            {
                researcher_id: docId,
                name: nomePesquisador,
                lattes_id: lattesID,
                institution_id: user.institution_id,
              }
          ]

          let urlProgram = urlGeralAdm + '/ResearcherRest/Insert'

          const fetchData = async () => {
          
            if(nomePesquisador.length != 0 && lattesID.length > 13) {
                try {
                    const response = await fetch(urlProgram, {
                      mode: 'cors',
                      method: 'POST',
                      headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Max-Age': '3600',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(data),
                    });
      
                    if (response.ok) {
                      setLattesID('')
                     
                      setNomePesquisador('')
      
                      toast("Dados enviados com sucesso", {
                          description: "Pesquisador cadastrado na instituição",
                          action: {
                            label: "Fechar",
                            onClick: () => console.log("Undo"),
                          },
                        })
                    } else {
                      toast("Erro ao enviar os dados ao servidor", {
                          description: "Tente novamenete",
                          action: {
                            label: "Fechar",
                            onClick: () => console.log("Undo"),
                          },
                        })
                    }
                    
                  } catch (err) {
                    console.log(err);
                  } 
            } else {
               if(nomePesquisador.length == 0 && lattesID.length == 0) {
                toast("Parece que os campos estão vazios", {
                    description: "Preencha os campos nome do pesquisador e Lattes Id",
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
               } else if (lattesID.length < 14) {
                toast("Parece que o Lattes Id está incorreto ou não preenchido", {
                    description: "O Lattes ID teve conter 13 números",
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
               } else if (nomePesquisador.length == 0) {
                toast("Preencha o nome do pesquisador", {
                    description: "Parece que o campo está vazio",
                    action: {
                      label: "Fechar",
                      onClick: () => console.log("Undo"),
                    },
                  })
               }
            }
          };
          fetchData();
    
          
        } catch (error) {
          console.error('Erro ao processar a requisição:', error);
        }
      };

    return  (
        
         <Alert className="bg-cover bg-center bg-no-repeat  gap-6 w-full  flex items-center justify-center py-12" style={{ backgroundImage: `url(${bg_popup})` }} >
            <h3 className="max-w-[240px] font-medium text-2xl  text-gray-700 dark:text-white"><strong className="bg-blue-700 text-white hover:bg-blue-800 transition duration-500 font-medium">Vincule</strong> os pesquisadores à sua instituição de ensino</h3>

            <div className="flex gap-6 items-end">
            <div className="flex flex-col space-y-1.5 w-1/3">
            <Label htmlFor="name">Nome completo</Label>
            <Input value={nomePesquisador} onChange={(e) => setNomePesquisador(e.target.value)} type="text"  placeholder="Nome completo" />
            </div>

            <div className="flex flex-col space-y-1.5 w-1/3">
            <Label htmlFor="name">Lattes Id</Label>
            <Input value={lattesID} onChange={(e) => setLattesID(e.target.value)} type="text"  placeholder="Lattes Id" />
            </div>

            <Button onClick={() => handleSubmitPesquisador()} className="text-white dark:text-white"><Plus size={16} className="" /> Adicionar</Button>
            </div>
         </Alert>
  
    )
}