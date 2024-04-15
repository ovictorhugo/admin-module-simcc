import { Plus } from "phosphor-react";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { useModal} from "../hooks/use-modal-store";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { toast } from "sonner"
import { useContext, useEffect, useState } from "react";
import { getFirestore,  collection, addDoc, setDoc } from 'firebase/firestore';
import { UserContext } from "../../context/context";
import { onSnapshot,  getDocs, query, deleteDoc, doc, where, updateDoc, deleteField } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
interface UserData {
    [`Document ID`]: string
    email: string,
    institution_id: string,
    img_url: string,
    name: string,
    state: 'colaborator',
    displayName: string,
    photoURL: string
  }


export function AddAdmin() {

    const [email, setEmail] = useState('')
    const {user} = useContext(UserContext)
    const db = getFirestore();
    const [colaboradores, setColaboradores] = useState<UserData[]>([]);

    const handleSubmit = async () => {
        try {
            // Aguarde a obtenção da URL de download
    
            // Crie um objeto com os dados do formulário
            const formData = {
                email: email,
                institution_id: user.institution_id,
                img_url: user.img_url,
                name: user.name,
                state: 'colaborator'
            };
    
            // Submeta os dados para o Firestore
            if (email !== '') {
                const db = getFirestore();
                const programRef = collection(db, 'institution');
                await setDoc(doc(programRef, email), formData); // Use o email como a chave do documento
    
                toast("Enviado com sucesso!", {
                    description: "Adicionado ao banco de dados",
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Undo"),
                    },
                });
    
                // Limpe os campos após a conclusão
                setEmail('');
            } else {
                toast("Falta preencher o email", {
                    description: "Revise antes de enviar",
                    action: {
                        label: "Fechar",
                        onClick: () => console.log("Undo"),
                    },
                });
            }
        } catch (error) {
            console.error('Erro ao enviar os dados para o Firestore:', error);
        }
    };
    

      useEffect(() => {
          const fetchData = async () => {
              try {
                  const userDocsRef = collection(db, 'institution');
                  const userDocsQuery = query(userDocsRef, where('state', '==', 'colaborator'));
                  
                  // Subscribe to a real-time snapshot of the documents
                  const unsubscribe = onSnapshot(userDocsQuery, async (snapshot) => {
                      const userDataArray: UserData[] = [];
      
                      for (const doc of snapshot.docs) {
                          const userData = doc.data() as UserData;
                          const email = userData.email;
                          
                          // Use Firestore to get user details based on email
                          const userDetailsQuery = query(collection(db, 'users'), where('email', '==', email));
                          const userDetailsSnapshot = await getDocs(userDetailsQuery);
                          
                          userDetailsSnapshot.forEach(userDoc => {
                              // Add user name and image URL to user data
                              userData.name = userDoc.data().name;
                              userData.img_url = userDoc.data().img_url;
                          });
                          
                          // Add the user to the user data array
                          userDataArray.push(userData);
                      }
      
                      // Update the state with user data
                      setColaboradores(userDataArray);
                  });
      
                  // Return a cleanup function to unsubscribe when the component unmounts
                  return () => unsubscribe();
              } catch (error) {
                  console.error('Error fetching user data:', error);
              }
          };
      
          fetchData();
      }, []);
      
   

    return(
        <Alert className="flex flex-col ">
            <h3 className="max-w-[250px] font-medium text-2xl mb-4 ">Cadastrar novo <strong className="bg-blue-700 text-white hover:bg-blue-800 transition-all font-medium">administrador</strong></h3>
                    <p className="text-zinc-500 text-sm">Adicione o email para vincular um novo administrador na plataforma </p>
                   <div className="flex gap-4 mt-4">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/> <Button onClick={() => handleSubmit()} className="dark:text-white">Cadastrar</Button>
                   </div>

                   <Separator/>

                   <p className="text-zinc-500 text-sm">Pessoas com acesso</p>

                   <ScrollArea>
                        {colaboradores.map((props) => {
                            return(
                                <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                            <Avatar className="cursor-pointer">
                    <AvatarImage src={`${props.photoURL != null && (props.photoURL)}`} />
                    <AvatarFallback className="flex items-center justify-center"></AvatarFallback>
                </Avatar>
                                <div>
                                    <p className="">{props.displayName}</p>
                                    <p className="">{props.email}</p>
                                </div>
                            </div>

                            <div></div>
                        </div>
                            )
                        })}
                   </ScrollArea>
        </Alert>
    )
}