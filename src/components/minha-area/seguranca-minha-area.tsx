import { useContext, useState } from "react"
import { UserContext } from "../../context/context"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Lock, RefreshCcw, UserCheck } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { toast } from "sonner"

export function SegurancaMinhaArea() {

    const {user, urlGeralAdm} = useContext(UserContext)

    const [lattes, setLattes] = useState(user?.lattes_id || '')
    const [name, setName] = useState(user?.display_name || '')
    const [linkedin, setLinkedin] = useState(user?.linkedin || '')

    const handleSubmit = async () => {
      try {

        const data = [
          {
            uid:(user?.uid),
            linkedin:linkedin,
            lattes_id:lattes,
            display_name:name
          }
        ]
          if (name.length === 0) {
              toast("O nome não pode ser vazio", {
                  description: "Por favor, tente novamente",
                  action: {
                      label: "Fechar",
                      onClick: () => console.log("Fechar"),
                  },
              });
              return;
          }
  
          let urlGruposPesquisaInsert = `${urlGeralAdm}s/user`;
      
          const response = await fetch(urlGruposPesquisaInsert, {
              mode: 'cors',
              method: 'PUT',
              headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'PUT',
                  'Access-Control-Allow-Headers': 'Content-Type',
                  'Access-Control-Max-Age': '3600',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data),
          });

          if (response.ok) {
              toast("Dados enviados com sucesso", {
                  description: "Todos os dados foram enviados.",
                  action: {
                      label: "Fechar",
                      onClick: () => console.log("Fechar"),
                  },
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
        <div className="flex flex-col flex-1 w-full">
                      <div>
                      <p className="max-w-[750px] mb-2 text-lg font-light text-foreground">
                       Olá, {user?.display_name}
                        </p>

                        <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">
                          Perfil e segurança
                        </h1>
                      </div>

                      <div className="my-6 border-b dark:border-b-neutral-800"></div>
                      <h5 className="font-medium text-xl">Perfil</h5>
                    <div className="flex items-center">

                    </div>

                    <div className="flex w-full flex-col gap-2 mt-4">
                <Label>Nome completo</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} type="text"/>
            </div>
                    <div className="flex w-full gap-4 items-end">
                    <div className="flex w-full flex-col gap-2 mt-4">
                <Label>LinkedIn</Label>
                <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} type="text"/>
            </div>
                    <div className="flex w-full flex-col gap-2 mt-4">
                <Label>Id lattes</Label>
                <Input value={lattes} onChange={(e) => setLattes(e.target.value)} type="text"/>
            </div>

            <Button onClick={() => handleSubmit()}><RefreshCcw size={16}/>Atualizar dados</Button>
                    </div>

                    <div className="my-6 border-b dark:border-b-neutral-800"></div>
                    <h5 className="font-medium text-xl mb-4">Verificação do perfil</h5>
                    <div className="bg-neutral-100 flex gap-3 dark:bg-neutral-800 w-full p-8 rounded-md">

    <div>  <Lock size={24}/></div>
    <div>
    <AlertTitle className="whitespace-normal">Solicitar acesso para edição das produções</AlertTitle>
      <AlertDescription className="whitespace-normal mb-6">
     Sendo um perfil verificado, você pode adicionar mídia as suas produções entre outras ferramentas. Solicite a verificação da conta para obter acesso.
      </AlertDescription>

      <Button><UserCheck size={16}/>Solicitar acesso</Button>
      </div>

                    </div>
                  </div>
    )
}