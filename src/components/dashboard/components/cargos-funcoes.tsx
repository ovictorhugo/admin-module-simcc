import { useContext, useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { UserContext } from "../../../context/context";
import { DisplayCargo } from "./display-cargo";
import { Alert } from "../../ui/alert";
import { CardDescription, CardFooter, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";

interface Disciplinas {
    semester: string;
    department: string;
    academic_activity_code: string;
    academic_activity_name: string;
    academic_activity_ch: number;
    demanding_courses: string;
    oft: string;
    id: string;
    available_slots: number;
    occupied_slots: string;
    percent_occupied_slots: number;
    schedule: string;
    language: string;
    researcher_id: string[];  // Alterado para string[]
    researcher_name: string[]; // Alterado para string[]
    status: string;
    workload: number[]; // Alterado para number[]
    turmas_juntas?: string; // Novo campo
}


export function CargosFuncoes() {
    const [data, setData] = useState<Disciplinas[]>([]);
    const [dataSelecionado, setDataSelecionado] = useState<Disciplinas | null>(null);

    const { urlGeralAdm, urlGeral } = useContext(UserContext)
    let urlDisciplinas = urlGeralAdm + `departamentos/disciplinas?dep_id=`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(urlDisciplinas, {
                    mode: "cors",
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET",
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Max-Age": "3600",
                        "Content-Type": "text/plain",
                    },
                });
                const data = await response.json();
                if (data) {
                    setData(data);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [urlDisciplinas]);

    console.log(data)

    //
    const handleSubmitPesquisador = async () => {
        try {
            
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
      }

    }

    return(
        <main className="grid flex-1 items-start gap-4  md:gap-8 lg:grid-cols-3 xl:grid-cols-3  pb-4 md:pb-8">
              <div className={`grid auto-rows-max items-start gap-4 md:gap-8 ${dataSelecionado ? ('lg:col-span-2') : ('lg:col-span-3')}`}>
              <Alert
                className="p-0" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Adicionar cargo</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                <div className="flex gap-6 items-end">
                <div className="flex flex-col space-y-1.5 w-full flex-1">
           <Label htmlFor="name">Nome completo</Label>
           <Input value={nomePesquisador} onChange={(e) => setNomePesquisador(e.target.value)} type="text"  />
           </div>
                 <Button onClick={() => handleSubmitPesquisador()}><Plus size={16}/>Adicionar cargo</Button>
                 </div>
                </CardFooter>
              </Alert>

              <ResponsiveMasonry
                    columnsCountBreakPoints={{
                        350: 1,
                        720: 2,
                        900: 2,
                        1200: dataSelecionado ? 3 : 4,
                    }}
                >
                    <Masonry gutter="16px">
                        </Masonry>
                    </ResponsiveMasonry>
              </div>

              {dataSelecionado && (
                <DisplayCargo
                    
                />
            )}
        </main>
    )
}