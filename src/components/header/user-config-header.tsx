import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { UserContext } from "../../context/context";
import { UserCircle } from "phosphor-react";

import { auth } from "../../lib/firebase";
import { User as FirebaseAuthUser} from 'firebase/auth'


interface User extends FirebaseAuthUser {
    img_url: string;
    state: string;
    name: string
    email: string
    institution_id: string
  }

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut
  } from "../../components/ui/dropdown-menu"
import { LogOut } from "lucide-react";
  
  

export function UserConfigHeader() {
    const { user, setLoggedIn, setUser } = useContext(UserContext);

   
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setLoggedIn(false);
      setUser({ img_url: '', state: '', name: '', email: '', institution_id: '',...{} } as User); // Assuming you have a setUser function to update the user context

     // Remove user information from local storage
    localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
   
    return(
    
            <DropdownMenu>
                <DropdownMenuTrigger >
                <Avatar className="cursor-pointer">
                    <AvatarImage src={`${user.photoURL != null ? (user.photoURL):(user.img_url)}`} />
                    <AvatarFallback className="flex items-center justify-center"></AvatarFallback>
                </Avatar>
                     </DropdownMenuTrigger>
              
                <DropdownMenuContent className="w-56">
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut size={16} className="mr-2 h-4 w-4" />
                        <span>Encerrar sessão</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

     
    )
}