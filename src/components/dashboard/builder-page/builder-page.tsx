import { useState } from "react";
import { Tabs, TabsContent } from "../../ui/tabs";
import { Button } from "../../ui/button";
import { AlignLeft, Check, ChevronLeft, Copy, Eye, GalleryHorizontal, Globe, Heading1, LayoutPanelTop, Link, Palette, Rows, SquareDashedMousePointer, SquarePlay, SquarePlus } from "lucide-react";
import { Separator } from "../../ui/separator";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { ColorPicker } from "../../ui/color-picker";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Textarea } from "../../ui/textarea";

interface Keepo {
    app: App;
    profile_info: ProfileInfo;
    content: Content[];
  }
  
  interface App {
    background_color: string;
    text_color: string;
    card_color: string;
    card_text_color: string;
    button_color: string;
    button_text_color: string;
  }
  
  interface ProfileInfo {
    avatar: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    supporting: string;
    button_text: string;
    link: string;
  }
  
  interface Content {
    type: "divider" | "video" | "link" | "slider" | "social";
    title: string;
    emoji: string;
    url: string;
    items: Items[];
  }
  
  interface Items {
    name: string;
    url: string;
    title: string;
    image: string;
  }
  
export function BuilderPage() {
    const [tab, setTab] = useState('inicio')

     //voltar
          const history = useNavigate();
    
          const handleVoltar = () => {
            history(-1);
          }

          const colors = [
            "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
            "#FFC733", "#33FFF2", "#F233FF", "#33FF95", "#3377FF",
            "#FF3333", "#FF8833", "#33FFB8", "#8D33FF", "#FF33D1"
          ]
          const [color, setColor] = useState('#0f0f0f');
          
          const textColors = [
            "#000000", // Black
            "#FFFFFF", // White
            "#4A4A4A", // Dark Gray
            "#808080", // Gray
            "#C0C0C0", // Light Gray
            "#FF0000", // Red
            "#00FF00", // Lime
            "#0000FF", // Blue
            "#FF4500", // Orange Red
            "#FFD700", // Gold
            "#8A2BE2", // Blue Violet
            "#FF69B4", // Hot Pink
            "#00CED1", // Dark Turquoise
            "#228B22", // Forest Green
            "#2F4F4F", // Dark Slate Gray
          ];

          const [keepoData, setKeepoData] = useState({
            app: {
                background_color: "",
                text_color: "",
                card_color: "",
                card_text_color: "",
                button_color: "",
                button_text_color: "",
            },
            profile_info: {
                avatar: "",
                firstName: "",
                lastName: "",
                email: "",
                jobTitle: "",
                supporting: "",
                button_text: "",
                link: "",
            },
            content: [],
        });

        const addContentItem = (type:string) => {
            setKeepoData((prev) => ({
                ...prev,
                content: [
                    ...prev.content,
                    { type: type, title: "", emoji: "", url: "", items: [] },
                ],
            }));
        };
    
      
    return(
        <main className="h-full p-8 flex gap-3">
            <div className="flex h-full">
            <Tabs defaultValue={tab} value={tab} className="flex gap-3">
 <div className="p-2  flex flex-col gap-1 items-center border rounded-md h-full w-[48px]">

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    <Button className="h-8 w-8" onClick={() => setTab('inicio')}  variant={tab == 'inicio' ? ('outline'):('ghost')} size={'icon'}>
<LayoutPanelTop size={16}/>
</Button>
    </TooltipTrigger>
    <TooltipContent side='right'>
      <p>Início</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
    <Button className="h-8 w-8" onClick={() => setTab('add')} variant={tab == 'add' ? ('outline'):('ghost')} size={'icon'}>
    <SquarePlus size={16}/>
</Button>
    </TooltipTrigger>
    <TooltipContent side='right'>
      <p>Adicionar</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
 
<Button className="h-8 w-8" onClick={() => setTab('themes')} variant={tab == 'themes' ? ('outline'):('ghost')} size={'icon'}>
    <Palette size={16}/>
</Button>
    </TooltipTrigger>
    <TooltipContent side='right'>
      <p>Layout</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>



 </div>
 <div className="h-full  w-[320px] border rounded-md">
 
 <TabsContent value="inicio" className="m-0 p-4">
        <h3 className="text-3xl font-semibold">Olá, vamos começar personalizando a página</h3>
   <p className="text-sm text-gray-500 pt-2 pb-8">Comece adicionando sessões e alterando as cores do layout</p>
    <div className="flex flex-col gap-4">
    <div className="flex flex-col w-full gap-2">
    <Label>Título</Label>
    <Input
        type="text"
        value={keepoData.profile_info.jobTitle}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                profile_info: { ...prev.profile_info, jobTitle: e.target.value },
            }))
        }
    />
</div>

<div className="flex flex-col w-full gap-2">
    <Label>Sigla</Label>
    <Input
        type="text"
        value={keepoData.profile_info.jobTitle}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                profile_info: { ...prev.profile_info, jobTitle: e.target.value },
            }))
        }
    />
</div>

<div className="flex flex-col w-full gap-2">
    <Label>Descrição</Label>
    <Textarea
    
        value={keepoData.profile_info.supporting}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                profile_info: { ...prev.profile_info, supporting: e.target.value },
            }))
        }
    />
</div>
    </div>
 <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="py-2 border-b">Informações</AccordionTrigger>
    <AccordionContent className="mt-4 flex flex-col gap-4">
    <div className="flex flex-col w-full gap-2">
    <Label>Título</Label>
    <Input
        type="text"
        value={keepoData.profile_info.jobTitle}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                profile_info: { ...prev.profile_info, jobTitle: e.target.value },
            }))
        }
    />
</div>


    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="py-2 border-b">Cards</AccordionTrigger>
    <AccordionContent  className="mt-4">
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
</TabsContent>
 <TabsContent value="themes" className="m-0 p-4">
 <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="py-2 border-b">Botões</AccordionTrigger>
    <AccordionContent className="mt-4 flex flex-col gap-4">
    <div className="flex flex-col gap-2">
    <Label>Cor de fundo</Label>
    <div className="flex  gap-4">
    <Input
        type="text"
        value={keepoData.app.background_color}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                app: { ...prev.app, background_color: e.target.value },
            }))
        }
    />

<ColorPicker
          onChange={(v) => {
            setKeepoData((prev) => ({
                ...prev,
                app: { ...prev.app, background_color: v },
            }))
          }}
          value={keepoData.app.background_color}
        />


    </div>
</div>

<div className="flex flex-col gap-2">
    <Label>Cor do texto</Label>
    <div className="flex  gap-4">
    <Input
        type="text"
        value={keepoData.app.background_color}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                app: { ...prev.app, background_color: e.target.value },
            }))
        }
    />

<ColorPicker
          onChange={(v) => {
            setKeepoData((prev) => ({
                ...prev,
                app: { ...prev.app, background_color: v },
            }))
          }}
          value={keepoData.app.background_color}
        />


    </div>
</div>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="py-2 border-b">Cards</AccordionTrigger>
    <AccordionContent  className="mt-4">
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
 </TabsContent>
 <TabsContent value="add" className="m-0 p-4">
    <div className="gap-4 grid grid-cols-2">

        <Alert className="aspect-square flex flex-col gap-1 items-center justify-center">
            <div>
            <Rows size={32}/>
            </div>
            <p className="text-sm text-gray-500">Separador</p>
        </Alert>

        <Alert className="aspect-square flex flex-col gap-1 items-center justify-center">
            <div>
            <Heading1 size={32}/>
            </div>
            <p className="text-sm text-gray-500">Título</p>
        </Alert>

        <Alert className="aspect-square flex flex-col gap-1 items-center justify-center">
            <div>
            <AlignLeft size={32}/>
            </div>
            <p className="text-sm text-gray-500">Parágrafo</p>
        </Alert>

        <Alert className="aspect-square flex flex-col gap-1 items-center justify-center">
            <div>
            <SquarePlay size={32}/>
            </div>
            <p className="text-sm text-gray-500">Vídeo</p>
        </Alert>

        <Alert className="aspect-square flex flex-col gap-1 items-center justify-center">
            <div>
            <GalleryHorizontal size={32}/>
            </div>
            <p className="text-sm text-gray-500">Carrossel</p>
        </Alert>

        <Alert className="aspect-square flex flex-col gap-1 items-center justify-center">
            <div>
            <Link size={32}/>
            </div>
            <p className="text-sm text-gray-500">Link</p>
        </Alert>

        <Alert className="aspect-square flex flex-col gap-1 items-center justify-center">
            <div>
            <SquareDashedMousePointer size={32}/>
            </div>
            <p className="text-sm text-gray-500">Card</p>
        </Alert>

        <Alert className="aspect-square flex flex-col gap-1 items-center justify-center">
            <div>
            <Globe size={32}/>
            </div>
            <p className="text-sm text-gray-500">Redes sociais</p>
        </Alert>

    </div>
 </TabsContent>
 </div>
</Tabs>

            </div>

            <div className="flex flex-1 flex-col gap-3">
               
                <div className="w-full px-2 h-[48px] border rounded-md flex items-center  justify-between">
                <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>

                    <div className="flex gap-3">
                    <Button variant={'outline'} className="h-8 px-3">
                        <Eye size={16}/> Preview
                    </Button>

                    <div className="h-8 w-[1px] bg-neutral-200 dark:bg-neutral-900"></div>
                  
                  <Alert className="h-8 rounded-md p-0 px-1 flex items-center gap-2">

                    <Button size={'icon'} className="h-6 w-6" variant={'ghost'} ><Copy size={12}/></Button>
                  </Alert>
                    </div>

                    <div className="flex gap-3">
                    <Button className="h-8 px-3">
                        <Check size={16}/> Publicar
                    </Button>
                    </div>
                </div>

                <div>
                    <h1>sd</h1>

                    <div>
                    {keepoData.content.map((contentItem, index) => (
                            <div key={index} className="border p-4 rounded-md">
                                <Label>Tipo</Label>
                               
                                {Object.keys(contentItem).map(
                                    (key) =>
                                        key !== "type" && (
                                            <div key={key} className="flex flex-col gap-2 mt-2">
                                                <Label>{key.replace(/_/g, " ")}</Label>
                                                <Input
                                                    type="text"
                                                    value={contentItem[key]}
                                                    
                                                />
                                            </div>
                                        )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}