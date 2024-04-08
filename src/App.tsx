import { useEffect, useState } from 'react'
import { Home } from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import  { UserContext }  from '../src/context/context'

import {User as FirebaseAuthUser} from 'firebase/auth'
import { Dashboard } from './pages/Dashboard';
import DefaultLayout from './layout/default-layout';
import { Indicators } from './pages/Indicators';
import { Authentication } from './pages/SignIn';

interface User extends FirebaseAuthUser {
  state: string;
  name: string
  email: string
  img_url: string;
  institution_id: string
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState<User>({  state: '', email: '', name: '', img_url: '', institution_id: '',...{} } as User);

  const [urlGeral, setUrlGeral] = useState('http://200.128.66.226:8080/');
  const [urlGeralAdm, setUrlGeralAdm] = useState('http://200.128.66.226:5000/');

  const [searchType, setSearchType] = useState('');
  const [pesquisadoresSelecionadosGroupBarema, setPesquisadoresSelecionadosGroupBarema] = useState('');
  const [idGraduateProgram, setIdGraduateProgram] = useState('0');
  const [valoresSelecionadosExport, setValoresSelecionadosExport] = useState(``);
  const [valorDigitadoPesquisaDireta, setValorDigitadoPesquisaDireta] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      // Se as informações do usuário forem encontradas no armazenamento local, defina o usuário e marque como autenticado
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, []);

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
   <DefaultLayout>
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
      valorDigitadoPesquisaDireta, setValorDigitadoPesquisaDireta


    }}
    >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/maria' element={<Home/>}/>
        <Route path='/admin' element={<Dashboard/>}/>
        <Route path='/indicadores' element={<Indicators/>}/>
        <Route path='/taxonomia' element={<Indicators/>}/>
        <Route path='/indicadores-pos-graduacao' element={<Indicators/>}/>
        <Route path='/signIn' element={<Authentication/>}/>
        <Route path='/signUp' element={<Authentication/>}/>
      
        

        <Route
                  path='/dashboard'
                  element={loggedIn  ? <Dashboard/> : <Navigate to='/admin' />}
                />
      </Routes>
    </UserContext.Provider>
   </DefaultLayout>
    </Router>
 
    </>
  )
}

export default App
