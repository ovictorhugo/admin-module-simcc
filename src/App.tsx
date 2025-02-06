import {  useEffect, useState } from 'react'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  { UserContext }  from '../src/context/context'


import { Dashboard } from './pages/Dashboard';
import DefaultLayout from './layout/default-layout';

import { Authentication } from './pages/Authentication';

interface User {
  institution_id: string
  user_id:string
  display_name:string
  email:string 
  uid:string
  photo_url:string
  dep_id:string
  roles:Roles[]
  linkedin:string
  lattes_id:string
  shib_id:string
  graduate_program:GraduateProgram[]
  researcger_name:string
  departaments:Departaments[]
  provider:string
}

interface GraduateProgram {
  graduate_program_id:string
  name:string
}

interface Departaments {
  dep_nom:string
  dep_id:string
}

interface Roles {
  id:string
  role_id:string
}

interface ItemsSelecionados {
  term:string
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

interface Permission {
  permission:string
  id:string
}

import { CookiesProvider} from 'react-cookie'
import LoadingWrapper from './components/loading';
import ProtectedRoute from './components/ProtectedRoute';
import { Unauthorized } from './components/errors/Unauthorized';
import { Error404 } from './components/errors/404';
import { TermosUso } from './pages/TermosUso';
import { AboutPage } from './pages/About';
import useWindowResize from './components/use-windows-resize';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState<User| null>(null);;


  const [urlGeral, setUrlGeral] = useState(import.meta.env.VITE_URL_GERAL || '');

  const [urlGeralAdm, setUrlGeralAdm] = useState(import.meta.env.VITE_URL_GERAL_ADM || '');

  const [mapModal, setMapModal] = useState(false)

  const [role, setRole] = useState('')
  const [permission , setPermission] = useState<Permission[]>([])


  const [version, setVersion] = useState(import.meta.env.VITE_VERSION == 'false' ? (false):(true))
  const [simcc, setSimcc] = useState(import.meta.env.VITE_SIMCC == 'false' ? (false):(true))
  const [test, setTest] = useState(import.meta.env.VITE_TEST_FUNCTIONS == 'false' ? (false):(true))
  const [searchType, setSearchType] = useState('article');
  const [pesquisadoresSelecionadosGroupBarema, setPesquisadoresSelecionadosGroupBarema] = useState('');
  const [idGraduateProgram, setIdGraduateProgram] = useState('0');
  const [valoresSelecionadosExport, setValoresSelecionadosExport] = useState(``);
  const [valorDigitadoPesquisaDireta, setValorDigitadoPesquisaDireta] = useState('');
  const [inputMaria, setInputMaria] = useState('');
  const [maria, setMaria] = useState(false);
  const [itemsSelecionados , setItensSelecionados] = useState<ItemsSelecionados[]>([])
  const [itemsSelecionadosPopUp , setItensSelecionadosPopUp] = useState<ItemsSelecionados[]>([])
  const [sugestoes , setSugestoes] = useState<ItemsSelecionados[]>([])
  const [pesquisadoresSelecionados , setPesquisadoresSelecionados] = useState<PesquisadoresSelecionados[]>([])
  const [messagesMaria, setMessagesMaria] = useState<any[]>([]);
const [idDocumentBarema, setIdDocumentBarema] = useState('')

const storedIsCollapsed = localStorage.getItem("isCollapsed");
const [isCollapsed, setIsCollapsed] = useState(
  storedIsCollapsed ? JSON.parse(storedIsCollapsed) : true
);

const storedIsCollapsedRight = localStorage.getItem("isCollapsedRight");
const [isCollapsedRight, setIsCollapsedRight] = useState(
  storedIsCollapsedRight ? JSON.parse(storedIsCollapsedRight) : true
);

const [navCollapsedSize, setNavCollapsedSize] = useState(0)
const [defaultLayout, setDefaultLayout] = useState([0,440,655])
const [mode, setMode] = useState('')

useEffect(() => {
  // Salva o estado de isCollapsed no localStorage sempre que ele mudar
  localStorage.setItem("isCollapsed", JSON.stringify(isCollapsed));
}, [isCollapsed]);

useEffect(() => {
  // Salva o estado de isCollapsed no localStorage sempre que ele mudar
  localStorage.setItem("isCollapsedRight", JSON.stringify(isCollapsedRight));
}, [isCollapsedRight]);

const toggleCollapse = () => {
  setIsCollapsed((prev) => !prev);
};

useEffect(() => {
 if(searchType == "") {
  setSearchType('article')
  
 }
}, [searchType]);

  useEffect(() => {
    const storedUser = localStorage.getItem('permission');

    if (storedUser) {
      // Se as informações do usuário forem encontradas no armazenamento local, defina o usuário e marque como autenticado
      setPermission(JSON.parse(storedUser));

    }
  }, []);

  console.log(user)

  useWindowResize(() => {
    console.log("A janela foi redimensionada!");
    // Atualize o layout aqui se necessário
  });


  /////PERMISSÃO
  const hasBaremaAvaliacao = permission.some(
    (perm) => perm.permission === 'criar_barema_avaliacao'
  );

  const hasNotificacoes = permission.some(
    (perm) => perm.permission === 'enviar_notificacoes'
  );

  const has_visualizar_pesquisadores = permission.some(
    (perm) => perm.permission === 'visualizar_pesquisadores'
  );

  const has_visualizar_todos_departamentos = permission.some(
    (perm) => perm.permission === 'visualizar_todos_departamentos'
  );

  const has_visualizar_gerencia_modulo_administrativo = permission.some(
    (perm) => perm.permission === 'visualizar_gerencia_modulo_administrativo'
  );

  const has_visualizar_todos_programas = permission.some(
    (perm) => perm.permission === 'visualizar_todos_programas'
  );

  const has_visualizar_grupos_pesquisa = permission.some(
    (perm) => perm.permission === 'visualizar_grupos_pesquisa'
  );

  const has_visualizar_inct = permission.some(
    (perm) => perm.permission === 'visualizar_inct'
  );

  const has_editar_pesos_avaliacao = permission.some(
    (perm) => perm.permission === 'editar_pesos_avaliacao'
  );

  const has_visualizar_indicadores_instituicao = permission.some(
    (perm) => perm.permission === 'visualizar_indicadores_instituicao'
  );

  const has_minhas_producoes = permission.some(
    (perm) => perm.permission === 'visualizar_minhas_producoes'
  );



 

  return (
    <>
    <Router>
   <CookiesProvider>
   
   <UserContext.Provider 
    value={{
      loggedIn, setLoggedIn,
      navbar, setNavbar,
      urlGeralAdm, setUrlGeralAdm,
      user, setUser,
      searchType, setSearchType,
      urlGeral, setUrlGeral,
      pesquisadoresSelecionadosGroupBarema, setPesquisadoresSelecionadosGroupBarema,
      idGraduateProgram, setIdGraduateProgram,
      valoresSelecionadosExport, setValoresSelecionadosExport,
      valorDigitadoPesquisaDireta, setValorDigitadoPesquisaDireta,
      inputMaria, setInputMaria,
      maria, setMaria,
      mapModal, setMapModal,
      messagesMaria, setMessagesMaria,
      itemsSelecionados , setItensSelecionados,
      sugestoes , setSugestoes,
      pesquisadoresSelecionados , setPesquisadoresSelecionados,
      idDocumentBarema, setIdDocumentBarema,
      itemsSelecionadosPopUp , setItensSelecionadosPopUp,
      isCollapsed, setIsCollapsed,
      mode, setMode,
      navCollapsedSize, setNavCollapsedSize,
      defaultLayout, setDefaultLayout,
      version, setVersion,
      role, setRole,
      permission , setPermission,
      simcc, setSimcc,
      isCollapsedRight, setIsCollapsedRight,
      test, setTest

    }}
    >
    
      <DefaultLayout>
        <LoadingWrapper>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/resultados' element={<Home/>}/>
        <Route path='/dicionario' element={<Home/>}/>
        <Route path='/pos-graduacao' element={<Home/>}/>
        <Route path='/grupos-pesquisa' element={<Home/>}/>
        <Route path='/informacoes' element={<Home/>}/>
        <Route path='/indicadores' element={<Home/>}/>
        <Route path='/producoes-recentes' element={<Home/>}/>
        <Route path='/departamentos' element={<Home/>}/>
        <Route path='/researcher' element={<Home/>}/>
        <Route path='/resultados-ia' element={<Home/>}/>
        <Route path='/paines-dados-externos' element={<Home/>}/>
        <Route path='/indice-pesquisador' element={<Home/>}/>
        <Route path='/relatar-problema' element={<Home/>}/>
        <Route path='/pesquisadores-selecionados' element={<Home/>}/>
        <Route path='/provimento-cargo' element={<Home/>}/>

        <Route path='/listagens' element={<Home/>}/>

       
        <Route path='/termos-uso' element={<TermosUso/>}/>
        <Route path='/sobre' element={<AboutPage/>}/>
        <Route
        path='/ufmg/'
        element={loggedIn == false ? <Authentication/> :  <Navigate to='/' />}
        />
        
        <Route
        path='/signIn'
        element={loggedIn == false ? <Authentication/> :  <Navigate to='/' />}
        />

        <Route
         path='/signUp'
         element={loggedIn == false ? <Authentication/> : <Navigate to='/' />}
        />

<Route
         path='/recoverPassword'
         element={loggedIn == false ? <Authentication/> : <Navigate to='/' />}
        />

<Route
         path='/updatePassword'
         element={loggedIn == false ? <Authentication/> : <Navigate to='/' />}
        />
      

<Route
    path='/dashboard/administrativo'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_gerencia_modulo_administrativo}
      />
    }
  />


<Route
    path='/dashboard'
    element={<Dashboard />}
  />

<Route
    path='/dashboard/parametros-pesquisa'
    element={<Dashboard />}
  />

<Route
    path='/dashboard/secao-pessoal'
    element={<Dashboard />}
  />

<Route
    path='/dashboard/construtor-pagina'
    element={<Dashboard />}
  />

<Route path='/dashboard/relatar-problema' element={<Dashboard />}/>
<Route path='/dashboard/pesquisadores-selecionados' element={<Dashboard />}/>


<Route
    path='/dashboard/programas'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_todos_programas}
      />
    }
  />

<Route
    path='/dashboard/departamentos'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_todos_departamentos}
      />
    }
  />

<Route
    path='/dashboard/pesquisadores'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_pesquisadores}
      />
    }
  />

<Route
    path='/dashboard/inct'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_inct}
      />
    }
  />


<Route
    path='/dashboard/pesos-avaliacao'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_editar_pesos_avaliacao}
      />
    }
  />


  <Route
    path='/dashboard/minhas-producoes'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_minhas_producoes}
      />
    }
  />


<Route
    path='/dashboard/grupos-pesquisa'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_grupos_pesquisa}
      />
    }
  />

<Route
    path='/dashboard/indicadores'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_indicadores_instituicao}
      />
    }
  />

  <Route
    path='/dashboard/baremas'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={hasBaremaAvaliacao}
      />
    }
  />

<Route
    path='/dashboard/enviar-notificacoes'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={hasNotificacoes}
      />
    }
  />


 {/*
        Este é um comentário de múltiplas linhas dentro do JSX.
        Pode ser usado para descrições mais longas.
      */}
<Route
    path='/minhaufmg/dashboard/administrativo'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_gerencia_modulo_administrativo}
      />
    }
  />


<Route
    path='/minhaufmg/dashboard'
    element={<Dashboard />}
  />


<Route
    path='/minhaufmg/dashboard/programas'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_todos_programas}
      />
    }
  />

<Route
    path='/minhaufmg/dashboard/departamentos'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_todos_departamentos}
      />
    }
  />

<Route
    path='/minhaufmg/dashboard/pesquisadores'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_pesquisadores}
      />
    }
  />

<Route
    path='/minhaufmg/dashboard/inct'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_inct}
      />
    }
  />


<Route
    path='/minhaufmg/dashboard/pesos-avaliacao'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_editar_pesos_avaliacao}
      />
    }
  />

<Route
    path='/minhaufmg/dashboard/grupos-pesquisa'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_grupos_pesquisa}
      />
    }
  />

<Route
    path='/minhaufmg/dashboard/indicadores'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={has_visualizar_indicadores_instituicao}
      />
    }
/>

  <Route
    path='/minhaufmg/dashboard/baremas'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={hasBaremaAvaliacao}
      />
    }
  />

<Route
    path='/minhaufmg/dashboard/enviar-notificacoes'
    element={
      <ProtectedRoute
        element={<Dashboard />}
        hasPermission={hasNotificacoes}
      />
    }
  />

<Route path='/minhaufmg/dashboard/informacoes' element={<Dashboard/> }/>


 {/*
        Este é um comentário de múltiplas linhas dentro do JSX.
        Pode ser usado para descrições mais longas.
      */}


<Route path='/dashboard/informacoes' element={<Dashboard/> }/>

<Route path='/unauthorized' element={<Unauthorized />} />

<Route path='*' element={<Error404 />} />
        
      </Routes>
      </LoadingWrapper>
      </DefaultLayout>

    </UserContext.Provider>
   
   </CookiesProvider>
    </Router>
 
    </>
  )
}

export default App