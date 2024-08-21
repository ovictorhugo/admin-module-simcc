import { useContext, useEffect, useState } from "react";
import { HeaderBarema } from "./header-barema";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import {  ChartBar, ChartLine, Check, Copy, DotsSix, Download, FileCsv, Gear, GearSix, PencilLine, PlusCircle, Rows, Trash, Users } from "phosphor-react";
import { Input } from "../ui/input";
import { getFirestore, doc, getDocs, updateDoc, onSnapshot, collection, addDoc, query, deleteDoc,  where,  Query } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; 
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from "sonner"
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../../components/ui/table"
  
type Research = {
    article_A1: string,
    article_A2: string,
    article_A3: string,
    article_A4: string,
    article_B1: string,
    article_B2: string,
    article_B3: string,
    article_B4: string,
    article_C: string,
    article_SQ: string,
    book: string,
    book_chapter: string,
    brand: string,
    event_organization: string,
    guidance_d_a: string,
    guidance_d_c: string,
    guidance_e_a: string,
    guidance_e_c: string,
    guidance_g_a: string,
    guidance_g_c: string,
    guidance_ic_a: string,
    guidance_ic_c: string,
    guidance_m_a: string,
    guidance_m_c: string,
    participation_event: string,
    patent: string,
    researcher: string,
    software: string,
    work_in_event: string,

    id:string
    name: string,
    university: string,
    lattes_id: string,
    city: string,
    area: string,
    graduation: string,
    
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

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "../../components/ui/popover"

  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
  } from "../../components/ui/command"
import { ArrowRight, ChevronLeft, ChevronsUpDown, Info, MoreHorizontal, Plus } from "lucide-react";
import { UserContext } from "../../context/context";
import { PesquisadorItemBarema } from "./pesquisdor-item-barema";

interface GroupedCriteria {
    [key: string]: JSX.Element[];
}

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

interface SomaTotalPorGrupoEPesquisador {
    [grupoId: string]: {
        titulo: string;
        pesquisadores: { id: string; name: string; total: number }[];
    
    } | { [pesquisadorId: string]: string };
}


type PesquisadorUpdate = {
    total:number,
    id:string,
    name:string
    id_criterio:number
}

interface Categoria {
    id_criterio: number;
    criterio: string;
   
            pontos: string,
            pontuacao_max: string,
            id_grupo: string,
       
            pesquisadores:PesquisadorUpdate[]
}

interface Grupo {
    id: string;
    titulo: string;
    descricao: string;
    categorias: Categoria[];
    quantidade_max_pontos: number;
    // outras propriedades do grupo
}

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "../ui/tabs"


import { GraficoBarema } from "./grafico-barema";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useModalDashboard } from "../hooks/use-modal-dashboard";
import { ProcurarBaremas } from "./procurar-barema-public";
import { HeaderResultTypeHome } from "../homepage/categorias/header-result-type-home";


export function BaremasHome() {
    const { isOpen, type } = useModalDashboard();
    
    const { pesquisadoresSelecionados, urlGeral, setPesquisadoresSelecionados, user, idDocumentBarema, setIdDocumentBarema } = useContext(UserContext)

    const isModalOpen = isOpen && type === 'baremas';

    const {  baremaId } = useParams<{
        baremaId:string
      }>();

      const [openPopo2, setOpenPopo2] = useState(false)

    const [anoArtigo, setAnoArtigo] = useState(Number(new Date().getFullYear() - 4));
    const [anoWorkInEvent, setAnoWorkInEvent] = useState(Number(new Date().getFullYear() - 4));
    const [anoLivro, setAnoLivro] = useState(Number(new Date().getFullYear() - 4));
    const [anoCapLivro, setAnoCapLivro] = useState(Number(new Date().getFullYear() - 4));
    const [anoPatente, setAnoPatente] = useState(Number(new Date().getFullYear() - 4));
    const [anoMarca, setAnoMarca] = useState(Number(new Date().getFullYear() - 4));
    const [anoSoftware, setAnoSoftware] = useState(Number(new Date().getFullYear() - 4));
    const [anoResourceProgess, setAnoResourceProgess] = useState(Number(new Date().getFullYear() - 4));
    const [anoResourceCompleted, setAnoResourceCompleted] = useState(Number(new Date().getFullYear() - 4));
    const [anoParticipacao, setAnoParticipacao] = useState(Number(new Date().getFullYear() - 4));

    const [idBarema, setIdBarema] = useState('')

    const [tituloBarema, setTituloBarema] = useState('Barema de avaliação sem título')
    const [editTituloBarema, setEditTituloBarema] = useState(false)

      ////////////////q
      useEffect(() => {
        if (baremaId) {
            setIdDocumentBarema(baremaId);
          } else {
            // Trate o caso em que baremaId é undefined, se necessário
          }
        }, []);
  
      const [userData, setUserData] = useState<Firebase[] | null>(null);

      const db = getFirestore();
      useEffect(() => {
      const fetchData = async () => {
       if(idDocumentBarema != '') {
        try {
            if (user.uid) {
              console.log('userId:', user.uid);
      
              const userDocsRef = collection(db, 'baremas');
            const userDocSnapshot = await getDocs(userDocsRef);

      
  
      
              if (userDocSnapshot.size > 0) {
                  const userDataArray: Firebase[] = userDocSnapshot.docs.map((doc) => {
                    // Get the document ID using .id
                    const documentId = doc.id;
                    // Combine document ID with document data
                    const userData = { ...(doc.data() as Firebase), ['Document ID']: documentId };
                    return userData;
                  });
                  setUserData(userDataArray)
  
                  // Assume que há apenas um documento com esse ID
                  const userData = userDataArray[0];
  
                  // Definir os valores de grupos e pesquisadores selecionados
                  setGrupos(userData.grupos);
                  setPesquisadoresSelecionados(userData.pesquisadores);
  
                  setAnoArtigo(Number(userData.anoArtigo))
                  setAnoWorkInEvent(Number(userData.anoWorkInEvent))
                  setAnoLivro(Number(userData.anoLivro))
                  setAnoCapLivro(Number(userData.anoCapLivro))
                  setAnoPatente(Number(userData.anoPatente))
                  setAnoMarca(Number(userData.anoMarca))
                  setAnoSoftware(Number(userData.anoSoftware))
                  setAnoResourceCompleted(Number(userData.anoResourceCompleted))
                  setAnoResourceProgess(Number(userData.anoResourceProgess))
                  setAnoParticipacao(Number(userData.anoParticipacao))
                  
                  setTituloBarema(userData.name)
              }
                  
                  else {
                console.log('User data not found');
              }
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };  
       }
      fetchData();
    }, [idDocumentBarema]);

    console.log('pesquisadoresSelecionados',pesquisadoresSelecionados)
    const [criterios, setCriterios] = useState([
        {id:1 , value:'Pós-doutorado', type:'Titulação'},
        {id:2 , value:'Doutorado' , type:'Titulação'},
        {id:3 , value:'Mestrado' , type:'Titulação'},
        {id:4 , value:'Especialista', type:'Titulação'},
        
        {id:5 , value:'Artigo em periódicos qualificados (A a C)', type:'Artigos'},
        {id:19 , value:'Todos os artigos', type:'Artigos'},
        {id:20 , value:'Artigo A1', type:'Artigos'},
        {id:21 , value:'Artigo A2', type:'Artigos'},
        {id:22 , value:'Artigo A3', type:'Artigos'},
        {id:23 , value:'Artigo A4', type:'Artigos'},
        {id:24 , value:'Artigo B1', type:'Artigos'},
        {id:25 , value:'Artigo B2', type:'Artigos'},
        {id:26 , value:'Artigo B3', type:'Artigos'},
        {id:27 , value:'Artigo B4', type:'Artigos'},
        {id:28 , value:'Artigo C', type:'Artigos'},
        {id:6 , value:'Artigos completos em anais de eventos', type:'Artigos'},

        {id:7 , value:'Livro publicado', type:'Produção científica'},
        {id:8 , value:'Capítulo de livro',  type:'Produção científica'},

        {id:9 , value:'Patente',  type:'Produção técnica'},
        {id:10 , value:'Software', type:'Produção técnica'},

        {id:11 , value:'Projetos de Pesquisa', type:''},

        {id:12 , value:'Pós-Graduação Stricto Sensu', type:'Formação de recursos humanos em andamento'},
        {id:13 , value:'Iniciação Científica', type:'Formação de recursos humanos em andamento'},
        {id:30 , value:'Mestrado', type:'Formação de recursos humanos em andamento'},
        {id:29 , value:'Doutorado', type:'Formação de recursos humanos em andamento'},

        {id:31 , value:'Pós-Graduação Stricto Sensu', type:'Formação de recursos humanos concluída'},
        {id:16 , value:'Iniciação Científica', type:'Formação de recursos humanos concluída'},
        {id:15 , value:'Mestrado', type:'Formação de recursos humanos concluída'},
        {id:14 , value:'Doutorado', type:'Formação de recursos humanos concluída'},
       
        

        {id:17 , value:'Organização', type:'Participação em eventos'},
        {id:18 , value:'Palestrante/ Mesa Redonda/ Conferencista/ Ministrante de Minicurso',  type:'Participação em eventos'},
    ])



  const [grupos, setGrupos] = useState<Grupo[]>([]);

  const [openPopovers, setOpenPopovers] = useState<boolean[][]>(
    () => grupos.map(group => group.categorias.map(() => false))
  );
  
  // Update openPopovers if grupos state changes, for instance, when groups are fetched from an API
  useEffect(() => {
    setOpenPopovers(grupos.map(group => group.categorias.map(() => false)));
  }, [grupos]);
  

      const [header, setHeader] = useState([
        {
         id: uuidv4(),
         titulo: 'Sem título',
        descricao: 'Adicione uma descrição para o grupo',
         anos_orientacaoes: '4',
         anos_producoes:''

        }
      ]);

      const adicionarGrupo = () => {
        const uuid = uuidv4()
        setGrupos([...grupos, {
            id: uuid,
            titulo: `Sem título ${grupos.length + 1}`,
            descricao: 'Adicione uma descrição para o grupo',
            categorias: [
                {
                    criterio: '',
                    pontos: '0',
                    pontuacao_max: '0',
                    id_grupo: uuid,
                    id_criterio:0,
                    pesquisadores:[]
                }
            ],
            quantidade_max_pontos: 0,
        }]);
    };

    console.log('barema id', idDocumentBarema)

    const adicionarCriterio = (idGrupo:any) => {
        const novoCriterio = {
            criterio: '',
            pontos: '0',
            pontuacao_max: '0',
            id_grupo: idGrupo,
            id_criterio:0,
            pesquisadores:[]
        };
        const novosGrupos = grupos.map(grupo => {
            if (grupo.id === idGrupo) {
                return {
                    ...grupo,
                    categorias: [...grupo.categorias, novoCriterio],
                };
            }
            return grupo;
        });
        setGrupos(novosGrupos);
    }

    //atualizar campos

    const handleInputChange = (e:any, index:any, idGrupo:any) => {
        const { name, value } = e.target;
        const novosGrupos = grupos.map(grupo => {
            if (grupo.id === idGrupo) {
                return {
                    ...grupo,
                    categorias: grupo.categorias.map((categoria, i) => {
                        if (i === index) {
                            return {
                                ...categoria,
                                [name]: value,
                            };
                        }
                        return categoria;
                    }),
                };
            }
            return grupo;
        });
        setGrupos(novosGrupos);
    };

    console.log(grupos)

    //deletar criterio

    const removerCriterio = (grupoIndex:any, categoriaIndex:any) => {
        const novosGrupos = [...grupos];
        novosGrupos[grupoIndex].categorias.splice(categoriaIndex, 1);
        setGrupos(novosGrupos);
    };

    //deletar grupo

    const deletarGrupo = (grupoIndex: number) => {
        if (grupos.length === 1) {
            // Se houver apenas um grupo, não o exclua
            return;
        }
    
        const novosGrupos = [...grupos];
        novosGrupos.splice(grupoIndex, 1);
        setGrupos(novosGrupos);
    
        // Limpar os popovers relacionados ao grupo excluído
        const novosOpenPopovers = [...openPopovers];
        novosOpenPopovers.splice(grupoIndex * novosGrupos[0].categorias.length, novosGrupos[0].categorias.length);
        setOpenPopovers(novosOpenPopovers);
    };
    
    

    //dupicar grupo

    const duplicarGrupo = (grupoIndex:any) => {
        const grupoDuplicado = { ...grupos[grupoIndex] };
        const novoId = uuidv4(); // Gerar um novo ID único
        grupoDuplicado.id = novoId;
    
        // Determinar a posição para adicionar o grupo duplicado
        const posicaoInsercao = grupoIndex + 1;
    
        // Copiar os grupos atuais
        const novosGrupos = [...grupos];
    
        // Inserir o grupo duplicado na posição determinada
        novosGrupos.splice(posicaoInsercao, 0, grupoDuplicado);
    
        // Atualizar o estado dos grupos
        setGrupos(novosGrupos);
    
        // Inicializar os popovers para o novo grupo duplicado como fechados
        const novosOpenPopovers = [...openPopovers];
        novosOpenPopovers.splice(posicaoInsercao, 0, ...Array(grupoDuplicado.categorias.length).fill(false));
        setOpenPopovers(novosOpenPopovers);
    };
    

    //editar quantidade max pontos

    const editarQuantidadeMaxPontos = (grupoIndex:any, novaQuantidade:any) => {
        const novosGrupos = [...grupos];
        novosGrupos[grupoIndex].quantidade_max_pontos = novaQuantidade;
        setGrupos(novosGrupos);
    };

    // pesquisadores
 


    //drag
    const onDragEnd = (result: any) => {
        if (!result.destination) return;
    
        const newGrupos = Array.from(grupos);
        const [reorderedItem] = newGrupos.splice(result.source.index, 1);
        newGrupos.splice(result.destination.index, 0, reorderedItem);
    
        setGrupos(newGrupos);
      };

    //select

    const selecionarCriterio = (grupoIndex: number, categoriaIndex: number, criterioId: number, criterioItem: string) => {
        const novosGrupos = grupos.map((grupo, index) => {
            if (index === grupoIndex) {
                const novasCategorias = grupo.categorias.map((categoria, idx) => {
                    if (idx === categoriaIndex) {
                        return {
                            ...categoria,
                            id_criterio: criterioId,
                            criterio: criterioItem
                        };
                    }
                    return categoria;
                });
                return {
                    ...grupo,
                    categorias: novasCategorias
                };
            }
            return grupo;
        });

        // Atualizar os estados
        setGrupos(novosGrupos);
    };
    

    //mudar titulo

    const [editingGrupoIndex, setEditingGrupoIndex] = useState(null); // Estado para controlar o índice do grupo em modo de edição
    const [editingDescricaoGrupoIndex, setEditingDescricaoGrupoIndex] = useState(null);
const toggleEditTitulo = (grupoIndex:any, type:any) => {
    if(type === 'titulo') {
        setEditingGrupoIndex(grupoIndex === editingGrupoIndex ? null : grupoIndex);
        setEditingDescricaoGrupoIndex(null)
    }
};

const handleTituloChange = (e:any, grupoIndex:any) => {
    const { value } = e.target;
    const novosGrupos = [...grupos];
    novosGrupos[grupoIndex].titulo = value;
    setGrupos(novosGrupos);
};

const toggleEditDescricao = (grupoIndex:any, type:any) => {
   if(type === 'descricao') {
    setEditingDescricaoGrupoIndex(grupoIndex === editingDescricaoGrupoIndex ? null : grupoIndex);
    setEditingGrupoIndex(null)
   }
};

const handleDescricaoChange = (e:any, grupoIndex:any) => {
    const { value } = e.target;
    const novosGrupos = [...grupos];
    novosGrupos[grupoIndex].descricao = value;
    setGrupos(novosGrupos);
};



//const config
const config = [
    { id: 1, itens: 'Artigos', valueSetter: setAnoArtigo , value: anoArtigo },
    { id: 2, itens: 'Artigos completos em anais de eventos', valueSetter: setAnoWorkInEvent, value:anoWorkInEvent },
    { id: 3, itens: 'Livros', valueSetter: setAnoLivro, value:anoLivro },
    { id: 4, itens: 'Capítulos de livro', valueSetter: setAnoCapLivro, value:anoCapLivro },
    { id: 5, itens: 'Patente', valueSetter: setAnoPatente, value:anoPatente },
    { id: 6, itens: 'Marca', valueSetter: setAnoMarca, value:anoMarca },
    { id: 7, itens: 'Software', valueSetter: setAnoSoftware, value:anoSoftware },
    { id: 8, itens: 'Formação em andamento', valueSetter: setAnoResourceProgess, value:anoResourceProgess },
    { id: 9, itens: 'Formação concluída', valueSetter: setAnoResourceCompleted, value:anoResourceCompleted },
    { id: 8, itens: 'Participação em eventos', valueSetter: setAnoParticipacao, value:anoParticipacao },
];

const Color: { [key: string]: string } = {
    'titulacao': 'bg-blue-200',
    'artigos': 'bg-blue-300',
    'T3': 'bg-blue-400',
    'T4': 'bg-blue-500',
    'T5': 'bg-blue-600',
  }

//reset config

const resetConfig = async () => {
    setAnoArtigo(Number(new Date().getFullYear() - 4));
    setAnoWorkInEvent(Number(new Date().getFullYear() - 4));
    setAnoLivro(Number(new Date().getFullYear() - 4));
    setAnoCapLivro(Number(new Date().getFullYear() - 4));
    setAnoPatente(Number(new Date().getFullYear() - 4));
    setAnoMarca(Number(new Date().getFullYear() - 4));
    setAnoSoftware(Number(new Date().getFullYear() - 4));
    setAnoResourceProgess(Number(new Date().getFullYear() - 4));
    setAnoResourceCompleted(Number(new Date().getFullYear() - 4));
    setAnoParticipacao(Number(new Date().getFullYear() - 4));

    toast("Resetado", {
        description: "Valores de anos alterados para últimos 4 anos de produção",
        action: {
          label: "Fechar",
          onClick: () => console.log("Undo"),
        },
      })
  }

  const [isOpenConfig, setIsOpenConfig] = useState(false)

  // Função para calcular a soma das pontuações máximas de todas as categorias do grupo
const calcularSomaPontuacaoMaxima = (grupo:any) => {
    return grupo.categorias.reduce((total, categoria) => total + parseInt(categoria.pontuacao_max), 0);
};



// soma de pontos
const handleResearcherUpdate = (newResearcherData: PesquisadorUpdate[]) => {
    const updatedGrupos = grupos.map(grupo => {
        const updatedCategorias = grupo.categorias.map(categoria => {
            // Encontrar os novos pesquisadores correspondentes a esta categoria
            const updatedPesquisadores = newResearcherData.filter(item => item.id_criterio === categoria.id_criterio);

            // Se não houver novos pesquisadores correspondentes, manter os antigos
            const pesquisadores = updatedPesquisadores.length > 0 ? updatedPesquisadores : categoria.pesquisadores;

            return {
                ...categoria,
                pesquisadores: pesquisadores,
            };
        });

        return {
            ...grupo,
            categorias: updatedCategorias,
        };
    });

    setGrupos(updatedGrupos);
};



const [valueTab, setValueTab] = useState('1')


//Somar grupos por id
const calcularSomaTotalPorGrupoEPesquisador = (grupos: any[]): any[] => {
    const somaTotalPorPesquisador: any[] = [];

    grupos.forEach((grupo) => {
        grupo.categorias.forEach((categoria: any) => {
            categoria.pesquisadores.forEach((pesquisador: any) => {
                const { id, name, total } = pesquisador;
                const pontuacaoMaxima = parseFloat(grupo.quantidade_max_pontos);

                let totalAtualizado = total;
                if (total > pontuacaoMaxima) {
                    totalAtualizado = pontuacaoMaxima;
                }

                // Verificar se o pesquisador já existe no array pelo seu 'id'
                const pesquisadorIndex = somaTotalPorPesquisador.findIndex((p: any) => p.id === id);
                
                if (pesquisadorIndex === -1) {
                    // Se o pesquisador não existe, adiciona-se um novo
                    somaTotalPorPesquisador.push({ id, name, total: totalAtualizado, grupos: [{ titulo: grupo.titulo, total: totalAtualizado }] });
                } else {
                    // Se o pesquisador já existe, verifica-se se o grupo já existe no array de grupos
                    const grupoIndex = somaTotalPorPesquisador[pesquisadorIndex].grupos.findIndex((g: any) => g.titulo === grupo.titulo);
                    if (grupoIndex === -1) {
                        // Se o grupo não existe, adiciona-se um novo
                        somaTotalPorPesquisador[pesquisadorIndex].grupos.push({ titulo: grupo.titulo, total: totalAtualizado });
                    } else {
                        // Se o grupo já existe, soma-se o total
                        somaTotalPorPesquisador[pesquisadorIndex].grupos[grupoIndex].total += totalAtualizado;
                    }

                    // Atualizar o total do pesquisador para incluir o total deste grupo
                    somaTotalPorPesquisador[pesquisadorIndex].total += totalAtualizado;
                }
            });
        });
    });

    return somaTotalPorPesquisador;
};

// Chame a função para calcular as somas totais por pesquisador em cada categoria e em cada grupo
const somaTotalPorPesquisador = calcularSomaTotalPorGrupoEPesquisador(grupos);
console.log(somaTotalPorPesquisador);




//fetch

    const [researcherSelecionados, setResearcherSelecionados] = useState<Research[]>([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Concatenando os nomes dos pesquisadores separados por ;
            const names = pesquisadoresSelecionados.map(pesquisador => pesquisador.name).join(';');
            
            let url = ''

            if(pesquisadoresSelecionados.length != 0) {
                 url = `${urlGeral}/resarcher_barema?name=${names}&lattes_id=&yarticle=${anoArtigo}&ywork_event=${anoWorkInEvent}&ybook=${anoLivro}&ychapter_book=${anoCapLivro}&ypatent=${anoPatente}&ysoftware=${anoSoftware}&ybrand=${anoMarca}&yresource_progress=${anoResourceProgess}&yresource_completed=${anoResourceCompleted}&yparticipation_events=${anoParticipacao}`;
            }
            // Construindo a URL com os nomes concatenados
            console.log(url)
            
            const response = await fetch(url, {
              mode: 'cors',
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600',
                'Content-Type': 'text/plain'
              }
            });
            
            const data = await response.json();
            if (data) {
              setResearcherSelecionados(data);
            }
          } catch (err) {
            console.log(err);
          }
        };
      
        fetchData();
      }, [pesquisadoresSelecionados]);


      //csv

      const convertJsonToCsv = (json: any[]): string => {
        const items = json;
        const replacer = (key: string, value: any) => (value === null ? '' : value); // Handle null values
        const header = Object.keys(items[0]);
        const csv = [
            '\uFEFF' + header.join(';'), // Add BOM and CSV header
            ...items.map((item) =>
                header.map((fieldName) => JSON.stringify(item[fieldName], replacer)).join(';')
            ) // CSV data
        ].join('\r\n');
    
        return csv;
    };

      const handleDownloadJson = async () => {
        try {
          const csvData = convertJsonToCsv(Object.values(somaTotalPorPesquisador).map((grupo) => grupo).sort((a, b) => parseFloat(b.total) - parseFloat(a.total)));
          const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `p.csv`;
          link.href = url;
          link.click();
        } catch (error) {
          console.error(error);
        }
      };


      //firebase 
      const handleSunmitBarema = async () => {
        try {
            const createdAt = new Date().toISOString()
            const idBaremaData = idBarema || uuidv4(); // Define um novo ID se não existir

            if(idDocumentBarema == '') {
                const formData = {
                    id:idBaremaData,
                    name:tituloBarema,
                    createdAt:createdAt,
                    userId:user.uid,
                    pesquisadores:pesquisadoresSelecionados,
                    grupos:grupos,
    
                    anoArtigo:anoArtigo,
                    anoWorkInEvent:anoWorkInEvent,
                    anoLivro:anoLivro,
                    anoCapLivro:anoCapLivro,
                    anoPatente:anoPatente,
                    anoMarca:anoMarca,
                    anoSoftware:anoSoftware,
                    anoResourceProgess:anoResourceProgess,
                    anoResourceCompleted:anoResourceCompleted,
                    anoParticipacao:anoParticipacao
    
                }

                setIdBarema(idBaremaData)

                const db = getFirestore();
            const programRef = collection(db, 'baremas');
            await addDoc(programRef, formData);

            toast("Barema salvo", {
                description: "Você pode acessá-lo em meus baremas",
                action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
                },
            })
            } else {
                const formData = {
                    id:idBarema,
                    name:tituloBarema,
                    createdAt:createdAt,
                    userId:user.uid,
                    pesquisadores:pesquisadoresSelecionados,
                    grupos:grupos,
    
                    anoArtigo:anoArtigo,
                    anoWorkInEvent:anoWorkInEvent,
                    anoLivro:anoLivro,
                    anoCapLivro:anoCapLivro,
                    anoPatente:anoPatente,
                    anoMarca:anoMarca,
                    anoSoftware:anoSoftware,
                    anoResourceProgess:anoResourceProgess,
                    anoResourceCompleted:anoResourceCompleted,
                    anoParticipacao:anoParticipacao
                }

                const db = getFirestore();
            const programRef = doc(db, 'baremas', idDocumentBarema);
            await updateDoc(programRef, formData);

            toast("Barema atualizado", {
                description: "Você pode acessá-lo em meus baremas",
                action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
                },
            })
            }
            

            

           

            
          

        } catch (error) {
            console.error('Erro ao enviar os dados:', error);

            toast("Tente novamente", {
                description: "Erro ao salvar barema",
                action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
                },
            })
          }
      }
      //firebase submit

      const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }

    const [tab, setTab] = useState('all')
      
     
    return (
        <>
            {isModalOpen && (
                  <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 min-h-[calc(100vh-56px)]">
                   

                    <Tabs defaultValue={tab} value={tab} className="h-full" >
                    <div className="w-full  gap-4">
            <div className="flex items-center gap-4">
          
            <Button onClick={handleVoltar} variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Baremas de avaliação
              </h1>
             

                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <TabsList >
                
              <TabsTrigger value="all" onClick={() => setTab('all')} className="text-zinc-600 dark:text-zinc-200">Todos os baremas</TabsTrigger>

                <TabsTrigger value="unread" onClick={() => setTab('unread')}  className="text-zinc-600 dark:text-zinc-200">Pesquisar barema</TabsTrigger>

              
                </TabsList>
               
          
                <Button size="sm" onClick={() => setTab('new')}><Plus size={16}/>Adicionar barema</Button>
              </div>
            </div>

            </div>

            <TabsContent value="all" className="h-auto flex flex-col gap-4 md:gap-8 ">
            <div>
               
        
        <h1 className=" max-w-[900px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]  md:block mb-3 ">
        Meus baremas de avaliação
        </h1>
        <p className="max-w-[750px]  text-lg font-light text-foreground">Atualize os dados importando o arquivo .xls na plataforma </p>
                  <div className="flex gap-3 mt-3">
                    <Button size={'sm'} 
                   >Importar dados dos docentes</Button>
                    <Button size={'sm'} variant={'ghost'} >Importar bolsistas CNPq</Button>
                  </div>

                  </div>
            </TabsContent>

            <TabsContent value="unread" className=" flex flex-col gap-4 md:gap-8 ">
                    <ProcurarBaremas/>
            </TabsContent>

            <TabsContent value="new" className="h-auto flex flex-col gap-4 md:gap-8 ">
            <HeaderBarema />
            <div className="flex">
            <Tabs defaultValue="1" value={valueTab} className="w-full">
                        <div className="flex flex-col gap-8 w-full">
                        <div className="w-full flex flex-col">
                            <div className=" dark:border-neutral-800 border border-b-0 border-neutral-200 h-3 rounded-t-md bg-[#719CB8] whitespace-nowrap"></div>

                            <Alert  className="rounded-t-none ">
                            <div className="flex justify-between  mb-6">
                            <div className="flex flex-col ">
                            {editTituloBarema ? (
                                <div className="flex items-center gap-3 mb-2 ">
                           <Input value={tituloBarema} className="flex-1" onChange={(e) => setTituloBarema(e.target.value)} />
                    <Button variant={'ghost'} size={'icon'} className=" whitespace-nowrap" onClick={() => setEditTituloBarema(!editTituloBarema)}>
                        <Check size={16} />
                    </Button>
                                </div>
                            ): (
                                <div className="flex items-center gap-3 mb-2 ">
                            <h1 className=" text-xl  font-medium max-w-[380px] bg-red-700 text-white"> {tituloBarema}</h1>
                            <Button variant={'ghost'} size={'icon'} className=" whitespace-nowrap" onClick={() => setEditTituloBarema(!editTituloBarema)}>
                        <PencilLine size={16} />
                    </Button>
                                </div>
                            )}
                            <p className="mt-2 max-w-[500px] text-gray-500 text-xs dark:text-gray-300">Estas configurações incluem o nome do barema para exportação, o período de ano a ser considerado para a análise e outras definições.</p>
                            </div>

                            <div className="flex gap-3">
                            <Button  onClick={() => handleSunmitBarema()} ><Check size={16} />Salvar alterações</Button>
                            </div>
                        </div>

                            <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="1" onClick={() => setValueTab('1')}>Configurações</TabsTrigger>
                            <TabsTrigger value="2" onClick={() => setValueTab('2')}>Resultados</TabsTrigger>
                        </TabsList>
                                </Alert>
                            
                            </div>
                            
                                
                           <TabsContent value="1" className="w-full flex gap-8 flex-col m-0 p-0">
                        <div className="w-full flex">
                        <div className=" dark:border-neutral-800 border border-r-0 border-neutral-200 w-2 rounded-l-md bg-[#719CB8] whitespace-nowrap"></div>

                        <Alert  className="rounded-l-none ">
                        <Accordion  type="single" collapsible>
                <AccordionItem value="item-1">
                <div className="flex  h-12">
                <HeaderResultTypeHome title="Configurações da avaliação" icon={<Gear size={24} className="text-gray-400" />}>
                    </HeaderResultTypeHome>
                  <AccordionTrigger>
                   
                  </AccordionTrigger>
                  </div>
                  <AccordionContent>
                  <div>
                                <div className="gap-4 grid grid-cols-2 ">
                        {config.map((props) => {
    return(
        <div className="flex gap-3" key={props.id}>
            <div className={` gap-3 transition-all flex items-center  rounded-md text-xs font-medium `}>
               
                <span className=" block min-w-[200px]">{props.itens}</span>
              
            </div>
            <Input
                className=""
                type="number"
                onChange={(e) => props.valueSetter(Number(e.target.value))}
                value={Number(props.value)}
            />
        </div>
    );
})}
</div>
                            </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

                   

                        
                        </Alert>
                        </div>
                      
                            <div className="flex flex-col gap-8">
            {grupos.map((grupo, grupoIndex) => (
            
                 
                                                            <div className="w-full flex">
                                                                <div className=" dark:border-neutral-800 border border-r-0 border-neutral-200 w-2 rounded-l-md bg-[#719CB8] whitespace-nowrap"></div>
                                                                <div className="w-full">
                                                                    <Alert className="rounded-l-none rounded-b-none">
                                                                        <div className="w-full flex items-center justify-center cursor-pointer text-gray-500"><DotsSix size={20} /></div>
                                                                        <div className="flex justify-between  mb-6">
                                                                            <div className="flex flex-col w-auto">
                                                                                <div className="flex items-center gap-3 ">
                                                                                {editingGrupoIndex === grupoIndex  ? ( // Renderizar input de edição se o grupo estiver em modo de edição
                <>
                    <Input value={grupo.titulo} className="flex-1" onChange={(e) => handleTituloChange(e, grupoIndex)} />
                    <Button variant={'ghost'} size={'icon'} className=" whitespace-nowrap" onClick={() => toggleEditTitulo(grupoIndex, 'titulo')}>
                        <Check size={16} />
                    </Button>
                </>
            ) : ( // Renderizar título normalmente se o grupo não estiver em modo de edição
                <>
                    <Rows size={24} className="text-gray-400" />
                    <p className="text-sm font-bold">{grupo.titulo}</p>
                    <Button variant={'ghost'} size={'icon'} onClick={() => toggleEditTitulo(grupoIndex, 'titulo')}>
                        <PencilLine size={16} />
                    </Button>
                </>
            )}
                                                                                </div>

                                                                                <div className="flex items-center gap-3  ">
                                                                                
                                                    

                                                                                </div>
                                                                            </div>

                                                                            <div className="">
                                                                                <Button variant={'ghost'} onClick={() => adicionarCriterio(grupo.id)} ><PlusCircle size={16} />Adicionar critério</Button>
                                                                            </div>
                                                                        </div>

                                                                        <Table>
                                                                        {grupo.categorias.length !== 0 && (
                                                                            <TableHeader>
                                                                            <TableRow>
                                                                              <TableHead className="w-[100px] min-w-[100px] ">Critério</TableHead>
                                                                              <TableHead className="w-[100px] min-w-[100px]">Pontuação</TableHead>
                                                                              <TableHead className="w-[200px] min-w-[200px]">Pontuação máxima</TableHead>
                                                                              <TableHead className="text-right w-ful">Total</TableHead>
                                                                            </TableRow>
                                                                          </TableHeader>
                                                                        )}

                                                                        <TableBody>
                                                                        {grupo.categorias.length !== 0 && (
                                                                           
                                                                                grupo.categorias.map((categoria, index) => (
                                                                                    <TableRow>
                                                                                        <TableCell>
                                                                                        <div className="">
                                                                                      

                                                                                        <Dialog
                              open={openPopovers[grupoIndex]?.[index] || false}
                              onOpenChange={(isOpen) => {
                                // Create a copy of the current state
                                const newOpenPopovers = openPopovers.map((groupOpen, gi) =>
                                  gi === grupoIndex
                                    ? groupOpen.map((open, ci) => (ci === index ? isOpen : open))
                                    : groupOpen
                                );
                                // Update the state
                                setOpenPopovers(newOpenPopovers);
                              }}
                            >
                              <DialogTrigger className="w-full">
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className="w-full justify-between"
                                >
                                  {categoria.criterio.length === 0 ? 'Escolha um critério' : categoria.criterio}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="z-[9999]">
                              <DialogHeader>
      <DialogTitle>Escolher critério</DialogTitle>
      <DialogDescription>
       Todos os docentes cadastrado no Módulo Administrativo da instituição
      </DialogDescription>
    </DialogHeader>
                              <div className={'max-h-[350px] overflow-y-auto elementBarra'}>
                              
                              <div className="flex flex-col gap-1 p-2">
                              {criterios.map((criterio) => (
                                <Button
                                variant={'ghost'}
                                className="text-left justify-start"
                  key={criterio.id}
                  value={criterio.value}
                  onClick={() => selecionarCriterio(grupoIndex, index, criterio.id, criterio.value)}

               
              >
                  <span>{criterio.value}</span>
              </Button>
                              ))}
                              </div>
                              </div>

                              </DialogContent>
                            </Dialog>
                                                                                        </div>
                                                                                        </TableCell>

                                                                                        <TableCell><Input className="w-24" name="pontos" value={categoria.pontos} onChange={(e) => handleInputChange(e, index, grupo.id)} /></TableCell>
                                                                                        <TableCell><Input className={`w-24 ${categoria.pontos > categoria.pontuacao_max && ('border-red-500')}`} name="pontuacao_max" value={categoria.pontuacao_max} onChange={(e) => handleInputChange(e, index, grupo.id)} /></TableCell>
                                                                                        
                                                                                        <TableCell>
                                                                                        <div className="flex justify-between items-center gap-3">
                                                                                            <div className="overflow-x-auto flex-nowrap flex-1">
                                                                                                <PesquisadorItemBarema 
                                                                                                pontos={Number(categoria.pontos)} 
                                                                                                pontuacao_max={Number(categoria.pontuacao_max)}  
                                                                                                id_criterio={categoria.id_criterio}

                                                                                                researcherSelecionados={researcherSelecionados}

                                                                                                onPesquisadoresUpdate={handleResearcherUpdate}
                                                                                                />
                                                                                            </div>
                                                                                            <Button className=" group-hover:flex hidden whitespace-nowrap" variant={'ghost'} size={'icon'} onClick={() => removerCriterio(grupoIndex, index)}><Trash size={16} /> </Button>
                                                                                        </div>
                                                                                        </TableCell>
                                                                                        </TableRow>
                                                                                ))
                                                                            
                                                                        )}
                                                                         </TableBody>
                                                                        </Table>
                                                                    </Alert>
                                                                    <Alert className="rounded-l-none rounded-t-none border-t-0 dark:bg-neutral-800 bg-neutral-100 flex justify-between items-center">
                                                                        <div>
                                                                            {grupo.categorias.length !== 0 && (
                                                                                <div className="flex items-center gap-3">
                                                                                    <p className="text-xs whitespace-nowrap ">Subtotal (o máximo a ser considerado é</p>
                                                                                    <Input className={`w-16 ${calcularSomaPontuacaoMaxima(grupo) > grupo.quantidade_max_pontos && 'border-red-500'}`} value={grupo.quantidade_max_pontos} onChange={(e) => editarQuantidadeMaxPontos(grupoIndex, e.target.value)} />
                                                                                    <p className="text-xs whitespace-nowrap ">pontos)</p>

                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                        <div className="flex gap-3 items-center">
                                                                            <Button variant={'ghost'} className="hover:bg-neutral-200 dark:hover:bg-neutral-700" size={'icon'} onClick={() => duplicarGrupo(grupoIndex)}><Copy size={16} /> </Button>
                                                                            <Button variant={'ghost'} className="hover:bg-neutral-200 dark:hover:bg-neutral-700" size={'icon'} onClick={() => deletarGrupo(grupoIndex)} ><Trash size={16} /> </Button>
                                                                            <div className="h-8 w-[0.5px] bg-neutral-500 dark:bg-white"></div>
                                                                            <Button variant={'ghost'} className="hover:bg-neutral-200 dark:hover:bg-neutral-700" size={'icon'} ><MoreHorizontal className="h-4 w-4" /> </Button>
                                                                        </div>
                                                                    </Alert>
                                                                </div>
                                                            </div>
                                                     
                 
                                            
                                            ))}

</div>

                                          
                            </TabsContent>

                            <TabsContent value="2" className="w-full flex gap-3 flex-col m-0 p-0">
                            <div className="w-full flex">
                        <div className=" dark:border-neutral-800 border border-r-0 border-neutral-200 w-2 rounded-l-md bg-[#719CB8] whitespace-nowrap"></div>

                        <Alert  className="rounded-l-none ">
                        <div className="flex justify-between  mb-6">
                            <div className="flex flex-col ">
                            <div className="flex items-center gap-3 mb-2 mt-4 ">
                            <Users size={24} className="text-gray-400" />
           <p className="text-sm font-bold">{pesquisadoresSelecionados.length} {pesquisadoresSelecionados.length != 1 ? ('pesquisadores'):('pesquisador(a)')}</p>
           </div>
                            <p className="mt-2 max-w-[500px] text-gray-500 text-xs dark:text-gray-300">Estas configurações incluem o nome do barema para exportação, o período de ano a ser considerado para a análise e outras definições.</p>
                            </div>

                            <div className="flex gap-3">
                           
                            </div>
                        </div>

                            </Alert>
                            </div>

                            <div className="w-full flex">
                        <div className=" dark:border-neutral-800 border border-r-0 border-neutral-200 w-2 rounded-l-md bg-[#719CB8] whitespace-nowrap"></div>

                        <Alert  className="rounded-l-none ">
                        <div className="flex justify-between  mb-6">
                            <div className="flex flex-col ">
                            <div className="flex items-center gap-3 mb-2 mt-4 ">
                            <ChartBar size={24} className="text-gray-400" />
           <p className="text-sm font-bold">Resultado e classificação dos pesquisadores</p>
           </div>
                            <p className="mt-2 max-w-[500px] text-gray-500 text-xs dark:text-gray-300">Soma de todas as pontuações dos pesquisadores por grupo.</p>
                            </div>

                            <div className="flex gap-3">
                            <Button variant={'ghost'} onClick={() => handleDownloadJson()}  ><Download size={16} />Baixar resultado</Button>
                            </div>
                        </div>

                        {grupos.length !=0 && (
                            <div>
                            <Table>
                                   <TableHeader>
                                <TableRow>
                                <TableHead className="" >Pesquisadores</TableHead>
                                {grupos.map((grupo) => {
                                         return (
                                            <TableHead >{grupo.titulo}</TableHead>
                                         );
                                     })}
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                <TableRow>
                                {Object.values(somaTotalPorPesquisador)
                                    .map((grupo) => grupo)
                                    .sort((a, b) => parseFloat(b.total) - parseFloat(a.total))
                                    .map((grupoOrdenado) => (
                                        <TableCell>
                                             <div className="flex items-center gap-3">
                                <div className="rounded-md w-8 h-8 bg-cover bg-center bg-no-repeat group-hover:rounded-l-lg group-hover:rounded-r-none whitespace-nowrap" style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${grupoOrdenado.id})` }}></div>
                                <p className="flex flex-1 text-gray-500 text-sm truncate dark:text-white">{grupoOrdenado.name}</p>
                            </div>
                                        </TableCell>

                                    ))}
                                </TableRow>
                            </TableBody>
                                    </Table>  
     
                                 
                                
                               <div>
                               <div className={`w-full flex gap-4 flex-col border border-neutral-200 rounded-t-none border-t-0 dark:border-neutral-800 py-3 px-4 rounded-md `}>
                               {Object.values(somaTotalPorPesquisador)
       .map((grupo) => grupo)
       .sort((a, b) => parseFloat(b.total) - parseFloat(a.total))
       .map((grupoOrdenado) => (
         <div key={grupoOrdenado.id} className={`grid gap-3 border-neutral-200 dark:border-neutral-800 border-b pb-3 w-full`}  style={{ gridTemplateColumns: `repeat(${grupos.length + 2}, minmax(0, 1fr))` }}>
           <div className="flex items-center gap-3">
             <div className="rounded-md w-8 h-8 bg-cover bg-center bg-no-repeat group-hover:rounded-l-lg group-hover:rounded-r-none whitespace-nowrap" style={{ backgroundImage: `url(${urlGeral}ResearcherData/Image?researcher_id=${grupoOrdenado.id})` }}></div>
             <p className="flex flex-1 text-gray-500 text-sm truncate dark:text-white">{grupoOrdenado.name}</p>
           </div>
     
           {grupoOrdenado.grupos.map((grupo) => (
             <div key={grupo.titulo} className="flex items-center gap-3">
               <div className="items-center justify-center whitespace-nowrap rounded-md flex border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-10 px-4 py-2 w-fit text-gray-600 text-sm dark:text-white font-normal">{parseFloat(grupo.total).toFixed(2)}</div>
             </div>
           ))}
           <div className="items-center justify-center whitespace-nowrap rounded-md flex border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-10 px-4 py-2 w-fit text-gray-600 text-sm dark:text-white font-normal">{parseFloat(grupoOrdenado.total).toFixed(2)}</div>
         </div>
       ))}
     
                             </div>
                               </div>
                                 
                                 
                            </div>
                        )}

                            

                            </Alert>
                            </div>

                            <div className="w-full flex">
                        <div className=" dark:border-neutral-800 border border-r-0 border-neutral-200 w-2 rounded-l-md bg-blue-700 whitespace-nowrap"></div>

                        <Alert  className="rounded-l-none ">
                        <div className="flex justify-between  mb-6">
                            <div className="flex flex-col ">
                            <div className="flex items-center gap-3 mb-2 mt-4 ">
                            <ChartLine size={24} className="text-gray-400" />
           <p className="text-sm font-bold">Gráfico de resultados</p>
           </div>
                          
                            </div>

                            <div className="flex gap-3">
                           
                            </div>
                        </div>

                        <div>
                        <GraficoBarema pesquisadores={Object.values(somaTotalPorPesquisador)
  .map((grupo) => grupo)
  .sort((a, b) => parseFloat(b.total) - parseFloat(a.total))}
/>
                            </div>
                            </Alert>

                           
                            </div>
                            </TabsContent>
                        </div>
                        
                        

                        
                        
                        </Tabs>

                        <div className="w-16 pl-2 whitespace-nowrap">
                            <div className="bg-white dark:bg-black sticky top-8 flex flex-col gap-2 border dark:border-neutral-800 border-neutral-200 items-center p-2 rounded-md w-full ">
                                <Button onClick={adicionarGrupo} variant={'ghost'} size={'icon'}><PlusCircle size={20} /> </Button>
                                <Button variant={'ghost'} size={'icon'}><FileCsv size={20} /> </Button>
                            </div>
                        </div>


            </div>
            </TabsContent>

                    </Tabs>
                </main>
            )}
        </>
    )
}