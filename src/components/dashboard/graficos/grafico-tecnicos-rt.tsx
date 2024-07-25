import React, { useEffect, useState } from "react";
import { Alert } from "../../ui/alert";
import { BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer, ChartTooltip,ChartConfig, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";

interface Docentes {
  matric: string;
  insUFMG: string;
  nome: string;
  genero: string;
  denoSit: string;
  rt: string;
  classe: string;
  cargo: string;
  nivel: string;
  ref: string;
  titulacao: string;
  setor: string;
  detalheSetor: string;
  dtIngOrg: string;
  dataProg: string;
  year_charge: string;
  semester: string;
}

const chartConfig = {
  "20H": {
    label: "20 Horas",
    color: "hsl(var(--chart-1))",
  },
  "40H": {
    label: "40 Horas",
    color: "hsl(var(--chart-2))",
  },
  DE: {
    label: "Dedicação Exclusiva",
    color: "hsl(var(--chart-3))",
  },
  "30H": {
    label: "30 Horas",
    color: "hsl(var(--chart-4))",
  },
  "PROJETO 30H": {
    label: "Projeto 30 Horas",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function GraficoTecnicosRt({ docentes }: { docentes: Docentes[] }) {
  const [chartData, setChartData] = useState<{ rt: string; count: number }[]>([]);

  useEffect(() => {
    const counts: { [key: string]: number } = {};

    docentes.forEach(docente => {
      const rt = docente.rt;
      counts[rt] = (counts[rt] || 0) + 1;
    });

    const data = Object.entries(counts).map(([rt, count]) => ({
      rt,
      count,
    }));

    setChartData(data);
  }, [docentes]);

  function getColorForRt(rt: string) {
    const colors = {
      "20H": '#FFB74D',
      "40H": '#64B5F6',
      DE: '#81C784',
      "30H": '#FF8A65',
      "PROJETO 30H": '#E57373',
    };
    return colors[rt] || '#000000';
  }

  return (
    <Alert className="p-0 border-0 h-full">
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="rt" tickLine={false} tickMargin={10} axisLine={false} />
           
            <CartesianGrid vertical={false} horizontal={false} />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="count" radius={4}>
              <LabelList dataKey="count" position="top" offset={12} className="fill-foreground" fontSize={12} />
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorForRt(entry.rt)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Alert>
  );
}
