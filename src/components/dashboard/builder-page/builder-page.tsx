import { useContext, useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Button } from "../../ui/button";
import { AlignLeft, BarChart, Book, Check, ChevronDown, ChevronLeft, ChevronUp, Code, Copy, Eye, File, GalleryHorizontal, Globe, GripVertical, Heading1, Heading2, Heading3, Image, LayoutPanelTop, Link, List, ListOrdered, Palette, Pencil, Plus, Rows, SquareDashedMousePointer, SquareMousePointer, SquarePlay, SquarePlus, Table, TableCellsMerge, Users } from "lucide-react";
import { Separator } from "../../ui/separator";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert } from "../../ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { ColorPicker } from "../../ui/color-picker";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Textarea } from "../../ui/textarea";
import { AddItem } from "./add-item";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { AddItemDropdown } from "./add-item-dropdown";
import { SectionBuilderPage } from "./sections";
import { Helmet } from "react-helmet";
import { UserContext } from "../../../context/context";
import { Quotes } from "phosphor-react";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

export interface Keepo {
    app: App;
    profile_info: ProfileInfo;
    content: Content[];
  }
  
  interface App {
    background_color: string;
    text_color: string;
    card_color: string;
    card_text_color: string;
    button_color: string;
    button_text_color: string;
  }
  
  interface ProfileInfo {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    supporting: string;
    button_text: string;
    link: string;
  }
  
 export interface Content {
    type: 'divider' | 'h1' | 'h2'| 'h3'| 'text'| 'list'| 'video' |'grid' | 'image' | 'file' | 'link' | 'slider' | 'social' | 'card' | 'list-number' | 'grafico' | 'pesquisadores' | 'artigos' | 'nuvem-palavra' | 'livros' | 'tabela' | 'capitulos' |'marcas' | 'sotwares' | 'patentes' | 'html' | 'botoes' ;
    title: string;
    emoji: string;
    url: string;
    items: Items[];
    order:number
    description:string
  }
  
  interface Items {
    name: string;
    url: string;
    title: string;
    image: string;
  }


  ////


  export interface Total {
    area: string;
    code: string;
    graduate_program_id: string;
    modality: string;
    name: string;
    rating: string;
    type: string;
    city: string
    state: string
    instituicao: string
    url_image: string
    region: string
    sigla: string
    latitude: string
    longitude: string
    visible: string
    qtd_discente: string
    qtd_colaborador: string
    qtd_permanente: string
    create_at: string

    institution: string,
    first_leader: string,
    first_leader_id: string,
    second_leader:string,
    second_leader_id: string,
    id:string

    dep_id:string
    org_cod: string
    dep_nom: string
    dep_des: string
    dep_email: string
    dep_site: string
    dep_tel: string
    img_data:string
    dep_sigla: string
  }

  export const items = [
    { titulo: "Divisão", desc: "Dividir blocos visualmente", icon: <Rows size={16} />, type: 'divider' as const },
    { titulo: "Título 1", desc: "Título da seção grande", icon: <Heading1 size={16} />, type: 'h1' as const },
    { titulo: "Título 2", desc: "Título da seção média", icon: <Heading2 size={16} />, type: 'h2' as const },
    { titulo: "Título 3", desc: "Título da seção pequena", icon: <Heading3 size={16} />, type: 'h3' as const },
    { titulo: "Parágrafo", desc: "Escreva um texto sem formatação", icon: <AlignLeft size={16} />, type: 'text' as const },
    { titulo: "Lista com marcadores", desc: "Criar lista com marcadores simples", icon: <List size={16} />, type: 'list' as const },
    { titulo: "Lista numerada", desc: "Criar lista com numeração", icon: <ListOrdered size={16} />, type: 'list-number' as const },
    { titulo: "Vídeo", desc: "Carregar ou integrar com um link", icon: <SquarePlay size={16} />, type: 'video' as const },
    { titulo: "Imagem", desc: "Fazer upload do arquivo", icon: <Image size={16} />, type: 'image'  as const},
    { titulo: "Carrossel", desc: "Crie uma sessão com os cards", icon: <GalleryHorizontal size={16} />, type: 'slider' as const },
    { titulo: "Link", desc: "Criar link para página externa", icon: <Link size={16} />, type: 'link' as const },
    { titulo: "Card", desc: "Crie blocos de conteúdo", icon: <SquareDashedMousePointer size={16} />, type: 'card' as const },
    { titulo: "Arquivo", desc: "Carregar ou integrar com um link", icon: <File size={16} />, type: 'file' as const },
    { titulo: "Redes sociais", desc: "Links externos", icon: <Globe size={16} />, type: 'social' as const },
    { titulo: "Grid", desc: "Grade de itens", icon: <TableCellsMerge size={16} />, type: 'grid' as const },
    { titulo: "HTML", desc: "Crie seu próprio código", icon: <Code size={16} />, type: 'html' as const },
    { titulo: "Botões", desc: "Adicione ações", icon: <SquareMousePointer size={16} />, type: 'botoes' as const }
  ];

 export  const itemsEspeciais = [
    { titulo: "Gráfico", desc: "Quantidade e métricas de produções", icon: <BarChart size={16} />, type: 'grafico' as const },
    { titulo: "Pesquisadores", desc: "Carrossel de participantes", icon: <Users size={16} />, type: 'pesquisadores' as const },
    { titulo: "Nuvem de palavras", desc: "Palavras com maiores ocorrências", icon: <Users size={16} />, type: 'nuvem-palavra' as const },
    { titulo: "Tabela", desc: "Dados de produção", icon: <Table size={16} />, type: 'tabela' as const },
    { titulo: "Todos os artigos", desc: "Artigos dos pesquisadores", icon: <Quotes size={16} />, type: 'artigos' as const },
    { titulo: "Todos os livros", desc: "Livros dos pesquisadores", icon: <Book size={16} />, type: 'livros' as const },
    { titulo: "Todos os livros e capítulos", desc: "Livros e capítulos dos pesquisadores", icon: <Book size={16} />, type: 'capitulos' as const },
    { titulo: "Todos os livros e capítulos", desc: "Livros e capítulos dos pesquisadores", icon: <Book size={16} />, type: 'patentes' as const },
    { titulo: "Todos os livros e capítulos", desc: "Livros e capítulos dos pesquisadores", icon: <Book size={16} />, type: 'sotwares' as const },
    { titulo: "Todos os livros e capítulos", desc: "Livros e capítulos dos pesquisadores", icon: <Book size={16} />, type: 'marcas' as const },
  ];

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

export function BuilderPage() {
    const [tab, setTab] = useState('inicio')

    const queryUrl = useQuery();

    const graduate_program_id = queryUrl.get('graduate_program_id');
    const group_id = queryUrl.get('group_id');
    const dep_id = queryUrl.get('dep_id');

    
        const [isLoading, setIsLoading] = useState(false)
    
        const [total, setTotal] = useState<Total[]>([]);
    
        const {urlGeral} = useContext(UserContext)
        let urlPatrimonioInsert = ''
      if(dep_id) {
        urlPatrimonioInsert =` ${urlGeral}departamentos?dep_id=${dep_id}`;
      } else if (group_id) {
        urlPatrimonioInsert =` ${urlGeral}research_group?group_id=${group_id}`;
      } else if (graduate_program_id) {
        urlPatrimonioInsert =` ${urlGeral}graduate_program_profnit?id=${graduate_program_id}`;
      }

    useEffect(() => {
        setIsLoading(true)
      const fetchData = async () => {
       
        try {
            
          const response = await fetch(urlPatrimonioInsert , {
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Max-Age": "3600",
              "Content-Type": "text/plain",
            },
          });
          const data = await response.json();
          if (data) {
              setTotal(data)
              setIsLoading(false)
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchData()
  
     
    }, [urlPatrimonioInsert]);


     //voltar
          const history = useNavigate();
    
          const handleVoltar = () => {
            history(-1);
          }

          const colors = [
            "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
            "#FFC733", "#33FFF2", "#F233FF", "#33FF95", "#3377FF",
            "#FF3333", "#FF8833", "#33FFB8", "#8D33FF", "#FF33D1"
          ]
          const [color, setColor] = useState('#0f0f0f');
          
          const textColors = [
            "#000000", // Black
            "#FFFFFF", // White
            "#4A4A4A", // Dark Gray
            "#808080", // Gray
            "#C0C0C0", // Light Gray
            "#FF0000", // Red
            "#00FF00", // Lime
            "#0000FF", // Blue
            "#FF4500", // Orange Red
            "#FFD700", // Gold
            "#8A2BE2", // Blue Violet
            "#FF69B4", // Hot Pink
            "#00CED1", // Dark Turquoise
            "#228B22", // Forest Green
            "#2F4F4F", // Dark Slate Gray
          ];

          const documentId = graduate_program_id || group_id || dep_id;

          const [keepoData, setKeepoData] = useState<Keepo>({
            app: {
              background_color: "",
              text_color: "",
              card_color: "",
              card_text_color: "",
              button_color: "",
              button_text_color: "",
            },
            profile_info: {
              avatar: "",
              firstName: "",
              lastName: "",
              email: "",
              jobTitle: "",
              supporting: "",
              button_text: "",
              link: "",
            },
            content: [],
          });

          ////firebase
          const db = getFirestore();
          const isDataLoaded = useRef(false); // Flag para evitar loop de salvamento

          // Carregar dados ao montar a página
          useEffect(() => {
            if (documentId) {
              const fetchData = async () => {
                const docRef = doc(db, "construtor-pagina", documentId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                  const data = docSnap.data() as Partial<Keepo>;
          
                  setKeepoData({
                    app: {
                      background_color: data.app?.background_color || "",
                      text_color: data.app?.text_color || "",
                      card_color: data.app?.card_color || "",
                      card_text_color: data.app?.card_text_color || "",
                      button_color: data.app?.button_color || "",
                      button_text_color: data.app?.button_text_color || "",
                    },
                    profile_info: {
                      avatar: data.profile_info?.avatar || "",
                      firstName: data.profile_info?.firstName || "",
                      lastName: data.profile_info?.lastName || "",
                      email: data.profile_info?.email || "",
                      jobTitle: data.profile_info?.jobTitle || "",
                      supporting: data.profile_info?.supporting || "",
                      button_text: data.profile_info?.button_text || "",
                      link: data.profile_info?.link || "",
                    },
                    content: data.content || [],
                  });
          
                  isDataLoaded.current = true; // Marca que os dados foram carregados
                }
              };
              fetchData();
            }
          }, [documentId]);
          
          // Salvar automaticamente no Firebase a cada atualização de keepoData
          useEffect(() => {
            if (documentId && keepoData && isDataLoaded.current) {
              const saveData = async () => {
                await setDoc(doc(db, "construtor-pagina", documentId), keepoData, { merge: true });
              };
              saveData();
            }
          }, [keepoData, documentId]);


          /////

          const addContentItem = (type: Content["type"], index:number) => {
            setKeepoData((prev) => ({
              ...prev,
              content: [
                ...prev.content,
                { type, title: "", emoji: "", url: "", items: [], order:index, description:''},
              ],
            }));
          };
          


        //////////////

        

          const [searchTerm, setSearchTerm] = useState("");
          const [showDropdown, setShowDropdown] = useState(false);
          
          useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
              if (event.key === "/") {
               
                setShowDropdown(true);
              }
            };
          
            // Adiciona o evento ao input específico
            const inputElement = document.getElementById("searchInput");
            inputElement?.addEventListener("keydown", handleKeyDown);
          
            return () => inputElement?.removeEventListener("keydown", handleKeyDown);
          }, [searchTerm]);
        
          const filteredItems = items.filter(item => {
            const normalizeString = (str:any) => str
            .normalize("NFD") // Decompõe os caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
            .toLowerCase(); // Converte para minúsculas

            const searchString = normalizeString(item.titulo);
          const normalizedSearch = normalizeString(searchTerm);
          return searchString.includes(normalizedSearch);
        });

        const filteredItemsEspeciais = itemsEspeciais.filter(item => {
            const normalizeString = (str:any) => str
            .normalize("NFD") // Decompõe os caracteres acentuados
            .replace(/[\u0300-\u036f]/g, "") // Remove os diacríticos
            .toLowerCase(); // Converte para minúsculas

            const searchString = normalizeString(item.titulo);
          const normalizedSearch = normalizeString(searchTerm);
          return searchString.includes(normalizedSearch);
        });
          
    
      const {version} = useContext(UserContext)

      const [tab2, setTab2] = useState('editor')
    return(
        <main className="h-full p-8 flex gap-3">
            <Helmet>
          <title>Construtor de página | Módulo administrativo | {version ? ('Conectee'):('Iapós')} </title>
          <meta name="description" content={`Construtor de página | Módulo administrativo | ${version ? ('Conectee'):('Iapós')}`} />
          <meta name="robots" content="index, follow" />
        </Helmet>
            <div className="flex h-full">
            <Tabs defaultValue={tab} value={tab} className="flex gap-3">
 <div className="p-2  flex flex-col gap-1 items-center border rounded-md h-full w-[48px]">

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    <Button className="h-8 w-8" onClick={() => setTab('inicio')}  variant={tab == 'inicio' ? ('outline'):('ghost')} size={'icon'}>
<LayoutPanelTop size={16}/>
</Button>
    </TooltipTrigger>
    <TooltipContent side='right'>
      <p>Início</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    <Button className="h-8 w-8" onClick={() => setTab('add')} variant={tab == 'add' ? ('outline'):('ghost')} size={'icon'}>
    <SquarePlus size={16}/>
</Button>
    </TooltipTrigger>
    <TooltipContent side='right'>
      <p>Adicionar</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
 
<Button className="h-8 w-8" onClick={() => setTab('themes')} variant={tab == 'themes' ? ('outline'):('ghost')} size={'icon'}>
    <Palette size={16}/>
</Button>
    </TooltipTrigger>
    <TooltipContent side='right'>
      <p>Layout</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>



 </div>
 <div className="h-full  w-[320px] border rounded-md">
 
 <TabsContent value="inicio" className="m-0 p-4">
        <h3 className="text-3xl font-semibold">Olá, vamos começar personalizando a página</h3>
   <p className="text-sm text-gray-500 pt-2 pb-8">Comece adicionando sessões e alterando as cores do layout</p>
    <div className="flex flex-col gap-4">
    <div className="flex flex-col w-full gap-2">
    <Label>Título</Label>
    <Input
        type="text"
        value={keepoData.profile_info.jobTitle}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                profile_info: { ...prev.profile_info, jobTitle: e.target.value },
            }))
        }
    />
</div>

<div className="flex flex-col w-full gap-2">
    <Label>Sigla</Label>
    <Input
        type="text"
        value={keepoData.profile_info.jobTitle}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                profile_info: { ...prev.profile_info, jobTitle: e.target.value },
            }))
        }
    />
</div>

<div className="flex flex-col w-full gap-2">
    <Label>Descrição</Label>
    <Textarea
    
        value={keepoData.profile_info.supporting}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                profile_info: { ...prev.profile_info, supporting: e.target.value },
            }))
        }
    />
</div>
    </div>
 <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="py-2 border-b">Informações</AccordionTrigger>
    <AccordionContent className="mt-4 flex flex-col gap-4">
    <div className="flex flex-col w-full gap-2">
    <Label>Título</Label>
    <Input
        type="text"
        value={keepoData.profile_info.jobTitle}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                profile_info: { ...prev.profile_info, jobTitle: e.target.value },
            }))
        }
    />
</div>


    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="py-2 border-b">Cards</AccordionTrigger>
    <AccordionContent  className="mt-4">
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
</TabsContent>
 <TabsContent value="themes" className="m-0 p-4">
 <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="py-2 border-b">Botões</AccordionTrigger>
    <AccordionContent className="mt-4 flex flex-col gap-4">
    <div className="flex flex-col gap-2">
    <Label>Cor de fundo</Label>
    <div className="flex  gap-4">
    <Input
        type="text"
        value={keepoData.app.button_color}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                app: { ...prev.app, button_color: e.target.value },
            }))
        }
    />

<ColorPicker
          onChange={(v) => {
            setKeepoData((prev) => ({
                ...prev,
                app: { ...prev.app, button_color: v },
            }))
          }}
          value={keepoData.app.button_color}
        />


    </div>
</div>

<div className="flex flex-col gap-2">
    <Label>Cor do texto</Label>
    <div className="flex  gap-4">
    <Input
        type="text"
        value={keepoData.app.button_text_color}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                app: { ...prev.app, button_text_color: e.target.value },
            }))
        }
    />

<ColorPicker
          onChange={(v) => {
            setKeepoData((prev) => ({
                ...prev,
                app: { ...prev.app, button_text_color: v },
            }))
          }}
          value={keepoData.app.button_text_color}
        />


    </div>
</div>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="py-2 border-b">Cards</AccordionTrigger>
    <AccordionContent  className="mt-4">
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
 </TabsContent>
 <TabsContent value="add" className="m-0 p-4">
 <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="py-2 border-b">Elementos</AccordionTrigger>
    <AccordionContent className="mt-4 flex flex-col gap-4">
    <div className="gap-4 grid grid-cols-2">
    {items.map((item, index) => (
        <div className="cursor-pointer rounded-md " onClick={() =>   addContentItem(item.type, (keepoData.content.length + 1))}>
            <AddItem
          key={index} 
          titulo={item.titulo} 
          chidren={item.icon} 
        />
        </div>
      ))}

</div>
        </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
    <AccordionTrigger className="py-2 border-b">Funções</AccordionTrigger>
    <AccordionContent className="mt-4 flex flex-col gap-4">
    <div className="gap-4 grid grid-cols-2">
    {itemsEspeciais.map((item, index) => (
        <div className="cursor-pointer rounded-md " onClick={() =>   addContentItem(item.type, (keepoData.content.length + 1))}>
            <AddItem
          key={index} 
          titulo={item.titulo} 
          chidren={item.icon} 
        />
        </div>
      ))}

</div>
        </AccordionContent>
        </AccordionItem>
        </Accordion>
   
 </TabsContent>
 </div>
</Tabs>

            </div>


            <div className="flex flex-1 flex-col gap-3">
            <Tabs defaultValue={tab2} value={tab2} className="w-full grid grid-cols-1">
                <div className="w-full px-2 h-[48px] border rounded-md flex items-center  justify-between">
                <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>

              <TabsList>
    <TabsTrigger value="editor" onClick={() => setTab2('editor')} className="flex items-center gap-2"><Pencil size={16}/>Editor</TabsTrigger>
    <TabsTrigger value="preview" onClick={() => setTab2('preview')} className="flex items-center gap-2"><Eye size={16}/>Preview</TabsTrigger>
  </TabsList>

                    <div className="flex gap-3">
                    <Button className="h-8 px-3">
                        <Check size={16}/> Publicar
                    </Button>
                    </div>
                </div>

         

  <TabsContent value="editor">
  <div>
                   <div className="ml-28 px-2 pb-2 flex flex-col gap-2 mr-8">
                    <Alert className="h-[200px]">
                        
                    </Alert>

                    <div>

                    </div>

                    <div>
                        <h1></h1>
                        <p></p>
                    </div>
                   </div>

                    <div>
                    <SectionBuilderPage keepoData={keepoData} setKeepoData={setKeepoData}/>
                    </div>

                    <div className="flex gap-2 items-center">
                   
                   

                    <div className="w-28 min-w-28 flex justify-end">
                    <DropdownMenu open={showDropdown} onOpenChange={() => setShowDropdown(!showDropdown)}>
                  <DropdownMenuTrigger>
                  <Button variant={'ghost'} size={'icon'} className="h-8 w-8">
                            <Plus size={16}/>
                        </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-[300px] overflow-y-auto">
                  <Input 
                     className="mb-1"    onChange={(e) => setSearchTerm(e.target.value)}
                     
                        placeholder="Pesquisar..."/>
                  {filteredItems.length != 0 && (
                    <div>
                        <DropdownMenuLabel>Elementos</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </div>
                  )}
                 
                  {filteredItems.map((item, index) => (
        <div 
        className="cursor-pointer rounded-md " 
        onClick={() => {
            setShowDropdown(false)
            addContentItem(item.type, (keepoData.content.length + 1));
        }}
        >
         <AddItemDropdown 
          key={index} 
          titulo={item.titulo} 
          desc={item.desc} 
          chidren={item.icon} 
        />
       </div>
      ))}


{filteredItemsEspeciais.length != 0 && (
                    <div>
                        <DropdownMenuLabel>Funções</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </div>
                  )}
                 
                  {filteredItemsEspeciais.map((item, index) => (
        <div 
        className="cursor-pointer rounded-md " 
        onClick={() => {
            setShowDropdown(false)
            addContentItem(item.type, (keepoData.content.length + 1));
            setSearchTerm('')
        }}
        >
         <AddItemDropdown 
          key={index} 
          titulo={item.titulo} 
          desc={item.desc} 
          chidren={item.icon} 
        />
       </div>
      ))}
                    </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                       
                        <Input 
                        onChange={(e) => setSearchTerm(e.target.value)}
                      id="searchInput"
                        className="bg-transparent border-0 p-0 dark:border-0 dark:bg-transparent" placeholder="Escreva '/' para comandos..."/>
                    </div>
                </div>
  </TabsContent>
  <TabsContent value="preview">

  </TabsContent>
</Tabs>

               
            </div>
        </main>
    )
}