import { useContext, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs"


import { UserContext } from "../../context/context";
import { User as FirebaseAuthUser} from 'firebase/auth'
import { GoogleLogo } from "phosphor-react";

interface User extends FirebaseAuthUser {
  img_url: string;
  state: string;
  name: string
  email: string
  institution_id: string
}



export function SignUpContent() {
    const backgroundImages = [
     'ewe'
      ];
    
      //background
      const [backgroundImage] = useState<string>(() => {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        return backgroundImages[randomIndex];
      });


      //firebase
      const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confPassword, setConfPassword] = useState('');
      const {setLoggedIn} = useContext(UserContext);
      const history = useNavigate();
      const { setUser } = useContext(UserContext);

      const [value, setValue] = useState('account')


      const [createUserWithEmailAndPassword, userw, loading, error] =
  useCreateUserWithEmailAndPassword(auth);

  const handleSignOut = async (e: any) => {
  try {

    if( password == confPassword && password.length >= 8 && email.length != 0 && name.length != 0) {
      e.preventDefault();
      createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        userCredential?.user && updateProfile(userCredential.user, { displayName: name });
     })



      setTimeout(() => {
        history('/signIn');
      }, 0);
    }
   
  } catch (error) {
   console.error('Authentication error:', error);
  }
  
}

function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const userData: User = {
          ...result.user,
          img_url: '', // Set to the appropriate default value or leave it empty if you don't have a default
          state: '',
          name: '',
          email: result.user.email || '',
          institution_id: '',
        };
  
        setUser(userData);
        console.log('userDataSignUp', userData)
        setLoggedIn(true);
        setTimeout(() => {
          history('/');
        }, 0);

        // Save user information to local storage
    localStorage.setItem('user', JSON.stringify(result.user));
      })
      .catch((error) => {
        console.log(error)
      })
  }

    return(
        <div className="w-full h-screen flex">
            <div className="w-1/2 h-full md:flex hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}></div>

            <div className="md:w-1/2 w-full h-full flex items-center justify-center flex-col">
            <Tabs defaultValue="account" value={value} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account" onClick={() => setValue('account')}>Criar conta</TabsTrigger>
        <TabsTrigger value="password" onClick={() => setValue('password')}>Criar senhar</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Criar conta</CardTitle>
            <CardDescription>
              Crie sua forma de acesso na plataforma. Clique em continuar quando terminar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input onChange={(e) => setName(e.target.value)} id="name" placeholder="Nome" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Email</Label>
              <Input onChange={(e) => setEmail(e.target.value)} id="username" placeholder="Email" />
            </div>
          </CardContent>
          <CardFooter>
          <div className="flex flex-col gap-4 w-full">
         <Button className=" w-full" variant={'outline'} onClick={handleGoogleSignIn} ><GoogleLogo size={16} className="" /> Fazer login com o Google</Button>
            <Button className="text-white dark:text-white w-full" onClick={() => setValue('password')}>Continuar</Button>
         </div>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Senha</CardTitle>
            <CardDescription>
              A senha deve ter no mínimo 8 caracteres
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Senha</Label>
              <Input onChange={(e) => setPassword(e.target.value)} id="current" type="password" placeholder="Senha" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Confirmar senha</Label>
              <Input  onChange={(e) => setConfPassword(e.target.value)} id="new" type="password" placeholder="Confirmar senha" />
            </div>
          </CardContent>
          <CardFooter>
          <Button onClick={handleSignOut} className="text-white dark:text-white w-full">Criar conta</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
                
            </div>
        </div>
    )
}