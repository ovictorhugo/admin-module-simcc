import { useContext, useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";
import { Blocks, Building2, Check, ChevronLeft, ClipboardEdit, FlaskConical, GraduationCap, Home, Mail, Minus, PieChart, SlidersHorizontal, Users, Weight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Research } from "../researcher/researcher-page";
import { toast } from "sonner";
import { NuvemPalavras } from "../popup/nuvem-palavras";
import { Coautores } from "../popup/coautores";
import { TotalViewResearcher } from "../popup/total-view-researcher";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { InformacoesGeraisResearcher } from "../popup/informacoes-gerais-researcher";
import { CalendarBlank } from "phosphor-react";

export function HomeDashboard() {
  const { role, permission, urlGeral, urlGeralAdm, user, version } = useContext(UserContext);
  const history = useNavigate();

  const handleVoltar = () => {
    history(-1);
  };

  const permissions = {
    hasBaremaAvaliacao: permission.some(perm => perm.permission === 'criar_barema_avaliacao'),
    hasNotificacoes: permission.some(perm => perm.permission === 'enviar_notificacoes'),
    hasVisualizarPesquisadores: permission.some(perm => perm.permission === 'visualizar_pesquisadores'),
    hasVisualizarTodosDepartamentos: permission.some(perm => perm.permission === 'visualizar_todos_departamentos'),
    hasVisualizarTodosProgramas: permission.some(perm => perm.permission === 'visualizar_todos_programas'),
    hasVisualizarGruposPesquisa: permission.some(perm => perm.permission === 'visualizar_grupos_pesquisa'),
    hasVisualizarInct: permission.some(perm => perm.permission === 'visualizar_inct'),
    hasEditarPesosAvaliacao: permission.some(perm => perm.permission === 'editar_pesos_avaliacao'),
    hasVisualizarIndicadoresInstituicao: permission.some(perm => perm.permission === 'visualizar_indicadores_instituicao'),
    hasVisualizarGerenciaModuloAdministrativo: permission.some(perm => perm.permission === 'visualizar_gerencia_modulo_administrativo')
  };

  const [researcher, setResearcher] = useState<Research[]>([]);

  const accessLinks = [
    { permission: 'hasVisualizarGerenciaModuloAdministrativo', to: '/dashboard/administrativo', icon: <SlidersHorizontal size={16} />, label: 'Administrativo' },
    { permission: 'hasVisualizarTodosDepartamentos', to: '/dashboard/departamentos', icon: <Building2 size={16} />, label: 'Departamentos' },
    { permission: 'hasVisualizarPesquisadores', to: '/dashboard/pesquisadores', icon: <Users size={16} />, label: 'Pesquisadores' },
    { permission: 'hasVisualizarTodosProgramas', to: '/dashboard/programas', icon: <GraduationCap size={16} />, label: 'Programas' },
    { permission: 'hasVisualizarGruposPesquisa', to: '/dashboard/grupos-pesquisa', icon: <Blocks size={16} />, label: 'Grupos de pesquisa' },
    { permission: 'hasVisualizarInct', to: '/dashboard/inct', icon: <FlaskConical size={16} />, label: 'INCT\'s' },
    { permission: 'hasEditarPesosAvaliacao', to: '/dashboard/pesos-avaliacao', icon: <Weight size={16} />, label: 'Pesos de avaliação' },
    { permission: 'hasVisualizarIndicadoresInstituicao', to: '/dashboard/indicadores', icon: <PieChart size={16} />, label: 'Indicadores' },
    { permission: 'hasBaremaAvaliacao', to: '/dashboard/baremas', icon: <ClipboardEdit size={16} />, label: 'Baremas' },
    { permission: 'hasNotificacoes', to: '/dashboard/enviar-notificacoes', icon: <Mail size={16} />, label: 'Enviar notificações' }
  ];

  const tabs = [
    { id: "visao_geral", label: "Visão geral", icon: Home },
    { id: "pos_graduaçao", label: "Programas de pós-graduação", icon: GraduationCap },
   
  
 
  ];

  const [value, setValue] = useState(tabs[0].id)
  let urlTermPesquisadores = urlGeral + `researcherName?name=${user?.display_name}`;
  const [loading, isLoading] = useState(true)


    useMemo(() => {
      const fetchData = async () => {
        try {
          isLoading(true)
          const response = await fetch(urlTermPesquisadores, {
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
            setResearcher(data);
            isLoading(false)
          }

  
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [urlTermPesquisadores]);


      const [variations, setVariations] = useState<string[]>([]);
    
       useMemo(() => {
        
      
         
            setVariations(generateNameVariations(user?.display_name || ''))
       
        }, []);

        function generateNameVariations(name: string): string[] {
          const parts = name.toUpperCase().split(' ');
          const lastName = parts[parts.length - 1];
          const initials = parts.map(part => part[0]).join('. ');
          const initialsWithDots = initials.replace(/ /g, '.');
          const firstAndMiddleNames = parts.slice(0, -1).join(' ');
          const variations = [
            `${lastName.toUpperCase()}, ${initials.toUpperCase()}`,
            `${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}, ${initials.toUpperCase()}`,
            `${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}, ${initialsWithDots.toUpperCase()}`,
            `${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}, ${firstAndMiddleNames.charAt(0).toUpperCase() + firstAndMiddleNames.slice(1).toLowerCase()} ${initials.toUpperCase()}`,
            `${lastName.toUpperCase()}, ${firstAndMiddleNames.charAt(0).toUpperCase()}`,
            `${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}, ${firstAndMiddleNames.charAt(0).toUpperCase() + firstAndMiddleNames.slice(1).toLowerCase()}`,
            `${lastName.toUpperCase()}, ${firstAndMiddleNames.toUpperCase()}`,
            `${lastName.toUpperCase()}, ${firstAndMiddleNames.charAt(0).toUpperCase() + firstAndMiddleNames.slice(1).toLowerCase()} ${initialsWithDots.toUpperCase()}`,
            `${parts[parts.length - 2].toUpperCase()} ${lastName.toUpperCase()}, ${firstAndMiddleNames.toUpperCase()}`,
            `${lastName.toUpperCase()}, ${initials.charAt(0).toUpperCase()}`,
            `${lastName.toUpperCase()}, ${name.toUpperCase()}`,
            `${lastName.toUpperCase()}, ${firstAndMiddleNames.charAt(0).toUpperCase() + firstAndMiddleNames.slice(1).toLowerCase()} ${initials.toUpperCase()}`,
            `${initials.charAt(0).toUpperCase()}. ${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}, ${initials.toUpperCase()}`,
            `${initialsWithDots.toUpperCase()} ${lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase()}`,
            `${initialsWithDots.toUpperCase()} ${lastName.toUpperCase()}`
          ];
      
          return variations;
        }

  return (
    <main className="flex flex-1 flex-col  p-4  md:p-8 relative">
      <Helmet>
        <title>Dashboard | Módulo administrativo | {version ? 'Conectee' : 'Simcc'}</title>
        <meta name="description" content={`Dashboard | Módulo administrativo | ${version ? 'Conectee' : 'Simcc'}`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
    <div className="flex relative">
    <div className="bg-eng-blue flex-col flex items-center justify-center w-full   rounded-lg h-[400px]">
    <div className="w-full gap-4 p-8 pb-0">
    <div className="flex items-center gap-4">
 
   <Button  onClick={handleVoltar} variant='ghost' size="icon" className="h-7 w-7 text-white hover:text-eng-blue dark:hover:text-eng-blue">
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Voltar</span>
      </Button>
  
      <h1 className="flex-1 shrink-0 text-white whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Dashboard
        
      </h1>

    
  
     
      <div className="hidden items-center h-10 gap-2 md:ml-auto md:flex">
                  
      {researcher.slice(0, 1).map((props) => {


const payment = props.lattes_id

const currentDate = new Date();
const lattesUpdate = String(props.lattes_update).split('/');
const lattesMonth = parseInt(lattesUpdate[1]);
const lattesYear = parseInt(lattesUpdate[2]);

const monthDifference = (currentDate.getFullYear() - lattesYear) * 12 + (currentDate.getMonth() + 1 - lattesMonth);

const isOutdated = monthDifference > 3;
const isOutdated6 = monthDifference > 6;

return (
  <div className="hidden items-center gap-2  md:flex">
    <div className={`border hidden  w-fit py-2 px-4 text-white rounded-md dark:border-white text-xs font-bold lg:flex gap-1 items-center ${isOutdated6 ? ('bg-red-500 text-white border-none') : isOutdated ? ('bg-yellow-600 text-white border-none') : ('')}`}> <CalendarBlank size={16} /> Atualização do Lattes: {String(props.lattes_update)}</div>


    {researcher.slice(0, 1).map((user) => {
      return (
        <div
          className={`
            hidden text-[0.5rem] py-2 px-4 border dark:border-neutral-800 w-fit
            rounded-md  font-bold gap-1 items-center

            md:text-xs md:py-2 md:px-4 

            lg:flex
            text-white border-none
            ${user.status ? ('bg-green-500 ') : ('bg-red-500')}
          `}
        >
          {user.status ? (<Check size={16} />) : (<Minus size={16} />)} {user.status ? ('Ativo') : ('Inativo')}
        </div>
      )
    })}

    <div className="flex gap-3 items-center">



     

    </div>
  </div>


)
})}
      </div>
    </div>

    </div>
  <div className="flex flex-1 w-full items-center">
  <div className="flex gap-8">
    <div className=" min-w-[350px]  w-full grid grid-cols-1"  >

    </div>
   
    <div className="w-full flex "  >
    <div>
         
  {role.length > 0 && (  <Badge className="mb-4 text-eng-blue" variant="secondary">{role}</Badge>)}
         <h1 className="text-3xl text-white mb-2  font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
         Olá, {user?.display_name}
         </h1>

         <p className="max-w-[750px] text-lg font-light text-foreground">
       <div className="flex flex-wrap gap-4 ">
<div className="text-sm text-white font-normal flex gap-1 items-center"><Mail size={12}/>{user?.email}</div>


</div> 
         </p>
       </div>
    </div>



    </div>
  </div>
    </div>
    </div>
    

   <div className="z-[1] flex flex-col gap-8">
   
   <div className="flex gap-8">
    <div className=" -top-[100px] relative flex flex-col md:gap-8 gap-4"  >
<div className="flex gap-3">
<Button variant={'outline'} size={'icon'} className="text-eng-blue ">e</Button>
<Button variant={'outline'} size={'icon'} className="text-eng-blue ">e</Button>
</div>

        <Alert>

        </Alert>

         <div className="min-w-[350px]  w-full grid grid-cols-1">
                                <ResponsiveMasonry
                                  columnsCountBreakPoints={{
                                    350: 1,
                                    750: 1,
                                    900: 1,
                                    1200: 1
                                  }}
                                >
                                  <Masonry gutter="24px">
        
                                   
        
                                    {researcher.slice(0, 1).map((user) => {
                                      return (
                                        <TotalViewResearcher
                                          among={user.among}
                                          articles={user.articles}
                                          book={user.book}
                                          book_chapters={user.book_chapters}
                                          patent={user.patent}
                                          software={user.software}
                                          brand={user.brand}
                                        />
                                      )
                                    })}
        
                                    {researcher.slice(0, 1).map((user) => {
                                      return (
                                        <NuvemPalavras
                                          id={user.id}
                                        />
                                      )
                                    })}
        
                                    {researcher.slice(0, 1).map((user) => {
                                      return (
                                        <Coautores
                                          id={user.id}
                                          name={user.name}
                                        />
                                      )
                                    })}
        
                                    {researcher.slice(0, 1).map(() => {
                                      return (
                                        <div>
                                          <div className="mb-6 font-medium text-2xl">Nomes de citação</div>
                                          <div className="flex flex-wrap gap-1">
                                            {variations.map((variation, index) => (
                                              <p className="text-xs " key={index}>{variation} /</p>
                                            ))}
                                          </div>
                                        </div>
                                      )
                                    })}
        
                                  </Masonry>
                                </ResponsiveMasonry>
                              </div>
    </div>
   
    <div className="flex-1 w-full -top-[50px] relative  flex flex-col md:gap-8 gap-4"  >
    <Tabs defaultValue={tabs[0].id} value={value} className="">
<div className="w-full flex justify-between bap-8">
<ScrollArea className="relative overflow-x-auto">
<TabsList className="p-0 justify-start flex gap-2 h-auto bg-transparent dark:bg-transparent">
{tabs.map(
({ id, label, icon: Icon }) =>
 
    <div
      key={id}
      className={`pb-2 border-b-2 text-black dark:text-white transition-all ${
        value === id ? "border-b-white" : "border-b-transparent"
      }`}
      onClick={() => setValue(id)}
    >
      <Button variant="ghost" className={`m-0 text-white hover:text-eng-blue ${ value === id ? "bg-white text-eng-blue" : ""}`}>
        <Icon size={16} />
        {label}
      </Button>
    </div>
  
)}
</TabsList>
<ScrollBar orientation="horizontal" />
</ScrollArea>

<div>

</div>
</div>

<TabsContent value="visao_geral" className="m-0">
<div className="grid gap-8  w-full mt-8">
<h3 className="text-2xl font-medium ">Acesso rápido na plataforma</h3>

<div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 mgrid-cols-1 2xl:grid-cols-3 xl:grid-cols-3">
        {accessLinks.map(({ permission, to, icon, label }) => 
          permissions[permission] && (
            <Link to={to} key={to} >
              <Alert className="h-[80px] bg-blue-100 border-0 hover:bg-blue-200 text-sm dark:bg-blue-100/50 dark:hover:bg-blue-200/50 transition-all cursor-pointer flex items-center lg:p-8">
                <div className="flex w-full justify-between items-center gap-3  cursor-pointer">
                  <div>
                  {label}
                  </div>

                  <div className="h-10 w-10 rounded-md bg-black/10 flex items-center justify-center">
                  {icon}
                  </div>
                </div>
              </Alert>
            </Link>
          )
        )}
      </div>
</div>
</TabsContent>



<TabsContent value="vitrine">

</TabsContent>
    </Tabs>



    </div>



    </div>
   </div>
    
     </main>
  );
}
