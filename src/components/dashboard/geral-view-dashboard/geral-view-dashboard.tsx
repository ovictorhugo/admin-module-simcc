


import { useModalSidebar } from "../../hooks/use-modal-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";

import { Button } from "../../ui/button";
import { ChevronLeft, Copy, GraduationCap, Plus, Trash, User, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "../../ui/alert";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

import { Input } from "../../ui/input";
import { toast } from "sonner"
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs, query, where } from 'firebase/firestore';

import { CargosFuncoes } from "../components/cargos-funcoes";
import { GraficoAnaliseUsuarios } from "../graficos/grafico-analise-usuarios";
import { Label } from "../../ui/label";
import { ArrowElbowDownRight, ChartBar, MagnifyingGlass, Student } from "phosphor-react";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { useModal } from "../../hooks/use-modal-store";
import { Instituicoes } from "./instituicoes";
import { Helmet } from "react-helmet";



interface TotalPatrimonios {
  count_gp: string,
  count_gpr: string,
  institution_id: string,
  count_r: string,
  count_d: string,
  count_gps: string,
  count_t: string
}

type Background = {
  id: string;
  imgURL: string;
  titulo: string
};

export function GeralViewDashboard() {

  const db = getFirestore();
  const { isOpen: isOpenSidebar } = useModalSidebar();

  console.log(isOpenSidebar)
  const { user, urlGeralAdm, permission } = useContext(UserContext);


  const has_editar_cargos_permissoes = permission.some(
    (perm) => perm.permission === 'editar_cargos_permissoes'
  );

  const has_editar_cargos_usuarios = permission.some(
    (perm) => perm.permission === 'editar_cargos_usuarios'
  );

  const has_editar_informacoes_usuarios = permission.some(
    (perm) => perm.permission === 'editar_informacoes_usuarios'
  );

  const has_editar_configuracoes_plataforma = permission.some(
    (perm) => perm.permission === 'editar_configuracoes_plataforma'
  );








  ////

  const [total, setTotal] = useState<TotalPatrimonios[]>([]);

  const urlPatrimonioInsert = `${urlGeralAdm}InstitutionRest/Query/Count?institution_id=`;

  console.log(urlPatrimonioInsert)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlPatrimonioInsert, {
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
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData()


  }, [urlPatrimonioInsert]);

  const history = useNavigate();

  const handleVoltar = () => {
    history(-1);
  }


  //submit apanhe


  const [directoryInput, setDirectoryInput] = useState("/");
  const [directory, setDirectory] = useState('');

  let urlDiretorio = `${urlGeralAdm}s/directory`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlDiretorio, {
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
          setDirectory(data)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData()


  }, []);


  const handleSubmitDiretorio = async () => {
    try {
      const response = await fetch(`${urlGeralAdm}s/save-directory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ directory }),
      });

      if (response.ok) {
        toast("Diretório alterado", {
          description: "Todos os arquivos necessários serão puxados dessa pasta",
          action: {
            label: "Fechar",
            onClick: () => console.log("Undo"),
          },
        })
      } else {
        toast("Erro ao alterar diretório", {
          description: "Todos os arquivos necessários serão puxados dessa pasta",
          action: {
            label: "Fechar",
            onClick: () => console.log("Undo"),
          },
        })
      }
    } catch (error) {
      console.error('Error saving directory:', error);
    }
  };


  const [tab, setTab] = useState('all')



  /// DITEORIO JSON

  const [directoryJson, setDirectoryJson] = useState("");

  // Carregar o valor do JSON ao inicializar o componente
  useEffect(() => {
    fetch('public/directory.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setDirectoryJson(data[0].directory);
      })
      .catch(error => {
        console.error('Erro ao carregar JSON:', error);
      });
  }, []);


  console.log(directoryJson)


  useEffect(() => {
    if (!has_editar_cargos_permissoes) {
      setTab('all')
    } else if (!has_editar_configuracoes_plataforma) {
      setTab('all')
    }
  }, [permission]);


  ///delatra bg
  const [background, setBackground] = useState<Background[]>([]);

  const deleteItem = async (id: string) => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }

    try {
      // Cria uma query para buscar o documento com o campo 'id' igual ao id fornecido
      const q = query(collection(db, 'background'), where('id', '==', id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (docSnapshot) => {
        // Referência do documento no Firestore
        const docRef = doc(db, 'background', docSnapshot.id);
        await deleteDoc(docRef);

        // Atualiza o estado para remover o item excluído
        setBackground(prevBackground => prevBackground.filter(item => item.id !== id));

        toast("Background deletado", {
          description: "Operação realizada com sucesso",
          action: {
            label: "Fechar",
            onClick: () => console.log("Undo"),
          },
        })
      });
    } catch (error) {
      console.error("Erro ao excluir documento: ", error);
    }
  };


  useEffect(() => {
    const fetchEmails = async () => {
      const querySnapshot = await getDocs(collection(db, 'background'));
      const emailsData = querySnapshot.docs.map(doc => ({
        id: doc.data().id,
        titulo: doc.data().titulo,
        imgURL: doc.data().imgURL

      }));


      setBackground(emailsData);

    };

    fetchEmails();
  }, []);

  const { onOpen } = useModal()

  const { version } = useContext(UserContext)

  return (
    <div className="w-full relative">
      <Helmet>
        <title>Módulo administrativo | {version ? ('Conectee') : ('Simcc')} </title>
        <meta name="description" content={`Módulo administrativo | ${version ? ('Conectee') : ('Simcc')}`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <main className="flex flex-1 flex-col gap-4  md:gap-8 ">
        <Tabs defaultValue={tab} value={tab} className="h-full" >
          <div className="w-full mb-8  gap-4">
            <div className="flex items-center gap-4 p-4 md:p-8 pb-0 md:pb-0">

              <Button onClick={handleVoltar} variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>

              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Módulo administrativo
              </h1>




              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <TabsList >

                  <TabsTrigger value="all" onClick={() => setTab('all')} className="text-zinc-600 dark:text-zinc-200">Visão geral</TabsTrigger>

                  <TabsTrigger value="cargos" disabled={!has_editar_cargos_permissoes && !has_editar_cargos_usuarios && !has_editar_informacoes_usuarios} onClick={() => setTab('cargos')} className="text-zinc-600 dark:text-zinc-200">Cargos e permissões</TabsTrigger>
                  <TabsTrigger value="inst" disabled={!has_editar_configuracoes_plataforma} onClick={() => setTab('inst')} className="text-zinc-600 dark:text-zinc-200">Instituições</TabsTrigger>
                  <TabsTrigger value="unread" disabled={!has_editar_configuracoes_plataforma} onClick={() => setTab('unread')} className="text-zinc-600 dark:text-zinc-200">Configurações</TabsTrigger>
                </TabsList>



              </div>
            </div>

          </div>

          <TabsContent value="inst" className=" ">
            <Instituicoes />
          </TabsContent>

          <TabsContent value="all" className=" ">
            <div className="p-4 md:p-8 pt-0 md:pt-0 h-auto flex flex-col gap-4 md:gap-8">
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Link to={"/dashboard/pesquisadores"}>
                  <Alert className="p-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total de docentes
                      </CardTitle>
                      <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{total.map((props) => props.count_r)}</div>
                      <p className="text-xs text-muted-foreground">
                        registrados
                      </p>
                    </CardContent>
                  </Alert>
                </Link>

                <Link to={'/dashboard/indicadores'}>
                  <Alert className="p-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total de Técnicos
                      </CardTitle>
                      <UserCog className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{total.map((props) => props.count_t)}</div>
                      <p className="text-xs text-muted-foreground">
                        registrados
                      </p>
                    </CardContent>
                  </Alert>
                </Link>

                <Alert className="p-0">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de discentes
                    </CardTitle>
                    <Student className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{total.map((props) => props.count_gps)}</div>
                    <p className="text-xs text-muted-foreground">
                      cadastrados
                    </p>
                  </CardContent>
                </Alert>

                <Link to={'/dashboard/programas'}>
                  <Alert className="p-0">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total de pós-graduação
                      </CardTitle>
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{total.map((props) => props.count_gp)}</div>
                      <p className="text-xs text-muted-foreground">
                        cadastrados
                      </p>
                    </CardContent>
                  </Alert></Link>
              </div>


              <div className="flex flex-col md:grid gap-4 h-full md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Alert className="xl:col-span-2 p-0" x-chunk="dashboard-01-chunk-4" >
                  <CardHeader className="flex gap-6 flex-col flex-wrap md:flex-row  justify-between">
                    <div className="grid gap-2 ">
                      <CardTitle>Todos os backgrounds</CardTitle>
                      <CardDescription>
                        Fundos e campanhas exibidos na plataforma
                      </CardDescription>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={() => onOpen('add-background')}><Plus size={16} />Adicionar background</Button>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-3 p-8 pt-0">

                    <ScrollArea className="flex flex-col gap-3 h-[250px]">
                      <div className="flex flex-col gap-3">
                        {background.map((props) => {
                          return (
                            <Alert className="flex justify-between group border-0 p-0 h-10 items-center">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-md whitespace-nowrap bg-cover bg-center bg-no-repeat " style={{ backgroundImage: `url(${props.imgURL})` }} />
                                <p className="max-w-[150px] truncate text-sm text-gray-500">{props.titulo}</p>
                              </div>

                              <Button onClick={() => deleteItem(props.id)} variant={'destructive'} size={'icon'} className="h-8 w-8 hidden transition-all group-hover:flex"><Trash size={13} /></Button>
                            </Alert>
                          )
                        })}
                      </div>
                      <ScrollBar />
                    </ScrollArea>
                  </CardContent>

                </Alert>

                <Alert className=" p-0" x-chunk="dashboard-01-chunk-4" >
                  <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                      <CardTitle>Acesso externo</CardTitle>
                      <CardDescription>
                        Recent transactions from your store.
                      </CardDescription>
                    </div>

                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Input />
                      <Button ><Copy size={16} />Copiar link</Button>
                    </div>

                    <div className="w-full my-4 h-[0.5px] border-neutral-200 border-b dark:border-neutral-800"></div>


                    <div>
                      <p className="font-medium text-sm my-4">Pessoas com acesso</p>

                    </div>
                  </CardContent>
                </Alert>

                <Alert className="xl:col-span-3 p-0" x-chunk="dashboard-01-chunk-4" >
                  <CardHeader className="flex gap-6 flex-col md:flex-row  justify-between">
                    <div className="grid gap-2 ">
                      <CardTitle>Usuários ativos por dia</CardTitle>
                      <CardDescription>
                        Dados do Google Analytics dos últimos 30 dias
                      </CardDescription>
                    </div>

                    <div className="flex gap-3">
                      <ChartBar size={16} />
                    </div>
                  </CardHeader>

                  <CardContent>
                    <GraficoAnaliseUsuarios />
                  </CardContent>

                </Alert>
              </div>
            </div>

          </TabsContent>

          <TabsContent value="cargos" className="h-auto flex flex-col gap-8">
            <CargosFuncoes />
          </TabsContent>

          <TabsContent value="unread" className="h-full flex flex-col gap-4 md:gap-8  ">
            <div className=" p-4 md:p-8 pt-0 md:pt-0 flex flex-col md:gap-8 gap-4" >

              <Alert className="p-0">
                <CardHeader>
                  <CardTitle>Diretório de arquivos</CardTitle>
                  <CardDescription>
                    O diretório dentro da plataforma, no qual os documentos e configurações estão
                    localizados.
                  </CardDescription>
                </CardHeader>
                <CardContent>

                  <div className="flex gap-3 items-end">
                    <div className="flex flex-col space-y-1.5 w-full flex-1">
                      <Label htmlFor="name">Caminho do diretório</Label>
                      <Input
                        disabled
                        placeholder="Diretório"
                        value={directoryJson}
                        onChange={(e) => setDirectoryJson(e.target.value)}
                      />
                    </div>
                  </div>

                </CardContent>
              </Alert>

              <Alert className="p-0 ">
                <CardHeader>
                  <CardTitle>Localizar arquivos na API</CardTitle>
                  <CardDescription>
                    O diretório dentro da plataforma, no qual os documentos e configurações estão
                    localizados.
                  </CardDescription>
                </CardHeader>
                <CardContent>

                  <div className="flex gap-3 items-end">
                    <div className="flex flex-col space-y-1.5 w-full flex-1">
                      <Label htmlFor="name">Caminho do diretório</Label>
                      <Input
                        placeholder="Diretório"
                        value={directoryInput}
                        onChange={(e) => setDirectoryInput(e.target.value)}
                      />
                    </div>

                    <Button onClick={() => handleSubmitDiretorio()}><MagnifyingGlass size={16} />Buscar arquivos</Button>
                  </div>

                  <div className="flex flex-col gap-1 mt-6">
                    {Array.from(String(directory).split(',')).map((props, index) => (
                      <p key={index} className="text-sm flex items-center gap-1"><ArrowElbowDownRight size={16} />{props}</p>
                    ))}

                  </div>

                </CardContent>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}