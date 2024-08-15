import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "../ui/card"
import { Button } from "../ui/button";
import { signInWithEmailAndPassword} from 'firebase/auth';
import "firebase/auth";
import { auth } from "../../lib/firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img1 from '../../assets/bg_home.png'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs"
import { toast } from "sonner"

import { User as FirebaseAuthUser} from 'firebase/auth'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { UserContext } from "../../context/context";
interface User extends FirebaseAuthUser {
    state: string;
    name: string
    email: string
    img_url: string;
    institution_id: string
  }


  import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { GoogleLogo, SignIn } from "phosphor-react";
import { CookiesProvider, useCookies } from 'react-cookie'
import { LogoConecteeWhite } from "../svg/LogoConecteeWhite";

export function SignInContent() {
  const [cookies, setCookie] = useCookies(['user'])

    const backgroundImages = [
     'ewe'
      ];
    
      //background
      const [backgroundImage] = useState<string>(() => {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        return backgroundImages[randomIndex];
      });


      //firebase
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const {setLoggedIn} = useContext(UserContext);
      const history = useNavigate();
      const { setUser, user } = useContext(UserContext);

      const handleLogin = async () => {
        try {
         if(email.length != 0 && password.length != 0 && password.length >= 8 ) {
          const result = await signInWithEmailAndPassword(auth, email, password);
          setLoggedIn(true);
      
         

           // Recupere dados personalizados do usuário no Firestore
            const db = getFirestore();
            const userDocRef = doc(db, 'institution', String(result.user.email));
            const snapshot = await getDoc(userDocRef);
            

            // Verifique se os dados personalizados existem antes de adicionar ao objeto result.user
            if (snapshot.exists()) {
              
             
              const userData = snapshot.data();

              const userDataFinal: User = {
                ...result.user,
                img_url: userData.img_url || '', // Set to the appropriate default value or leave it empty if you don't have a default
                state: userData.state || '',
                name: userData.name || '',
                email: result.user.email || '',
                institution_id: userData.institution_id || '',
              };
             
              // Adicione os dados personalizados diretamente ao objeto result.user

              // Atualize o estado com o objeto modificado
              setUser(userDataFinal)
              localStorage.setItem('user', JSON.stringify(userDataFinal));
              setCookie('user', (userDataFinal), { path: '/' })
            }

             // Save user information to local storage
          
    
      
          setTimeout(() => {
            if(user.state =='admin') {
              history('/admin');
            } else {
              history('/');
            }
          }, 0);
         }
        } catch (error) {
          console.error('Authentication error:', error);
          toast("Erro ao fazer login", {
            description: "Revise os dados e tente novamente",
            action: {
              label: "Fechar",
              onClick: () => console.log("Undo"),
            },
          })
        }
      };

      function handleGoogleSignIn() {
        const provider = new GoogleAuthProvider();
    
        signInWithPopup(auth, provider)
          .then(async(result) => {
            
            const db = getFirestore();
            const userDocRef = doc(db, 'institution', String(result.user.email));
            const snapshot = await getDoc(userDocRef);
            const userData: User = {
              ...result.user,
              img_url: '', // Set to the appropriate default value or leave it empty if you don't have a default
              state: '',
              name:  '',
              email: result.user.email || '',
              institution_id: '',
            };

            // Verifique se os dados personalizados existem antes de adicionar ao objeto result.user
            if (snapshot.exists()) {
              
             
              const userData = snapshot.data();

              const userDataFinal: User = {
                ...result.user,
                img_url: userData.img_url || '', // Set to the appropriate default value or leave it empty if you don't have a default
                state: userData.state || '',
                name: userData.name || '',
                email: result.user.email || '',
                institution_id: userData.institution_id || '',
              };
             
              // Adicione os dados personalizados diretamente ao objeto result.user

              // Atualize o estado com o objeto modificado
              setUser(userDataFinal)
              localStorage.setItem('user', JSON.stringify(userDataFinal));
              setCookie('user', (userDataFinal), { path: '/' })
      
            setUser(userDataFinal);
            setLoggedIn(true);
            setTimeout(() => {
              history('/');
            }, 0);
          } else {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            setCookie('user', (userData), { path: '/' })
            setLoggedIn(true);
            setTimeout(() => {
              history('/');
            }, 0);
          }

          
           
          })
          .catch((error) => {
            console.log(error)
            toast("Erro ao fazer login", {
              description: "Revise os dados e tente novamente",
              action: {
                label: "Fechar",
                onClick: () => console.log("Undo"),
              },
            })
          })
      }
      const location = useLocation();

      const [value, setValue] = useState('account')

      //frases

      const quotesWithAuthors = [
        {
          quote: 'O Programa Sempre UFMG tem o objetivo de promover a conexão entre a Universidade e seus egressos, incentivando a cultura do retorno e da retribuição à Universidade.',
          author: 'Alfredo Tetse'
        },
        {
          quote: 'A Universidade é um espaço de transformação e oportunidades.',
          author: 'Maria Silva'
        },
        {
          quote: 'Alunos e egressos são fundamentais para a continuidade do legado da UFMG.',
          author: 'João Pereira'
        },
        {
          quote: 'O conhecimento adquirido aqui é um patrimônio a ser partilhado.',
          author: 'Ana Costa'
        }
      ];
      
        // Estado para a frase e autor atuais
        const [currentQuote, setCurrentQuote] = useState({ quote: '', author: '' });
      
        // Função para selecionar uma frase aleatória
        const getRandomQuote = () => {
          const randomIndex = Math.floor(Math.random() * quotesWithAuthors.length);
          return quotesWithAuthors[randomIndex];
        };
      
        // Efeito para definir uma nova frase quando o componente é montado
        useEffect(() => {
          setCurrentQuote(getRandomQuote());
        }, []);

    return(
        <div className="w-full h-screen flex">
            <div className="w-1/2 h-full p-16 md:flex justify-between flex-col hidden bg-cover bg-center bg-no-repeat bg-[#719CB8]" style={{ backgroundImage: `url(${img1})` }}>
           <Link to={'/'} className="w-fit">
           <div className="h-[28px]"><LogoConecteeWhite/></div></Link>
            <div>
             <div>
             <p className="font-medium text-white max-w-[500px]">
        "{currentQuote.quote}"
      </p>
      <p className="text-white mt-2 text-sm">{currentQuote.author}</p>
             </div>
            </div>
            </div>

            <div className="md:w-1/2 w-full h-full flex md:px-16 items-center justify-center flex-col">
           

    <div className="max-w-[400px] w-full">
    <CardHeader className="p-0 pb-6">
            <CardTitle>Fazer login</CardTitle>
            <CardDescription className="pt-2">
              Para docentes e técnicos, acessar com o Minha UFMG. Usuários externos, fazer login com o google ou email cadastrado.
            </CardDescription>
          </CardHeader>

    <div className="flex gap-3 flex-col">
    <Link to={"/dashboard"}><Button className=" w-full" variant={'outline'} ><GoogleLogo size={16} className="" /> Login com Minha UFMG</Button></Link>
        <Button className=" w-full" variant={'outline'} onClick={handleGoogleSignIn} ><GoogleLogo size={16} className="" /> Login com Google</Button>
       
        </div>

    <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-800 my-6">
          <div className="w-full h-[0.5px] bg-neutral-400 dark:bg-neutral-800"></div>
          ou
          <div className="w-full h-[0.5px]  bg-neutral-500 dark:bg-neutral-800"></div>
        </div>

    
          <CardContent className=" p-0 w-full flex flex-col gap-3">
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input onChange={(e) => setEmail(e.target.value)} id="name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">Senha</Label>
              <Input onChange={(e) => setPassword(e.target.value)} id="current" type="password"  />
            </div>

            <Button onClick={handleLogin} className="text-white w-full dark:text-white"><SignIn size={16}/> Fazer login</Button>
          </CardContent>
    </div>
                
            </div>
        </div>
    )
}