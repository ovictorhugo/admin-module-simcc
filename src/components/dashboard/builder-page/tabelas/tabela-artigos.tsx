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
import { DataTable } from "../../data-table";
import { ColumnDef } from "@tanstack/react-table";

interface Props {
    dados:Dados[]
    year:number
    setYear: (year: number) => void; // Corrigido o tipo de setYear
    anos:number[]
    anoSelecionado:number | null
    setAnoSelecionado: (ano: number | null) => void; // Corrigido o tipo da função
}


  
export function TabelaArtigoSection(props:Props) {

  // Definição das colunas para o DataTable
  const columns: ColumnDef<Dados>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "A1",
      header: "A1",
    },
    {
      accessorKey: "A2",
      header: "A2",
    },
    {
      accessorKey: "A3",
      header: "A3",
    },
    {
      accessorKey: "A4",
      header: "A4",
    },
    {
      accessorKey: "B1",
      header: "B1",
    },
    {
      accessorKey: "B2",
      header: "B2",
    },
    {
      accessorKey: "B3",
      header: "B3",
    },
    {
      accessorKey: "B4",
      header: "B4",
    },
    {
      accessorKey: "C",
      header: "C",
    },
    {
      accessorKey: "SQ",
      header: "SQ",
    },
    {
      accessorKey: "citations",
      header: "Citações",
    },
  ];


 

     return(
         <Alert className="hidden md:block lg:col-span-3 ">
        
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <div>
                            <CardTitle className="text-sm font-medium">
                              Tabela de quantidade de citações e atigos com qualis por ano
                            </CardTitle>
                            <CardDescription>Soma total do pesquisador</CardDescription>
                          </div>
        
                          <select
            id="year"
            value={props.anoSelecionado ?? ""}
            onChange={(e) => props.setAnoSelecionado(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            {props.anos.map((ano) => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
          </select>
        
                        </CardHeader>
                        <CardContent className="mt-4">
                        <div className="space-y-4">
        {/* Seletor de anos */}
      
  
        {/* DataTable */}
        <DataTable
          columns={columns}
          data={props.dados.filter((item) => item.year === props.anoSelecionado)}
         
        />
      </div>
                        </CardContent>
                      </Alert>
    )
}