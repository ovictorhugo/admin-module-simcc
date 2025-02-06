import { useMemo, useState } from "react"
import { Dados } from "../sections/grafico";
import { Alert } from "../../../ui/alert";
import { CardContent, CardDescription, CardHeader, CardTitle } from "../../../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip";
import { Info } from "lucide-react";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, PieChart, Pie, LabelList, Cell, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Label as LabelChart } from 'recharts';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
  } from "../../../ui/chart"
import { TabelaQualisQuantidadeResarcher } from "../../../researcher/gráficos/tabela-qualis-quantidade-researcher";

interface Props {
    dados:Dados[]
    year:number
    id:string
    setYear: (year: number) => void; // Corrigido o tipo de setYear
}


  
export function TabelaArtigoSection(props:Props) {
    


     return(
         <Alert className="hidden md:block lg:col-span-3 ">
        
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <div>
                            <CardTitle className="text-sm font-medium">
                              Tabela de quantidade de citações e atigos com qualis por ano
                            </CardTitle>
                            <CardDescription>Soma total do pesquisador</CardDescription>
                          </div>
        
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger> <Info className="h-4 w-4 text-muted-foreground" /></TooltipTrigger>
                              <TooltipContent>
                                <p>Fonte: Plataforma Lattes</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
        
                        </CardHeader>
                        <CardContent className="mt-4">
                          <TabelaQualisQuantidadeResarcher graduate_program_id={props.id} year={String(props.year)} />
                        </CardContent>
                      </Alert>
    )
}