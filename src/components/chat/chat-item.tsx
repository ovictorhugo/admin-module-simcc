import { useContext } from "react";
import { Alert } from "../ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserContext } from "../../context/context";

interface Props {
    sender: 'maria' | 'user'
    message:string
}

export function ChatItem(props:Props) {
    const {user} = useContext(UserContext)

    return(
        <Alert className="border-0 flex gap-4 p-6  dark:bg-neutral-800 bg-white ">
            {props.sender == 'maria' ? (
            <Avatar className="cursor-pointer rounded-md">
            <AvatarImage  className={'rounded-md'} src={``} />
            <AvatarFallback className="flex items-center justify-center"></AvatarFallback>
            </Avatar>
            ):(
            <Avatar className="cursor-pointer rounded-md">
            <AvatarImage  className={'rounded-md'} src={`${user.photoURL != null ? (user.photoURL):(user.img_url)}`} />
            <AvatarFallback className="flex items-center justify-center"></AvatarFallback>
            </Avatar>
            )}

            <p className="w-full text-xs">{props.message}</p>
        </Alert>
    )
}