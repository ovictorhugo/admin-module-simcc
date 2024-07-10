import { Building2, Check, ChevronLeft, Image, Plus } from "lucide-react";
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


export function Departamentos() {
    const { isOpen, type} = useModalDashboard();

    const {urlGeral} = useContext(UserContext)
  
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
  const [onOpen, setIsOpen] = useState(false)

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

    return(
        <>
        {isModalOpen && (
            <main className="flex flex-1 flex-col p-4 md:p-8">

                 <div className="w-full mb-2  gap-4">
            <div className="flex items-center gap-4">
          
            <Button onClick={handleVoltar } variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Voltar</span>
              </Button>
          
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Departamentos e setores
              </h1>
             
              
                
            
              <div className="hidden items-center gap-2 md:ml-auto md:flex">

          
                <Button size="sm"><Check size={16}/>Button</Button>
              </div>
            </div>

            </div>

           
           <div className="gap-4 md:gap-8 flex flex-col">

           <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
     <Alert className="p-0 bg-cover bg-no-repeat bg-center lg:col-span-3"  style={{ backgroundImage: `url(${bg_popup})` }}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total de departamentos
                    </CardTitle>
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold"></div>
                    <p className="text-xs text-muted-foreground">
                      registrados
                    </p>
                  </CardContent>
                  </Alert>

                  <Alert onClick={() => setIsOpen(!onOpen)} className="p-0 hover:bg-[#274B5E] bg-[#719CB8] text-white transition-all cursor-pointer "  >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      
                    </CardTitle>
                    <Plus className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>

                  <CardContent>
                    <h2 className="font-medium text-xl">Adicionar <br/> departamento/setor</h2>
                  </CardContent>
                  </Alert>
     </div>


         {onOpen && (
            <fieldset className="grid gap-6 rounded-lg  p-4 bg-white dark:border-neutral-800 border border-neutral-200 dark:bg-neutral-950 ">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Adicionar departamento/setor
            </legend>
              
            {formData.map((item, index) => (
               <div className="flex  gap-6 md:flex-row flex-col">
    
    <div className="flex flex-col gap-6 w-full">
    <div className="flex w-full gap-6 items-end">
    
    <div className="grid gap-3 w-full">
       <Label htmlFor="model">Nome</Label>
       <Input name="nome" value={item.dep_nom} 
       onChange={(e) => updateItem(index, 'dep_nom', e.target.value)} id="temperature" type="text" className="flex flex-1" />
     </div>
    
     <div className="grid gap-3 w-full">
       <Label htmlFor="model">Sigla</Label>
       <Input name="sigla" value={item.dep_sigla}
       onChange={(e) => updateItem(index, 'dep_sigla', e.target.value)} id="temperature" type="text" className="flex flex-1" />
     </div>

     <div className="grid gap-3 w-full">
       <Label htmlFor="model">Logomarca</Label>
       <label htmlFor="fileInput" onChange={handleFileChange} className="rounded-md text-sm truncate cursor-pointer transition-all gap-3 border  h-10 w-full flex items-center px-4 hover:bg-neutral-100">
  
    <input
    id="fileInput"
        type="file"
        name="img_data"
        onChange={handleFileChange}
        accept="image/*"
        hidden
      />
  
{fileInfo.name != '' ? (fileInfo.name):('Importar arquivo')}
    
  </label>
     </div>
    
    </div>
    
    <div className="flex w-full gap-6">
    <div className="grid gap-3 w-full">
       <Label htmlFor="model">Site</Label>
       <Input name="email" value={item.dep_site}
       onChange={(e) => updateItem(index, 'dep_site', e.target.value)} id="temperature" type="text" className="flex flex-1" />
     </div>

     <div className="grid gap-3 md:w-[200px] w-full">
       <Label htmlFor="model">Código</Label>
       <Input name="email" value={item.org_cod}
       onChange={(e) => updateItem(index, 'org_cod', e.target.value)} id="temperature" type="text" className="flex flex-1" />
     </div>
    </div>
   
    
    <div className="flex w-full gap-6">
    
    <div className="grid gap-3 w-full">
       <Label htmlFor="model">Telefone</Label>
       <Input
    name="telefone"
    value={item.dep_tel}
    onChange={(e) => handlePhoneChange(index, e)}
    id="telefone"
    type="text"
    className="flex flex-1"
    />
     </div>
    
     <div className="grid gap-3 w-full">
       <Label htmlFor="model">Email</Label>
       <Input name="email" value={item.dep_email}
       onChange={(e) => updateItem(index, 'dep_email', e.target.value)} id="temperature" type="text" className="flex flex-1" />
     </div>
    
    
    </div>
    
    
    </div>
    <div className="flex flex-col gap-3 w-full">
                        <Label htmlFor="content" className="h-fit">Descrição</Label>
                        <Textarea name="observacoes" className="h-full" value={item.dep_des}
                        onChange={(e) => updateItem(index, 'dep_des', e.target.value)} id="content"/>
                      </div>
               </div>
            ))}
    
    <Button onClick={() => handleSubmit()} ><Plus size={16}/> Adicionar </Button>
           
            </fieldset>
         )}

        <fieldset className="grid gap-6 rounded-lg  p-4 bg-white dark:border-neutral-800 border border-neutral-200 dark:bg-neutral-950 ">
        <legend className="-ml-1 px-1 text-sm font-medium">
          Todos os departamentos e setores
        </legend>

       
        </fieldset>
           </div>
            </main>
        )}
        </>
    )
}