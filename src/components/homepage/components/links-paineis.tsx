import { Copy, Link2, SquareArrowOutUpRight} from "lucide-react";
import { Alert } from "../../ui/alert";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner"
import { Export } from "phosphor-react";

interface Props {
    title:string
    description:string
    link:string
}

export function LinksPaineis(props:Props) {
    return(
      
        <Alert className="flex flex-col justify-between hover:bg-neutral-100 transition-all dark:hover:bg-neutral-900">
            <div className="mb-16">
                <p className="font-medium text-lg" >{props.title}</p>
                <p className="text-gray-500 text-sm">{props.description}</p>
            </div>

            <div className="flex justify-between items-center">
            <Link to={props.link} target="_blank">
            <Button variant={'ghost'} size={'icon'}>
           <SquareArrowOutUpRight size={16}/>
           </Button>
           </Link>

            <Button
              onClick={() => {
                navigator.clipboard.writeText(props.link)
                toast("Operação realizada", {
                  description: "Link copiado para área de transferência",
                  action: {
                    label: "Fechar",
                    onClick: () => console.log("Undo"),
                  },
                })
               }}
            variant={'ghost'} size={'icon'}><Copy size={16}/></Button>
            </div>
        </Alert>
   
    )
}