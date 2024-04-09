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

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs"

import { User as FirebaseAuthUser} from 'firebase/auth'
import { UserContext } from "../../context/context";
interface User extends FirebaseAuthUser {
    state: string;
    name: string
    email: string
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
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const {setLoggedIn} = useContext(UserContext);
      const history = useNavigate();
      const { setUser } = useContext(UserContext);

      const handleLogin = async () => {
        try {
         if(email.length != 0 && password.length != 0 && password.length >= 8 ) {
          const result = await signInWithEmailAndPassword(auth, email, password);
          setLoggedIn(true);
      
          // Save user information to local storage
          localStorage.setItem('user', JSON.stringify(result.user));
    
          const userData: User = {
            ...result.user,
            state: '',
            name: '',
            email: result.user.email || '',
          };
    
          setUser(userData);
      
          setTimeout(() => {
            history('/dashboard');
          }, 0);
         }
        } catch (error) {
          console.error('Authentication error:', error);
        }
      };

      const [value, setValue] = useState('account')

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
              <Input id="name" defaultValue="Nome" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Email</Label>
              <Input id="username" defaultValue="Email" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="text-white dark:text-white" onClick={() => setValue('password')}>Continuar</Button>
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
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Confirmar senha</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="text-white dark:text-white">Criar conta</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
                
            </div>
        </div>
    )
}