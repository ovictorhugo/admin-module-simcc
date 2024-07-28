import { Building2, Check, ChevronLeft, Image, Plus, PlusCircle, Search } from "lucide-react";
import { useModalDashboard } from "../hooks/use-modal-dashboard";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Alert } from "../ui/alert";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import bg_popup from '../../assets/bg_popup.png';
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { UserContext } from "../../context/context";
import { TooltipProvider } from "../ui/tooltip";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { Tabs, TabsContent } from "../ui/tabs";
import { ItensListDepartamento } from "./components/itens-list-departamento";
import { useModal } from "../hooks/use-modal-store";
import { DisplayItemDepartamento } from "./components/display-item-departamento";


interface Departamentos {
  dep_id:string
      org_cod: string
      dep_nom: string
      dep_des: string
      dep_email: string
      dep_site: string
      dep_tel: string
      img_data:string
      dep_sigla: string
}

export function Departamentos() {
    const { isOpen, type} = useModalDashboard();

    const {urlGeralAdm} = useContext(UserContext)
  
    const isModalOpen = isOpen && type === "departamento";

    const history = useNavigate();

    const handleVoltar = () => {
      history(-1);
    }

    const uuid = uuidv4();
  
    // Extract numbers from the UUID and join them into a single string
    const id = uuid.replace(/\D/g, '').slice(0, 10);

    const [formData, setFormData] = useState([{
      dep_id: id,
      org_cod: '',
      dep_nom: '',
      dep_des: '',
      dep_email: '',
      dep_site: '',
      dep_tel: '',
      img_data: '',
      dep_sigla: ''
    }]);
  
    const [fileInfo, setFileInfo] = useState({
      name: '',
      size: 0
    });
  
    const [pdfs, setPdfs] = useState({
      img_data: null
    });
  
    const handleChange = (e:any) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleFileChange = (e:any) => {
      setPdfs({
        ...pdfs,
        [e.target.name]: e.target.files[0]
      });
      setFileInfo({
        name: e.target.files[0].name,
        size: e.target.files[0].size
      });
    };
  
    const handleSubmit = () => {

      handleSubmitDepartamento();
    };

    // Função para atualizar um item específico no formData
  const updateItem = (index:any, field:any, value:any) => {
    const newFormData = formData.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setFormData(newFormData);
  };

  const formatPhone = (value:any) => {
    value = value.replace(/\D/g, ''); // Remove todos os caracteres que não são dígitos
    value = value.replace(/^(\d{2})(\d)/, '($1) $2'); // Adiciona parênteses em torno dos dois primeiros dígitos
    value = value.replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2-$3'); // Formata o restante como x xxxx-xxxx
    return value.slice(0, 16); // Limita a 15 caracteres
  };
  
  const handlePhoneChange = (index:any, e:any) => {
    const formattedPhone = formatPhone(e.target.value);
    updateItem(index, 'dep_tel', formattedPhone);
  };


  console.log(formData)


  const handleSubmitDepartamento = async () => {
    try {
      if (!pdfs.img_data) {
        toast("Erro: Nenhuma imagem selecionada", {
          description: "Por favor, selecione uma imagem para enviar.",
          action: {
            label: "Fechar",
            onClick: () => console.log("Fechar"),
          },
        });
        return;
      }
  
      const urlDepartamentoInsert = 'http://150.164.32.238:8484/' + `departamento`; // Atualize a URL conforme necessário
  
      const data = new FormData();
      Object.entries(formData[0]).forEach(([key, value]) => {
        data.append(key, value);
      });
      data.append('img_data', pdfs.img_data);
  
      const response = await axios.post(urlDepartamentoInsert, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
  
      if ((response.status === 201) || (response.status === 200)) {
        toast("Dados enviados com sucesso", {
          description: "Todos os dados foram enviados.",
          action: {
            label: "Fechar",
            onClick: () => console.log("Fechar"),
          },
        });
  
        setFormData([{
          dep_id: '',
          org_cod: '',
          dep_nom: '',
          dep_des: '',
          dep_email: '',
          dep_site: '',
          dep_tel: '',
          img_data: '',
          dep_sigla: ''
        }]);
        setFileInfo({
          name: '',
          size: 0
        });
        setPdfs({
          img_data: null
        });
  
     
      }
    } catch (error) {
      console.error('Erro ao processar a requisição:', error);
      toast("Erro ao processar a requisição", {
        description: "Tente novamente mais tarde.",
        action: {
          label: "Fechar",
          onClick: () => console.log("Fechar"),
        },
      });
    }
  };

  ///

  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState<Departamentos | null>(null);

  const { defaultLayout } = useContext(UserContext);
  const {onOpen} = useModal()

  

  // Função para lidar com a atualização de researcherData
  const handleResearcherUpdate = (newResearcherData: Departamentos) => {
    setTotal(newResearcherData);
  };

    return(
      <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
  direction="horizontal"
  onLayout={() => defaultLayout}
  className="h-full  items-stretch"
  >
       <ResizablePanel defaultSize={40} minSize={40}>
       <Tabs defaultValue={tab} value={tab}>
  <div className="flex items-center justify-between px-4 py-2  h-[56px]">
  <div className="flex items-center gap-4">
          
          <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
      <h1 className="text-lg font-bold">Departamentos</h1>
          </div>

    
  </div>
 <div className="w-full border-b border-neutral-200 dark:border-neutral-800 "></div>

  <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="flex items-center gap-3">
      <Button onClick={() => onOpen('add-departamento')}>
        <Plus size={16}/> Adicionar departamento
      </Button>
      <div className="relative w-full bg-white h-10 flex gap-2 items-center border pl-4 border-neutral-200 dark:border-neutral-800 rounded-md dark:bg-neutral-950">
        <Search size={16} />
        <Input placeholder="Filtrar pelo nome do grupo..." className="border-none h-8" value={search}  onChange={(e) => setSearch(e.target.value)}/>
      </div>
    </div>
  </div>
  <TabsContent value="all" className="m-0">
   <ItensListDepartamento
   onResearcherUpdate={handleResearcherUpdate}
   url={`${urlGeralAdm}departamentos`}
   search={search}
   />
  </TabsContent>
  <TabsContent value="unread" className="m-0">
 
  </TabsContent>
</Tabs>
       </ResizablePanel>
       <ResizableHandle withHandle />

       <ResizablePanel defaultSize={defaultLayout[2]} minSize={50}>

             {total ? (
    <DisplayItemDepartamento
    dep_id={total.dep_id}
      org_cod={total.org_cod}
      dep_nom={total.dep_nom}
      dep_des={total.dep_des}
      dep_email={total.dep_email}
      dep_site={total.dep_site}
      dep_tel={total.dep_tel}
      img_data={total.img_data}
      dep_sigla={total.dep_sigla}
    />
  ):(
    <div className="w-full h-full flex flex-col items-center justify-center">
     <p className="text-9xl  text-[#719CB8]  font-bold mb-16 animate-pulse">^____^</p>
      <p className="font-medium text-lg">Nenhum departamento selecionado</p>
    </div>
  )}
    
    </ResizablePanel>
    </ResizablePanelGroup>
    </TooltipProvider>
    )
}