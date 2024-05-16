import { useContext, useEffect, useState } from "react";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";
import { Funnel, MagnifyingGlass } from "phosphor-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Circle } from "../svg/Circle";
import { Label } from "../ui/label";
import { Link, useNavigate } from "react-router-dom";

interface Firebase {
    id:string
    name:string
    createdAt:string
    userId:string
    pesquisadores:PesquisadoresSelecionados[]
    grupos:Grupo[]

    anoArtigo:string
    anoWorkInEvent:string
    anoLivro:string
    anoCapLivro:string
    anoPatente:string
    anoMarca:string
    anoSoftware:string
    anoResourceProgess:string
    anoResourceCompleted:string
    anoParticipacao:string
    [`Document ID`]: string

}

interface PesquisadoresSelecionados {
    id:string
    name: string,
    university: string,
    lattes_id: string,
    city: string,
    area: string,
    graduation: string,
  }

  interface Grupo {
    id: string;
    titulo: string;
    descricao: string;
    categorias: Categoria[];
    quantidade_max_pontos: number;
    // outras propriedades do grupo
}

interface Categoria {
    id_criterio: number;
    criterio: string;
   
            pontos: string,
            pontuacao_max: string,
            id_grupo: string,
       
            pesquisadores:PesquisadorUpdate[]
}

type PesquisadorUpdate = {
    total:number,
    id:string,
    name:string
    id_criterio:number
}
import { updateDoc, deleteField, getFirestore, doc, getDocs, getDoc, collection, addDoc, query, deleteDoc,  where,  Query } from 'firebase/firestore';

export function ProcurarBaremas() {
    const { isOpen, type } = useModalHomepage();
    const isModalOpen = isOpen && type === 'procurar-baremas';
    const { idDocumentBarema, setIdDocumentBarema, user } = useContext(UserContext)
    const [input, setInput] = useState("");
    const [userData, setUserData] = useState<Firebase[] | null>(null);

    const onClickBarema = async () => {
        setIdDocumentBarema(input);
        const history = useNavigate();
      
        const db = getFirestore();
        const userId = user && user.uid;
      
        const fetchData = async () => {
          try {
            const userDocsRef = collection(db, 'baremas');
            const userDocSnapshot = await getDocs(userDocsRef);
            
            console.log('userDocSnapshot:', userDocSnapshot);
      
            if (userDocSnapshot.size > 0) {
                const userDataArray: Firebase[] = userDocSnapshot.docs.map((doc) => {
                    // Get the document ID using .id
                    const documentId = doc.id;
                    // Combine document ID with document data
                    const userData = { ...(doc.data() as Firebase), ['Document ID']: documentId };
                    return userData;
                  });

                setUserData(userDataArray);
      
              console.log('User Data:', userDataArray);
      
              const documentExists = userDataArray.some(userData => userData['Document ID'] === input);
              if (documentExists) {
                history(`/barema/${input}`)
                console.log('deeeeeeeeeeeu certo')
              }
            } else {
              console.log('User data not found');
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
      
        fetchData();
        
        console.log('tvyabeuaefr');
      }

   return(
    <>
    {isModalOpen && (
         <div className="w-full mr-16 mb-20">
            <div className="w-full h-full items-center justify-center flex flex-col">

            <div className="flex flex-col justify-center max-w-[60vw] w-full">
           
            <h1 className="z-[2] text-3xl mb-6 font-medium max-w-[750px] ">
              Coloque o{" "}
              <strong className="bg-red-700 text-white font-medium">
                {" "}
                código do barema
              </strong>{" "}
             <br/> e consulte os resultados.
            </h1>
          </div>
            <Alert  className="h-14 p-2 flex items-center justify-between max-w-[60vw]">
            <div className="flex items-center gap-2 w-full flex-1">
            <MagnifyingGlass size={16} className=" whitespace-nowrap w-10" />
            <Input  onChange={(e) => setInput(e.target.value)} value={input}  type="text" className="border-0 w-full "/>
                </div>

                <div className="w-fit">
       
           <Button onClick={() => onClickBarema()}  className={` text-white`} size={'icon'}>
       <Funnel size={16} className="" /> 
       
        </Button>
            </div>
                </Alert>
            </div>
         </div>
    )}
    </>
   );
}