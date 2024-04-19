
import { toast } from "sonner"
const URLGERALADMIN = import.meta.env.VITE_API_KEY

interface Props {
    id: string;
}
export  function HandleDeleteResearcher (props:Props)  {

    //const {urlGeralAdm} = useContext(UserContext)
   //const urlGeralAdm = 'https://simcc.uesc.br:5000/'

    const urlDeleteProgram =  URLGERALADMIN + `ResearcherRest/Delete?researcher_id=${props.id}`
    console.log(props.id)

    const fetchData = async () => {
     
      try {
        const response = await fetch(urlDeleteProgram, {
          mode: 'cors',
          method: 'DELETE',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',
            'Content-Type': 'text/plain'
          }
        });
        if (response.ok) {
          toast("Dados deletados com sucesso!", {
            description: "Pesquisador removido da base de dados",
            action: {
              label: "Fechar",
              onClick: () => console.log("Undo"),
            },
          })
        
        }
      } catch (err) {
        console.log(err);
      } 
    };
    
    fetchData()

  }