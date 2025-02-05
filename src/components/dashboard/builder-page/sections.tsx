import { ChevronDown, ChevronUp, Link, Plus, Smile, Trash, Upload } from "lucide-react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { Keepo } from "./builder-page";
import { Input } from "../../ui/input";
import { DropdownMenuBuilder } from "./dropdown-menu";
import { Textarea } from "../../ui/textarea";
import { Alert } from "../../ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { EmojiPicker } from "./emoji-picker";
import { Social } from "./sections/social";
import { LinkSection } from "./sections/link";
import { FileSection } from "./sections/file";
import { H1Section } from "./sections/h1";
import { H2Section } from "./sections/h2";
import { H3Section, SeparatorSection } from "./sections/h3";

interface Props {
    keepoData:Keepo
    setKeepoData: React.Dispatch<React.SetStateAction<Keepo>>;
}

export function SectionBuilderPage(props:Props) {
  const moveItem = (index: number, direction: "up" | "down") => {
    props.setKeepoData((prev) => {
      const newContent = [...prev.content]; // Cria uma cópia do array
      const targetIndex = direction === "up" ? index - 1 : index + 1;
  
      // Garante que o índice alvo está dentro dos limites do array
      if (targetIndex < 0 || targetIndex >= newContent.length) return prev;
  
      // Realiza a troca dos elementos mantendo todas as propriedades
      [newContent[index], newContent[targetIndex]] = [newContent[targetIndex], newContent[index]];
  
      return { ...prev, content: newContent }; // Retorna o estado atualizado
    });
  };

  // Função para remover um item da lista
  const deleteItem = (index: number) => {
    props.setKeepoData((prev) => {
      const newContent = prev.content.filter((_, i) => i !== index);
      return { ...prev, content: newContent };
    });
  };

const sanitizeUrlVideo = (item): string => {
  let idVideo = ''
  if (item.url != null) {
    if (item.url.includes('v=')) {
      idVideo = item.url.split('v=')[1]
    }

    if (item.url.includes('.be/')) {
      idVideo = item.url.split('.be/')[1]
    }

    if (item.url.includes('embed/')) {
      idVideo = item.url.split('embed/')[1]
    }
  }

  return `https://www.youtube.com/embed/${idVideo}`
}

    return(
        <div className="flex flex-col gap-2 mb-2">
{props.keepoData.content.map((contentItem, index) => (
        <div key={index} className="">
          {(() => {
            switch (contentItem.type) {
              case "divider":
                return (
                  <SeparatorSection contentItem={contentItem} setKeepoData={props.setKeepoData} moveItem={moveItem} deleteItem={deleteItem} index={index} keepoData={props.keepoData}/>
                )
              case "h1":
                return (
                  <H1Section contentItem={contentItem} setKeepoData={props.setKeepoData} moveItem={moveItem} deleteItem={deleteItem} index={index} keepoData={props.keepoData}/>
                )
              case "h2":
                return (
                  <H2Section contentItem={contentItem} setKeepoData={props.setKeepoData} moveItem={moveItem} deleteItem={deleteItem} index={index} keepoData={props.keepoData}/>
                )
              
              case "h3":
                return (
                  <H3Section contentItem={contentItem} setKeepoData={props.setKeepoData} moveItem={moveItem} deleteItem={deleteItem} index={index} keepoData={props.keepoData}/>
                )
               
              case "text":
                return (
                  <div className="flex gap-2 group w-full">
                     
                     <div className="min-w-28 w-28 flex justify-end">
                  <div className="flex gap-2 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 group-hover:flex hidden"
                      onClick={() => moveItem(index, "up")}
                      disabled={index === 0} // Desativa o botão se for o primeiro item
                    >
                      <ChevronUp size={16} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 group-hover:flex hidden"
                      onClick={() => moveItem(index, "down")}
                      disabled={index === props.keepoData.content.length - 1} // Desativa se for o último
                    >
                      <ChevronDown size={16} />
                    </Button>

                    <DropdownMenuBuilder
                    setKeepoData={props.setKeepoData}
                    number={index}
                    />
                  </div>
                </div>
                  
                      <Textarea 
                      value={contentItem.description}
                      onChange={(e) => {
                       const newContent = [...props.keepoData.content]; // Cria uma cópia do array
                       newContent[index] = { ...newContent[index], description: e.target.value }; // Atualiza apenas o item específico
             
                       props.setKeepoData((prev) => ({
                         ...prev,
                         content: newContent, // Atualiza o array no estado
                       }));
                     }}
                     className="text-gray-500 h-auto overflow-y-auto  rounded-none text-sm w-full bg-transparent border-0 p-0 dark:border-0 dark:bg-transparent" placeholder="Parágrafo"/>
                   <div className="min-w-8 w-8">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 group-hover:flex hidden min-w-8"
                      onClick={() => deleteItem(index)}
                     
                    >
                      <Trash size={16} />
                    </Button>
                    </div>

                  </div>
                )
              case "list":
                return <ul className="list-disc pl-5"><li>{contentItem.title}</li></ul>;
              case "video":
                
                return (
                  <div className="flex gap-2 group w-full">
                     
                     <div className="min-w-28 w-28 flex justify-end">
                  <div className="flex gap-2 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 group-hover:flex hidden"
                      onClick={() => moveItem(index, "up")}
                      disabled={index === 0} // Desativa o botão se for o primeiro item
                    >
                      <ChevronUp size={16} />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 group-hover:flex hidden"
                      onClick={() => moveItem(index, "down")}
                      disabled={index === props.keepoData.content.length - 1} // Desativa se for o último
                    >
                      <ChevronDown size={16} />
                    </Button>

                    <DropdownMenuBuilder
                    setKeepoData={props.setKeepoData}
                    number={index}
                    />
                  </div>
                </div>
                  
                     <div className="w-full">
                      
                      <iframe
                width="100%"
                height="250"
                className="w-full md:aspect-square md:rounded-l-md rounded-t-md"
                src={sanitizeUrlVideo(contentItem.url)}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
                      <Alert className="flex gap-2 items-center p-4 px-8 w-full rounded-t-none md:rounded-l-none">
                      
                     
                      <Input 
                      value={contentItem.title}
                      onChange={(e) => {
                       const newContent = [...props.keepoData.content]; // Cria uma cópia do array
                       newContent[index] = { ...newContent[index], title: e.target.value }; // Atualiza apenas o item específico
             
                       props.setKeepoData((prev) => ({
                         ...prev,
                         content: newContent, // Atualiza o array no estado
                       }));
                     }}
                     className="text-gray-500  rounded-none text-sm w-full bg-transparent border-0 p-0 dark:border-0 dark:bg-transparent" placeholder="Digite o título aqui"/>

                      <Popover>
  <PopoverTrigger>
  <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 "
                    
                    >
                      <Link size={16} />
                    </Button>
  </PopoverTrigger>
  <PopoverContent className="flex flex-col gap-3" side='left' align='center'>
    <Input 
    value={contentItem.url}
    onChange={(e) => {
     const newContent = [...props.keepoData.content]; // Cria uma cópia do array
     newContent[index] = { ...newContent[index], url: e.target.value }; // Atualiza apenas o item específico

     props.setKeepoData((prev) => ({
       ...prev,
       content: newContent, // Atualiza o array no estado
     }));
   }}
   placeholder="https://www..." />
    <Button className="w-full"><Plus size={16}/>Adicionar link</Button>
    </PopoverContent>
</Popover>

                      </Alert>
                     </div>
                    
                  </div>
                )
              case "image":
                return <img src={contentItem.url} alt={contentItem.title} className="w-full rounded-md" />
              case 'link':
                return (
                  <LinkSection contentItem={contentItem} setKeepoData={props.setKeepoData} moveItem={moveItem} deleteItem={deleteItem} index={index} keepoData={props.keepoData}/>
                )
              case 'file':
                return (
                  <FileSection contentItem={contentItem} setKeepoData={props.setKeepoData} moveItem={moveItem} deleteItem={deleteItem} index={index} keepoData={props.keepoData}/>
                )
                case 'social':
                  return (
                    <Social contentItem={contentItem} setKeepoData={props.setKeepoData} moveItem={moveItem} deleteItem={deleteItem} index={index} keepoData={props.keepoData}/>
                  )
              default:
                return <span>Elemento não reconhecido</span>;
            }
          })()}
        </div>
      ))}
        </div>
    )
}