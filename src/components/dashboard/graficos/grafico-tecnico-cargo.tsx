import React, { useEffect, useState } from "react";
import { Alert } from "../../ui/alert";
import { BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";

interface Docentes {
    cargo:string
    classe:string
    data_prog:string
    deno_sit:string
    detalhe_setor:string
    dting_org:string
    genero:string
    ins_ufmg:string
    matric:string
    nivel:string
    nome:string
    ref:string
    rt:string
    semester:string
    setor:string
    titulacao:string
}

const chartConfig = {
  'MESTRE EDIF E INFRAEST': {
    label: "Mestre Edif e Infraest",
    color: "#5F82ED",
  },
  'AUX EM ADMINIST': {
    label: "Aux em Administ",
    color: "#D15697",
  },
  'ASSISTENTE EM ADMINIST': {
    label: "Assistente em Administ",
    color: "#FFB74D",
  },
  'TÉC EM ELETROELET': {
    label: "Téc em Eletroelet",
    color: "#81C784",
  },
  'TÉC DE LAB': {
    label: "Téc de Lab",
    color: "#FF8A65",
  },
  'TÉC EM ELETROTÉCNICA': {
    label: "Téc em Eletrotécnica",
    color: "#9575CD",
  },
  'BIBLIOTECÁRIO': {
    label: "Bibliotecário",
    color: "#4DB6AC",
  },
  'TÉC DE TECNOL DA INFORMAÇÃO': {
    label: "Téc de Tecnol da Informação",
    color: "#F06292",
  },
  'SEC EXECUTIVO': {
    label: "Sec Executivo",
    color: "#64B5F6",
  },
  'ENGENHEIRO': {
    label: "Engenheiro",
    color: "#FFB74D",
  },
  'TELEFONISTA': {
    label: "Telefonista",
    color: "#AED581",
  },
  'CONTRAMESTRE': {
    label: "Contramestre",
    color: "#4FC3F7",
  },
  'OPERADOR DE MÁQUINA COPIADORA': {
    label: "Operador de Máquina Copiadora",
    color: "#BA68C8",
  },
  'PEDAGOGO': {
    label: "Pedagogo",
    color: "#7986CB",
  },
  'ELETRICISTA': {
    label: "Eletricista",
    color: "#FF8A65",
  },
  'ASCENSORISTA': {
    label: "Ascensorista",
    color: "#FFD54F",
  },
  'BOMBEIRO HIDRÁULICO': {
    label: "Bombeiro Hidráulico",
    color: "#D4E157",
  },
  'PORTEIRO': {
    label: "Porteiro",
    color: "#4DB6AC",
  },
  'ANALISTA DE TEC DA INF': {
    label: "Analista de Tec da Inf",
    color: "#FF80AB",
  },
  'TÉC EM MECÂNICA': {
    label: "Téc em Mecânica",
    color: "#9575CD",
  },
  'TÉC EM QUÍMICA': {
    label: "Téc em Química",
    color: "#81C784",
  },
  'TÉC EM CONTABILIDADE': {
    label: "Téc em Contabilidade",
    color: "#4FC3F7",
  },
  'TÉC EM MINERAÇÃO': {
    label: "Téc em Mineração",
    color: "#7986CB",
  },
  'TÉC EM METALURGIA': {
    label: "Téc em Metalurgia",
    color: "#FFD54F",
  }
} satisfies ChartConfig;

export function GraficoTecnicosCargo({ docentes }: { docentes: Docentes[] }) {
  const [chartData, setChartData] = useState<{ cargo: string; count: number }[]>([]);

  useEffect(() => {
    const counts: { [key: string]: number } = {};

    docentes.forEach(docente => {
      const cargo = docente.cargo;
      counts[cargo] = (counts[cargo] || 0) + 1;
    });

    const data = Object.entries(counts).map(([cargo, count]) => ({
      cargo,
      count,
    }));

    setChartData(data);
  }, [docentes]);

  function getColorForCargo(cargo: string) {
    const colors = Object.keys(chartConfig).reduce((acc, key) => {
      acc[key] = chartConfig[key].color;
      return acc;
    }, {} as { [key: string]: string });
    return colors[cargo] || '#000000';
  }

  return (
    <Alert className="p-0 border-0 h-full">
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 5, left: 30, bottom: 0 }}>
            <XAxis dataKey="cargo" tickLine={false} axisLine={false} />
          
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="count" radius={4}>
              <LabelList dataKey="count" position="top" offset={10} className="fill-foreground" fontSize={12} />
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorForCargo(entry.cargo)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Alert>
  );
}
