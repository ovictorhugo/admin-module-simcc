import { createContext } from "react";

interface User {
  institution_id: string
  user_id: string
  display_name: string
  email: string
  uid: string
  photo_url: string
  dep_id: string
  roles: Roles[]
  linkedin: string
  lattes_id: string
  shib_id: string
  graduate_program: GraduateProgram[]
  researcger_name: string
  departaments: Departaments[]
  provider: string
}

interface Departaments {
  dep_nom: string
  dep_id: string
}

interface GraduateProgram {
  graduate_program_id: string
  name: string
}

interface Roles {
  id: string
  role_id: string
}

interface ItemsSelecionados {
  term: string
}

interface PesquisadoresSelecionados {
  id: string,
  id_criterio: number,
  name: string,
  university: string,
  lattes_id: string,
  city: string,
  area: string,
  graduation: string,
}

interface Permission {
  permission: string
  id: string
}


interface UserContextType {
  test: boolean;
  setTest: React.Dispatch<React.SetStateAction<boolean>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  navbar: boolean;
  mapModal: boolean;
  setMapModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  maria: boolean;
  setMaria: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;


  valoresSelecionadosExport: string;
  setValoresSelecionadosExport: React.Dispatch<React.SetStateAction<string>>;
  idDocumentBarema: string;
  setIdDocumentBarema: React.Dispatch<React.SetStateAction<string>>;

  messagesMaria: any[], // Aqui você define messagesMaria como um array de qualquer tipo
  setMessagesMaria: React.Dispatch<React.SetStateAction<any[]>>, // Aqui você define setMessagesMaria como uma função que atualiza um array de qualquer tipo  

  itemsSelecionados: ItemsSelecionados[],
  setItensSelecionados: React.Dispatch<React.SetStateAction<ItemsSelecionados[]>>,

  itemsSelecionadosPopUp: ItemsSelecionados[],
  setItensSelecionadosPopUp: React.Dispatch<React.SetStateAction<ItemsSelecionados[]>>,

  sugestoes: ItemsSelecionados[],
  setSugestoes: React.Dispatch<React.SetStateAction<ItemsSelecionados[]>>,

  pesquisadoresSelecionados: PesquisadoresSelecionados[],
  setPesquisadoresSelecionados: React.Dispatch<React.SetStateAction<PesquisadoresSelecionados[]>>,

  valorDigitadoPesquisaDireta: string,
  setValorDigitadoPesquisaDireta: React.Dispatch<React.SetStateAction<string>>;

  inputMaria: string,
  setInputMaria: React.Dispatch<React.SetStateAction<string>>;

  urlGeral: string,
  setUrlGeral: React.Dispatch<React.SetStateAction<string>>;

  urlGeralAdm: string,
  setUrlGeralAdm: React.Dispatch<React.SetStateAction<string>>;

  pesquisadoresSelecionadosGroupBarema: string,
  setPesquisadoresSelecionadosGroupBarema: React.Dispatch<React.SetStateAction<string>>;

  idGraduateProgram: string,
  setIdGraduateProgram: React.Dispatch<React.SetStateAction<string>>;

  searchType: string,
  setSearchType: React.Dispatch<React.SetStateAction<string>>;

  isCollapsed: boolean,
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;

  isCollapsedRight: boolean,
  setIsCollapsedRight: React.Dispatch<React.SetStateAction<boolean>>;

  version: boolean,
  setVersion: React.Dispatch<React.SetStateAction<boolean>>;

  simcc: boolean,
  setSimcc: React.Dispatch<React.SetStateAction<boolean>>;

  mode: string,
  setMode: React.Dispatch<React.SetStateAction<string>>;


  role: string,
  setRole: React.Dispatch<React.SetStateAction<string>>;

  permission: Permission[],
  setPermission: React.Dispatch<React.SetStateAction<Permission[]>>,


  navCollapsedSize: number,
  setNavCollapsedSize: React.Dispatch<React.SetStateAction<number>>;

  defaultLayout: number[];
  setDefaultLayout: React.Dispatch<React.SetStateAction<number[]>>;

}

export const UserContext = createContext<UserContextType>({
  loggedIn: false,
  setLoggedIn: () => { },
  test: false,
  setTest: () => { },
  mapModal: false,
  setMapModal: () => { },
  navbar: false,
  setNavbar: () => { },
  maria: false,
  setMaria: () => { },
  user: {} as User,
  setUser: () => { },

  valoresSelecionadosExport: "",
  setValoresSelecionadosExport: () => { },


  itemsSelecionados: [],
  setItensSelecionados: () => { },

  itemsSelecionadosPopUp: [],
  setItensSelecionadosPopUp: () => { },


  role: "",
  setRole: () => { },

  permission: [],
  setPermission: () => { },


  sugestoes: [],
  setSugestoes: () => { },

  pesquisadoresSelecionados: [],
  setPesquisadoresSelecionados: () => { },

  messagesMaria: [],
  setMessagesMaria: () => { },

  valorDigitadoPesquisaDireta: "",
  setValorDigitadoPesquisaDireta: () => { },

  idDocumentBarema: "",
  setIdDocumentBarema: () => { },

  inputMaria: "",
  setInputMaria: () => { },


  urlGeral: "",
  setUrlGeral: () => { },

  urlGeralAdm: "",
  setUrlGeralAdm: () => { },


  pesquisadoresSelecionadosGroupBarema: "",
  setPesquisadoresSelecionadosGroupBarema: () => { },

  searchType: "",
  setSearchType: () => { },

  navCollapsedSize: 0,
  setNavCollapsedSize: () => { },

  isCollapsed: false,
  setIsCollapsed: () => { },

  isCollapsedRight: false,
  setIsCollapsedRight: () => { },

  version: false,
  setVersion: () => { },

  simcc: false,
  setSimcc: () => { },


  defaultLayout: [],
  setDefaultLayout: () => { },

  mode: "",
  setMode: () => { },

  idGraduateProgram: "",
  setIdGraduateProgram: () => { },

});
