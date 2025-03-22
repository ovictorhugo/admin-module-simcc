import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { UserContext } from "../../context/context";
import { useModal } from "../hooks/use-modal-store";
import { Alert } from "../ui/alert";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList } from "../ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Label } from "../ui/label";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Student } from "phosphor-react";

export function UserProfileInitialModal() {
        const { onClose, isOpen, type: typeModal, data } = useModal();
        const isModalOpen = isOpen && typeModal === "user-profile-initial";
        const {urlGeralAdm} = useContext(UserContext)

        const perfis = [
            {name:'Pesquisador', icon:Student},
            {name:'Gestor de Ciência e Tecnologia', icon:Student},
            {name:'Coordenador da Pós-Graduação', icon:Student},
        ]
    
const [tab, setTab] = useState(1)

const [perfil, setPerfil] = useState('')
    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}> 
        <DialogContent className="p-0 min-w-[50vw] border">

             <Alert className="rounded-t-md rounded-b-none bg-gradient-to-r from-eng-dark-blue  to-eng-blue p-6 border-0 border-b">
             <DialogTitle className="text-2xl font-medium max-w-[450px] text-white">
  Veja o que a plataforma pode oferecer
</DialogTitle>
<DialogDescription className="text-white">
  Conte um pouco sobre você 
</DialogDescription>

                        </Alert>

            <DialogHeader className="p-4 pt-0 flex flex-col w-full">
            <Tabs defaultValue={String(tab)} value={String(tab)} className="">
  
  <TabsContent value="1" className="w-full">
  <div className="grid  items-center gap-3">
                    <Label>Qual o seu perfil?</Label>
                    <ToggleGroup
  onValueChange={(value) => {
    const perfilSelecionado = perfis.find((perfil) => perfil.name === value);
    if (perfilSelecionado) {
      setPerfil(perfilSelecionado.name);
    }
  }}
  type="single"
  variant="outline"
  className="grid grid-cols-3 w-full gap-3"
>
  {perfis.map((perfil, index) => (
    <ToggleGroupItem className="flex flex-1 flex-col h-[140px] items-center gap-2" key={index} value={perfil.name}>
      <perfil.icon size={32} /> 
      <div className="px-16">
      {perfil.name}
      </div>
    </ToggleGroupItem>
  ))}
</ToggleGroup>
                  </div>
    </TabsContent>
  <TabsContent value="2">
    Change your password here.
    </TabsContent>
</Tabs>
                </DialogHeader>

                <DialogFooter className="flex gap-2 p-4 pt-0">
{tab != 1 && (
            <Button variant="ghost"  onClick={() => setTab(tab - 1)}>
            <ChevronLeft size={16}/> Anterior
           </Button>
)}

          <Button className="ml-auto flex" onClick={() => setTab(tab + 1)}>
           Próximo <ChevronRight size={16}/>
          </Button>
        </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}