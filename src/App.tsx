import { useEffect, useState } from 'react'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import  { UserContext }  from '../src/context/context'

import {User as FirebaseAuthUser} from 'firebase/auth'
import { Dashboard } from './pages/Dashboard';
import DefaultLayout from './layout/default-layout';
import { Indicators } from './pages/Indicators';
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
import { News } from './pages/News';
import { Baremas } from './pages/Baremas';
import { PosGraduation } from './pages/PosGraduation';
import { Resultados } from './pages/Resultados';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState<User>({  state: '', email: '', name: '', img_url: '', institution_id: '',...{} } as User);


  const [urlGeral, setUrlGeral] = useState('https://simcc.uesc.br:5002/');
  const [urlGeralAdm, setUrlGeralAdm] = useState('https://simcc.uesc.br:5000/');
  const [mapModal, setMapModal] = useState(false)

  const [searchType, setSearchType] = useState('');
  const [pesquisadoresSelecionadosGroupBarema, setPesquisadoresSelecionadosGroupBarema] = useState('');
  const [idGraduateProgram, setIdGraduateProgram] = useState('0');
  const [valoresSelecionadosExport, setValoresSelecionadosExport] = useState(``);
  const [valorDigitadoPesquisaDireta, setValorDigitadoPesquisaDireta] = useState('');
  const [inputMaria, setInputMaria] = useState('');
  const [maria, setMaria] = useState(false);
  const [itemsSelecionados , setItensSelecionados] = useState<ItemsSelecionados[]>([])
  const [sugestoes , setSugestoes] = useState<ItemsSelecionados[]>([])
  const [pesquisadoresSelecionados , setPesquisadoresSelecionados] = useState<PesquisadoresSelecionados[]>([])
  const [messagesMaria, setMessagesMaria] = useState<any[]>([]);
const [idDocumentBarema, setIdDocumentBarema] = useState('')

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
      idDocumentBarema, setIdDocumentBarema

    }}
    >
      <DefaultLayout>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/resultados/:searchId?/:searchTypeId?' element={<Resultados/>}/>

        <Route path='/pos-graduacao/:graduationId?' element={<PosGraduation/>}/>
       
       
        <Route path='/indicadores' element={<Indicators/>}/>
        <Route path='/novas-publicacoes' element={<News/>}/>
        <Route path='/taxonomia' element={<Indicators/>}/>

        <Route path='/indicadores-pos-graduacao' element={<Indicators/>}/>
        
        <Route
        path='/signIn'
        element={loggedIn == false ? <Authentication/> : <Navigate to='/' />}
        />

        <Route
         path='/signUp'
         element={loggedIn == false ? <Authentication/> : <Navigate to='/' />}
        />
      
      <Route
         path='/barema/:baremaId?'
         element={loggedIn == false ? <Authentication/> : <Baremas/>}
        />

        <Route
         path='/procurar-barema/:baremaId?'
         element={loggedIn == false ? <Authentication/> : <Baremas/>}
        />

        <Route
         path='/meus-baremas'
         element={loggedIn == false ? <Authentication/> : <Baremas/>}
        />

        <Route
          path='/admin'
          element={(user.state == 'admin' || user.state == 'colaborator' || user.state == 'master')  ? <Dashboard/> : <Navigate to='/' />}
        />

<Route
          path='/config'
          element={(user.state == 'master')  ? <Dashboard/> : <Navigate to='/' />}
        />
      </Routes>
      </DefaultLayout>
    </UserContext.Provider>
   
   </CookiesProvider>
    </Router>
 
    </>
  )
}

export default App
