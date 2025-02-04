import { Globe, Info, Plus } from "lucide-react"
import { Alert } from "../../ui/alert"
import { CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"

import bg_popup from '../../../assets/bg_popup.png';
import { useEffect, useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "sonner";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

interface Props {
    id:string
    name:string
    type:string
}
export function Keepo(props:Props) {
  const db = getFirestore();
  const storage = getStorage();

  const [loading, setLoading] = useState(true);

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
const [profileImage, setProfileImage] = useState<File | null>(null);

//imagem perfil 
const handleImageUpload = async () => {
  if (profileImage) {
      const imageRef = ref(storage, `profileImages/${profileImage.name}`);
      await uploadBytes(imageRef, profileImage);
      return await getDownloadURL(imageRef);
  }
  return null;
};

//enviar
const handleSubmit = async () => {

    
      const avatarUrl = await handleImageUpload();

      const dataToSave = {
          ...keepoData,
          profile_info: { ...keepoData.profile_info, avatar: avatarUrl },
      };

      await addDoc(collection(db, "keepos"), dataToSave);

      toast("Projeto criado com sucesso!", {
          description: "Acesse a aba de edição",
          action: {
              label: "Fechar",
              onClick: () => console.log("Fechar"),
          },
      });
     
  
};


const colors = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
  "#FFC733", "#33FFF2", "#F233FF", "#33FF95", "#3377FF",
  "#FF3333", "#FF8833", "#33FFB8", "#8D33FF", "#FF33D1"
]

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

    return(
        <div>

            <div>
            <Alert className=" bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${bg_popup})` }}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Crie e edite
                  </CardTitle>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <div className="flex gap-6 justify-between">

                  <CardContent>
                    <div className="text-2xl font-bold">Personalize a página com suas sessões, links, imagens e organizações</div>
                    <div className="flex gap-3 mt-3">

                      <Button size={'sm'} ><Globe size={16} />Adicionar página</Button>
                    </div>
                  </CardContent>

                  <div></div>
                </div>
              </Alert>
            </div>


            <div className="flex flex-col gap-8">
<fieldset className="grid gap-6 rounded-lg  p-4 bg-white dark:border-neutral-800 border border-neutral-200 dark:bg-neutral-950 bg-cover  bg-center bg-no-repeat ">
<legend className="-ml-1 px-1 text-sm font-medium">Configurações da página</legend>

<div className="grid grid-cols-2 gap-4">
<div className="flex flex-col gap-2">
    <Label>Cor de fundo</Label>
    <div className="flex gap-4">
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

<ScrollArea>
<div className="flex gap-2  w-1/2 ">
        {colors.map((color) => (
            <div
                key={color}
                className="min-w-10 h-10 rounded-md cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() =>
                    setKeepoData((prev) => ({
                        ...prev,
                        app: { ...prev.app, background_color: color },
                    }))
                }
            ></div>
        ))}
    </div>
  <ScrollBar orientation="horizontal"/>
</ScrollArea>
    </div>
</div>

<div className="flex flex-col gap-2">
    <Label>Cor do texto</Label>
    <div className="flex gap-4">
   <Input
        type="text"
        value={keepoData.app.text_color}
        onChange={(e) =>
            setKeepoData((prev) => ({
                ...prev,
                app: { ...prev.app, text_color: e.target.value },
            }))
        }
    />

<ScrollArea>
<div className="flex gap-2  w-1/2 ">
        {textColors.map((color) => (
            <div
                key={color}
                className="min-w-10 h-10 rounded-md cursor-pointer"
                style={{ backgroundColor: color }}
                onClick={() =>
                    setKeepoData((prev) => ({
                        ...prev,
                        app: { ...prev.app, text_color: color },
                    }))
                }
            ></div>
        ))}
    </div>
  <ScrollBar orientation="horizontal"/>
</ScrollArea>
   </div>
</div>

</div>
</fieldset>
            </div>

        </div>
    )
}