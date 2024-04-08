import { createContext } from "react";
import { User as FirebaseAuthUser } from 'firebase/auth';

interface User extends FirebaseAuthUser {
  state: string;
  name: string;
  email: string;
  img_url: string;
  institution_id: string
}

interface UserContextType {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  navbar: boolean;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  login: (user: User) => void; // Função de login
  logout: () => void; // Função de logout

  valoresSelecionadosExport: string;
  setValoresSelecionadosExport: React.Dispatch<React.SetStateAction<string>>;

  valorDigitadoPesquisaDireta: string,
  setValorDigitadoPesquisaDireta: React.Dispatch<React.SetStateAction<string>>;

  urlGeral: string,
  setUrlGeral: React.Dispatch<React.SetStateAction<string>>;

  urlGeralAdm: string,
  setUrlGeralAdm: React.Dispatch<React.SetStateAction<string>>;
 
  pesquisadoresSelecionadosGroupBarema: string,
  setPesquisadoresSelecionadosGroupBarema: React.Dispatch<React.SetStateAction<string>>;

  idGraduateProgram: string,
  setIdGraduateProgram: React.Dispatch<React.SetStateAction<string>>;

  searchType:string,
  setSearchType:React.Dispatch<React.SetStateAction<string>>;

}

export const UserContext = createContext<UserContextType>({
  loggedIn: false,
  setLoggedIn: () => {},
  navbar: false, 
  setNavbar: () => {},
  user: {} as User,
  setUser: () => {},
  login: () => {}, // Definindo uma função vazia como padrão
  logout: () => {}, // Definindo uma função vazia como padrão

  valoresSelecionadosExport: "",
setValoresSelecionadosExport: () => {},

valorDigitadoPesquisaDireta: "",
setValorDigitadoPesquisaDireta: () => {},


urlGeral: "",
setUrlGeral: () => {},

urlGeralAdm: "",
setUrlGeralAdm: () => {},


pesquisadoresSelecionadosGroupBarema: "",
setPesquisadoresSelecionadosGroupBarema: () => {},

searchType:"",
  setSearchType:() => {},
 
  idGraduateProgram: "",
  setIdGraduateProgram: () => {},

});
