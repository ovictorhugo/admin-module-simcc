import { useEffect, useState } from 'react'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  { UserContext }  from '../src/context/context'

import {User as FirebaseAuthUser} from 'firebase/auth'
import { Dashboard } from './pages/Dashboard';
import DefaultLayout from './layout/default-layout';

import { Authentication } from './pages/Authentication';

interface User extends FirebaseAuthUser {
  state: string;
  name: string
  email: string
  img_url: string;
  institution_id: string
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



import { CookiesProvider} from 'react-cookie'
import LoadingWrapper from './components/loading';



function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState<User>({  state: '', email: '', name: '', img_url: '', institution_id: '',...{} } as User);


  const [urlGeral, setUrlGeral] = useState(import.meta.env.VITE_URL_GERAL);

  const [urlGeralAdm, setUrlGeralAdm] = useState(import.meta.env.VITE_URL_GERAL_ADM);

  const [mapModal, setMapModal] = useState(false)

  const [version, setVersion] = useState(false)

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

const [isCollapsed, setIsCollapsed] = useState(false)
const [navCollapsedSize, setNavCollapsedSize] = useState(0)
const [defaultLayout, setDefaultLayout] = useState([0,440,655])
const [mode, setMode] = useState('user')

useEffect(() => {
 if(searchType == "") {
  setSearchType('article')
  
 }
}, [searchType]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      // Se as informações do usuário forem encontradas no armazenamento local, defina o usuário e marque como autenticado
      setUser(JSON.parse(storedUser));
      console.log(user)
      setLoggedIn(true);
    }
  }, []);

  console.log(user)

  // Função para fazer login
  const login = (user: User) => {
    setUser(user);
    setLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(user)); // Armazenar informações do usuário no localStorage
  };


  // Função para fazer logout
  const logout = () => {
    setUser({ state: '', email: '', name: '' } as User);
    setLoggedIn(false);
    localStorage.removeItem('user'); // Remover informações do usuário do localStorage ao fazer logout
  };

 

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
      login, // Passar a função de login para o contexto do usuário
      logout, // Passar a função de logout para o contexto do usuário
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
      version, setVersion

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

        
        
        <Route
        path='/signIn'
        element={loggedIn == false ? <Authentication/> : <Navigate to='/' />}
        />

        <Route
         path='/signUp'
         element={loggedIn == false ? <Authentication/> : <Navigate to='/' />}
        />
      

      

<Route path='/dashboard' element={<Dashboard/> }/>
<Route path='/dashboard/programas' element={<Dashboard/> }/>
<Route path='/dashboard/departamentos' element={<Dashboard/> }/>
<Route path='/dashboard/pesquisadores' element={<Dashboard/> }/>
<Route path='/dashboard/pesos-avaliacao' element={<Dashboard/> }/>
<Route path='/dashboard/grupos-pesquisa' element={<Dashboard/> }/>
<Route path='/dashboard/indicadores' element={<Dashboard/> }/>
<Route path='/dashboard/baremas' element={<Dashboard/> }/>
<Route path='/dashboard/enviar-notificacoes' element={<Dashboard/> }/>
<Route path='/dashboard/informacoes' element={<Dashboard/> }/>
<Route path='/dashboard/minha-area' element={<Dashboard/> }/>


<Route
          path='/config'
          element={(user.state == 'master')  ? <Dashboard/> : <Navigate to='/' />}
        />
        
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
