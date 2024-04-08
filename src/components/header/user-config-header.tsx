import { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { UserContext } from "../../context/context";
import { UserCircle } from "phosphor-react";

export function UserConfigHeader() {
    const { user } = useContext(UserContext);
   
    return(
        <div>
            <Avatar>
                <AvatarImage src={(user.photoURL == null ? (user.img_url):(user.photoURL))} />
                <AvatarFallback className="flex items-center justify-center"><UserCircle size={16} className="" /></AvatarFallback>
              </Avatar>
        </div>
    )
}