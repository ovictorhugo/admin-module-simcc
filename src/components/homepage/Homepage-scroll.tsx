import { Button } from "../ui/button";
import Pimpolho from "/src/assets/pimpolho.png"





import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
  } from "../ui/drawer"
 
  import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "../ui/card"
import { ShoppingCart, ShoppingBag, X, Minus, WhatsappLogo, User } from "phosphor-react";
import { getFirestore, onSnapshot, collection, query,  where } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";

interface UserData {
    id: string
    titulo: string,
    valor: string,
    ano: string,
    largura: string,
    altura: string,
    status: string,
    tecnica: string,
    descricao: string,
    categoria: string,
    imgURL: string
  }

export function HomepageScroll() {
   
    const [dataObras, setDataObras] = useState<UserData[]>([]);

    const db = getFirestore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDocsRef = collection(db, 'obras');
                const userDocsQuery = query(userDocsRef, where('categoria', '==', 'Principal'));
    
                // Subscreva-se a um snapshot em tempo real dos documentos
                const unsubscribe = onSnapshot(userDocsQuery, (snapshot) => {
                    const userDataArray: UserData[] = snapshot.docs.map((doc) => {
                        // Obtenha o ID do documento usando .id
                        const documentId = doc.id;
                        // Combine o ID do documento com os dados do documento
                        const userData = { ...(doc.data() as UserData), ['Document ID']: documentId };
                        return userData;
                    });
    
              
                    setDataObras(userDataArray);
                });
    
                // Retorne uma função de limpeza para cancelar a inscrição quando o componente for desmontado
                return () => unsubscribe();
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
    
        fetchData();
    }, [db]);
    





      

      const messageWpp = (props: any) => {
        let message = `Oi, estou interessado na obra ${props.titulo}\n`
        message += `\n`
        message += `Valor: ${props.valor}\n`
        message += `Ano da obra: ${props.ano}\n`
        message += `Dimensões: ${props.altura}cm x ${props.largura}cm\n`
        message += `Técnica: ${props.tecnica}`
       

    
        const encodedMessage = encodeURIComponent(message)
        const link = `https://wa.me/5521982348230?text=${encodedMessage}`

        window.open(link, '_blank'); 
      }


    return (
        <div className="flex gap-6 flex-col items-center elementBarra sm:h-screen  sm:overflow-x-auto sm:overflow-y-hidden py-20 sm:flex-row">
            <div className="sm:max-w-[400px]  md:pl-16 px-6 flex-shrink-0">
                <div className="h-20 mb-4">
                    <Logo/>
                </div>
                <h1 className="text-5xl mb-4 font-medium">O divino <br/> presente</h1>
                <p className="text-gray-400 mb-8">Minha arte vem se tornando essencial e verdadeira a cada obra produzida por ser parte daquilo que vivi durante toda a minha vida.</p>

                <div className="flex gap-4">
                    <Link to={'https://wa.me/5521982348230'} target="blank_"><Button className="flex gap-3"><WhatsappLogo size={16}/> Fazer cotação</Button></Link>
                    <Link to={'/sobre-mim'}><Button variant={'secondary'} className="flex gap-3"><User size={16}/> Sobre mim</Button></Link>
                </div>

                <div className="relative   md:flex hidden -z-10">
                    <img src={Pimpolho} className="w-[200px] absolute -left-[145px] -bottom-[150px]" alt="" />
                </div>
            </div>

           <div className=" elementBarra w-full flex-1 h-full flex  ">
           <div className="flex-1 flex gap-6 elementBarra overflow-x-auto sm:overflow-x-visible pb-4 sm:pb-0 w-full sm:mr-16 px-6 sm:px-0">
            {dataObras.map((props) => {
                return (
                    <Drawer>
                <DrawerTrigger asChild>
                    <div className="flex flex-col  gap-4 flex-shrink-0 h-[80vh] sm:h-full  cursor-pointer">
                        <div className="flex-shrink-0 h-full flex-1 w-[350px] bg-gray-300 bg-cover bg-center bg-no-repeat rounded-lg" style={{ backgroundImage: `url(${props.imgURL})` }}></div>
                        <div className="w-full justify-between items-center flex">
                            <p className="font-bold truncate max-w-[200px]">{props.titulo}</p>
                            <div className="flex items-center gap-3">
                                <p className="text-gray-400 text-xs font-medium">{props.status}</p>
                            <div className={`rounded-lg w-6 h-6 items-center justify-center text-white flex ${props.status == "Vendido" && 'bg-red-600'} ${props.status == "Em exposição" && 'bg-yellow-400'}  ${props.status == "Disponível" && 'bg-green-600'}`}>
                                {props.status == "Vendido" && <X size={10}/>}
                                {props.status == "Em exposição" && <Minus size={10}/>}
                                {props.status == "Disponível" && <ShoppingBag size={10}/>}
                            </div>
                            </div>
                        </div>
                    </div>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="px-6  w-full md:min-h-[500px] flex-col md:flex-row flex pb-6">
                        <div className="md:w-2/3 w-full flex-1 flex">
                        <div className="flex-shrink-0 h-full w-1/2 bg-gray-200 bg-cover bg-center bg-no-repeat rounded-l-lg" style={{ backgroundImage: `url(${props.imgURL})` }}></div>
                        <div className="flex-shrink-0 h-full w-1/2 bg-gray-300  bg-no-repeat bg-center rounded-r-lg" style={{ backgroundImage: `url(${props.imgURL})`, backgroundSize: '170%'  }}>
                            <div className="w-full h-full bg-black/30 rounded-r-lg"></div>
                        </div>
                        </div>

                        <div className="md:w-1/3 w-full md:ml-6">
                        <Card className="w-full justify-between flex flex-col h-full">
                <CardHeader>
                    <CardTitle>{props.titulo}</CardTitle>
                   

                    <p className="font-medium text-5xl pt-8">R$ {props.valor}</p>
                    <div className="flex justify-between lg:items-center lg:flex-row flex-col">
                    <div className="flex gap-3 pt-2 flex-row ">
                        <Badge className=" whitespace-nowrap w-fit">Largura: {props.largura} cm</Badge>
                        <Badge className=" whitespace-nowrap w-fit">Altura: {props.altura} cm</Badge>
                    </div>

                    <p className="text-sm text-gray-900 lg:mt-0 mt-2">Ano da obra: {props.ano}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <div></div>

                        <div className="w-full pb-2 justify-between items-center flex">
                            <p className="font-medium">{props.tecnica}</p>
                            <div className="flex items-center gap-3">
                                <p className="text-gray-400 text-xs font-medium">{props.status}</p>
                            <div className={`rounded-lg w-6 h-6 items-center justify-center text-white flex ${props.status == "Vendido" && 'bg-red-600'} ${props.status == "Em exposição" && 'bg-yellow-400'}  ${props.status == "Disponível" && 'bg-green-600'}`}>
                                {props.status == "Vendido" && <X size={10}/>}
                                {props.status == "Em exposição" && <Minus size={10}/>}
                                {props.status == "Disponível" && <ShoppingBag size={10}/>}
                            </div>
                            </div>
                        </div>
                    </div>

                    {props.descricao != "" && <CardDescription className="max-h-[150px] overflow-y-auto elementBarra mt-4">{props.descricao}</CardDescription>}
                </CardHeader>
      
                <div>
                    <CardContent>
                    <form action="">
                        <div className="grid w-full items-center gap-4">
                           

                           
                        </div>
                    </form>
                   
                </CardContent>

                <CardFooter className="flex justify-between pb-0">
                    
                    <Button onClick={() => messageWpp(props)}  className="w-full gap-3"><ShoppingCart size={16}/>Adquirir</Button>
                </CardFooter>
                </div>
        </Card>
                        </div>
                    </div>
                </DrawerContent>
            </Drawer>
                )
            })}
            <div className="md:pr-10"></div>
            </div>

            
           </div>

           <div className="sm:hidden flex text-sm text-left">Marcos Aurelio | Desenvolvido por <Link target="_blank" to={'https://wa.me/5571988549839'}>Victor Hugo</Link></div>
        </div>
    );
}
