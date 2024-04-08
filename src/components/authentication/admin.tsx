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

import { User as FirebaseAuthUser} from 'firebase/auth'
import { UserContext } from "../../context/context";
interface User extends FirebaseAuthUser {
    state: string;
    name: string
    email: string
  }



export function Admin() {
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

    return(
        <div className="w-full h-screen flex">
            <div className="w-1/2 h-full md:flex hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}></div>

            <div className="md:w-1/2 w-full h-full flex items-center justify-center flex-col">
            <Card className="md:w-[350px] w-full">
                <CardHeader>
                    <CardTitle>Olá, Marcos ; )</CardTitle>
                    <CardDescription>Página do administrador</CardDescription>
                </CardHeader>
      
                <CardContent>
                    <form action="">
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Email</Label>
                            <Input onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Seu email" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Senha</Label>
                            <Input onChange={(e) => setPassword(e.target.value)} id="senha" placeholder="Sua senha" />
                            </div>
                        </div>
                    </form>
                </CardContent>

                <CardFooter className="flex ">
                    
                    <Button className="w-full" onClick={handleLogin}>Entrar</Button>
                </CardFooter>
        </Card>
                
            </div>
        </div>
    )
}