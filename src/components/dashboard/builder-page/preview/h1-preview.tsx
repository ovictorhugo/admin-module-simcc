import { Input } from "../../../ui/input";
import { Base } from "../base";
import { Keepo } from "../builder-page";

interface Props {
    keepoData:Keepo
    setKeepoData: React.Dispatch<React.SetStateAction<Keepo>>;
    moveItem: (index: number, direction: "up" | "down") => void;
    deleteItem: (index: number) => void;
    index:number
    contentItem:any
}

export function H1Preview (props:Props) {
    return(
        <Base setKeepoData={props.setKeepoData} moveItem={props.moveItem} deleteItem={props.deleteItem} index={props.index} keepoData={props.keepoData}>
            <h1 className="font-semibold rounded-none text-3xl">{props.contentItem.title}</h1> 
        </Base>
    )
}