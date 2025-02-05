import { Link, Plus, Upload } from "lucide-react";
import { Alert } from "../../../ui/alert";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover";
import { Base } from "../base";
import { Keepo } from "../builder-page";
import { EmojiPicker } from "../emoji-picker";

interface Props {
    keepoData:Keepo
    setKeepoData: React.Dispatch<React.SetStateAction<Keepo>>;
    moveItem: (index: number, direction: "up" | "down") => void;
    deleteItem: (index: number) => void;
    index:number
    contentItem:any
}

export function FileSection (props:Props) {
    return(
        <Base setKeepoData={props.setKeepoData} moveItem={props.moveItem} deleteItem={props.deleteItem} index={props.index} keepoData={props.keepoData}>
             <div className="w-full">
                      <Alert className="flex gap-2 items-center p-4  w-full">
                      <EmojiPicker
                  onSelect={(emoji) => {
                    const newContent = [...props.keepoData.content]; // Cria uma cópia do array
                    newContent[props.index] = { ...newContent[props.index], emoji: emoji }; // Atualiza apenas o item específico

                    props.setKeepoData((prev) => ({
                      ...prev,
                      content: newContent, // Atualiza o array no estado
                    }));
                  }}
                />

                     
                      <Input
                       value={props.contentItem.title}
                       onChange={(e) => {
                        const newContent = [...props.keepoData.content]; // Cria uma cópia do array
                        newContent[props.index] = { ...newContent[props.index], title: e.target.value }; // Atualiza apenas o item específico
              
                        props.setKeepoData((prev) => ({
                          ...prev,
                          content: newContent, // Atualiza o array no estado
                        }));
                      }}
                      className="text-gray-500  rounded-none text-sm w-full bg-transparent border-0 p-0 dark:border-0 dark:bg-transparent h-8" placeholder="Digite o título aqui"/>

<Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 "
                    
                    >
                      <Upload size={16} />
                    </Button>

                      </Alert>
                     </div>
        </Base>
    )
}