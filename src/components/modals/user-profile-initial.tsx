import { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { UserContext } from "../../context/context";
import { useModal } from "../hooks/use-modal-store";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import { ArrowUpCircle, Check, CheckCircle, ChevronLeft, ChevronRight, InfoIcon, Wrench } from "lucide-react";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { ChartBar, GearSix, Student } from "phosphor-react";
import { Input } from "../ui/input";
import { Search, BarChart, Users, BookOpen, FileText, GraduationCap, Globe, ClipboardCheck, FolderOpen, UserCheck, Briefcase, Layers, ListChecks } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";
import { Drawer, DrawerContent } from "../ui/drawer";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function UserProfileInitialModal() {
        const { onClose, isOpen, type: typeModal, data } = useModal();
          const [isModalOpen1, setIsModalOpen1] = useState(false);

            useEffect(() => {
              // Verifica no localStorage se o modal já foi exibido
              const hasVisited = localStorage.getItem('hasVisited');
          
              if (!hasVisited && (!isOpen)) {
                // Se não foi exibido, abre o modal
                setIsModalOpen1(true);
               
              }
            }, []);
          
        
        const isModalOpen = (isOpen && typeModal === "user-profile-initial") || isModalOpen1;
        const {urlGeralAdm, loggedIn, user} = useContext(UserContext)
 const isMobile = useIsMobile()
        const [nome, setNome] = useState(loggedIn ? (user?.display_name) : (''))
        const [email, setEmail] = useState(loggedIn ? (user?.email) : (''))

        const perfis = [
            {name:'Pesquisador', icon:Student},
            {name:'Gestor de Ciência e Tecnologia', icon:ChartBar},
            {name:'Coordenador Pós-Graduação', icon:GraduationCap},
            {name:'Administração', icon:GearSix},
        ]

     
        const resposta = [
          {
            name: 'Pesquisador',
            icon: <Student className="w-6 h-6 text-gray-400" />,
            items: [
              {
                icon: <Search className="w-6 h-6 text-gray-400" />,
                title: 'Realizar buscas de forma fácil',
                description: 'Busque por termos nas produções técnicas e científicas.',
                active: true,
              },
              {
                icon: <BarChart className="w-6 h-6 text-gray-400" />,
                title: 'Compreender indicadores de produção',
                description: 'Visualize indicadores de produção científica e técnica de maneira integrada.',
                active: false,
              },
              {
                icon: <Users className="w-6 h-6 text-gray-400" />,
                title: 'Promover colaborações',
                description: 'Identifique pesquisadores e grupos de pesquisa para promover colaborações eficazes.',
                active: false,
              },
              {
                icon: <BookOpen className="w-6 h-6 text-gray-400" />,
                title: 'Pesquisar produções científicas',
                description: 'Pesquise produções científicas com o objetivo de realizar revisões sistemáticas.',
                active: false,
              },
              {
                icon: <FileText className="w-6 h-6 text-gray-400" />,
                title: 'Acessar artigos científicos',
                description: 'Leia artigos científicos qualificados ou com fator de impacto.',
                active: false,
              },
              {
                icon: <GraduationCap className="w-6 h-6 text-gray-400" />,
                title: 'Explorar programas de pós-graduação',
                description: 'Considere indicadores docentes e produções para futura participação.',
                active: false,
              },
            ],
          },
          {
            name: 'Gestor de Ciência e Tecnologia',
            icon: <Student className="w-6 h-6 text-gray-400" />,
            items: [
              {
                icon: <FileText className="w-6 h-6 text-green-500" />,
                title: 'Acessar produções qualificadas',
                description: 'Publicize pesquisas relevantes e de impacto social.',
                active: true,
              },
              {
                icon: <BarChart className="w-6 h-6 text-gray-400" />,
                title: 'Monitorar indicadores científicos',
                description: 'Acompanhe indicadores de produção científica e técnica.',
                active: false,
              },
              {
                icon: <Globe className="w-6 h-6 text-gray-400" />,
                title: 'Identificar competências',
                description: 'Descubra as competências das instituições e dos pesquisadores.',
                active: false,
              },
              {
                icon: <Search className="w-6 h-6 text-gray-400" />,
                title: 'Localizar pesquisadores',
                description: 'Encontre pesquisadores e cidades onde estão sediados.',
                active: false,
              },
              {
                icon: <Users className="w-6 h-6 text-gray-400" />,
                title: 'Analisar grupos e projetos',
                description: 'Identifique grupos de pesquisa, bolsistas e projetos das instituições.',
                active: false,
              },
              {
                icon: <GraduationCap className="w-6 h-6 text-gray-400" />,
                title: 'Acompanhar pós-graduação',
                description: 'Planeje financiamentos e induções futuras com base nos programas de pós-graduação.',
                active: false,
              },
              {
                icon: <ClipboardCheck className="w-6 h-6 text-gray-400" />,
                title: 'Relatório semanal',
                description: 'Receba um relatório semanal com novas produções da instituição.',
                active: false,
              },
            ],
          },
          {
            name: 'Coordenador Pós-Graduação',
            icon: <Student className="w-6 h-6 text-gray-400" />,
            items: [
              {
                icon: <BarChart className="w-6 h-6 text-green-500" />,
                title: 'Planejamento estratégico',
                description: 'Analise os indicadores do programa para elaborar estratégias.',
                active: true,
              },
              {
                icon: <UserCheck className="w-6 h-6 text-gray-400" />,
                title: 'Atualizar currículos Lattes',
                description: 'Gerencie a atualização dos currículos Lattes do corpo docente.',
                active: false,
              },
              {
                icon: <Users className="w-6 h-6 text-gray-400" />,
                title: 'Identificar líderes',
                description: 'Saiba quais professores são bolsistas de produtividade e líderes de grupos de pesquisa.',
                active: false,
              },
              {
                icon: <FileText className="w-6 h-6 text-gray-400" />,
                title: 'Preencher Relatório Sucupira',
                description: 'Colete dados do programa para o Relatório Sucupira.',
                active: false,
              },
            ],
          },
          {
            name: 'Administração',
            icon: <Student className="w-6 h-6 text-gray-400" />,
            items: [
              {
                icon: <ListChecks className="w-6 h-6 text-green-500" />,
                title: 'Elaborar baremas de avaliação',
                description: 'Crie critérios para avaliar pesquisadores ',
                active: true,
              },
              {
                icon: <Briefcase className="w-6 h-6 text-gray-400" />,
                title: 'Gerenciar pesquisadores e programas',
                description: 'Administre pesquisadores e programas de pós-graduação dentro da plataforma.',
                active: false,
              },
              {
                icon: <Layers className="w-6 h-6 text-gray-400" />,
                title: 'Criar índices e estatísticas',
                description: 'Desenvolva seus próprios índices e estatísticas para análise.',
                active: false,
              },
            ],
          },
        ];
        
const [tab, setTab] = useState(1)

const [perfil, setPerfil] = useState('')
const [status, setStatus] = useState('')

console.log(perfil)


const content = () => {
    return(
<div className="flex flex-col gap-4">
    
    <Alert className="rounded-t-md rounded-b-none bg-gradient-to-r from-eng-dark-blue  to-eng-blue p-6 border-0 border-b">
                 <DialogTitle className="text-2xl font-medium max-w-[450px] text-white">
      Veja o que a plataforma pode oferecer
    </DialogTitle>
    <DialogDescription className="text-white">
      Conte um pouco sobre você 
    </DialogDescription>
    
                            </Alert>
    
                <DialogHeader className="p-4 pt-0 flex flex-col w-full">
                <Tabs defaultValue={String(tab)} value={String(tab)} className="">
      
      <TabsContent value="1" className="w-full">
      <div className="grid  items-center gap-5">

    
                        <Label>Qual o seu perfil?</Label>
                        <ToggleGroup
      onValueChange={(value) => {
        const perfilSelecionado = perfis.find((perfil) => perfil.name === value);
        if (perfilSelecionado) {
          setPerfil(perfilSelecionado.name);
        }
      }}
      type="single"
      variant='outline'
      value={perfil}
      className="grid grid-cols-4 w-full gap-3"
    >
      {perfis.map((props, index) => (
        <ToggleGroupItem className="flex flex-1 py-6 w-full h-full flex-col  items-center gap-2" key={index} value={props.name}>
          <props.icon size={32} /> 
          <div className="">
          {props.name}
          </div>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
    
    <div className="flex flex-col gap-2 w-full ">
                                          <Label>Qual uso se encaixa melhor para você?</Label>
                                          <Select value={status} onValueChange={setStatus}>
  <SelectTrigger className="">
    <SelectValue placeholder="" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="trabalho">Para trabalho</SelectItem>
    <SelectItem value="uso-pessoal">Para uso pessoal</SelectItem>
    <SelectItem value="escola">Para estudo</SelectItem>
  </SelectContent>
</Select>
                                        </div>
                      </div>
        </TabsContent>
      <TabsContent value="2">
        <div className="grid gap-6 grid-cols-3">
            <Alert>
              <div>
              <p className="font-medium">Starter</p>
                <h3 className="text-3xl font-light">Free</h3>
                <p className="text-sm text-gray-500">Just the backs</p>
    
    
                <div>
    
                </div>
              </div>
    
              <Button variant={'secondary'} className="w-full mt-16"></Button>
            </Alert>
    
            <Alert className="border-eng-blue bg-gradient-to-br from-eng-blue/30 to-transparent">
              <div className=" ">
              <p className="font-medium">Starter</p>
                <h3 className="text-3xl font-light">Free</h3>
                <p className="text-sm text-gray-500">Just the backs</p>
    
    
                <div>
                    
                </div>
              </div>
    
              <Button  className="w-full mt-16"></Button>
            </Alert>
    
            <Alert>
              <div>
              <p className="font-medium">Starter</p>
                <h3 className="text-3xl font-light">Free</h3>
                <p className="text-sm text-gray-500">Just the backs</p>
    
    
                <div>
                    
                </div>
              </div>
    
              <Button variant={'secondary'} className="w-full mt-16"></Button>
            </Alert>
        </div>
        </TabsContent>
    
        <TabsContent value="3">
        <div className="p-6 rounded-lg w-full flex justify-center md:px-32">
      <div className="relative w-full">
      {resposta.map((step, index) => (
      step.name === perfil && step.items?.map((props, subIndex) => ( // Verificando se step.name é igual a "perfil"
        <div key={`${index}-${subIndex}`} className="flex items-start space-x-4 relative">
          <div className="flex flex-col items-center">
            <div
              className={`border p-3 bg-neutral-100 rounded-lg ${
                props.active ? "border-green-500" : "border-gray-300"
              }`}
            >
              {props.icon}
            </div>       
            {subIndex < step.items.length - 1 && (
              <div className="border-l h-10 bg-gray-300 mx-auto"></div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-medium">{props.title}</h3>
            <p className="text-gray-500 text-sm">{props.description}</p>
          </div>
        </div>
      ))
    ))}
      </div>
    </div>
    
        </TabsContent>
    </Tabs>
                    </DialogHeader>
    
                    <DialogFooter className="flex w-full justify-between  gap-2 p-4 pt-0">
                  <div className="flex justify-between w-full">
                  <div className="flex gap-2 ">

<Link to={'/termos-uso'} target="_blank"> <Button variant={'ghost'}><InfoIcon size={16} /> Termos de uso</Button></Link>

</div>
<div className="flex gap-2 ">
{tab != 1 && (
<Button variant="ghost"  onClick={() => setTab(tab - 1)}>
<ChevronLeft size={16}/> Anterior
</Button>
)}

{tab == 3 ? (
<Button className="ml-auto flex" onClick={() => {
    if(isModalOpen1) {
        setIsModalOpen1(false)
    }
}}>
<Check size={16}/>   Finalizar
</Button>
):(
<Button className="ml-auto flex" onClick={() => setTab(tab + 1)}>
Próximo <ChevronRight size={16}/>
</Button>
)}
</div>
                  </div>
            </DialogFooter>
    </div>
    )
}
if (isMobile) {
    return (
      <Drawer open={isModalOpen} onOpenChange={onClose}>
        <DrawerContent className="p-0">{content()}</DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="p-0 min-w-[50vw] border">{content()}</DialogContent>
      </Dialog>
    );
  }

}