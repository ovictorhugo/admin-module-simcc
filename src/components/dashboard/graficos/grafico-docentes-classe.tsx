import React, { useEffect, useState } from "react";
import { Alert } from "../../ui/alert";
import { BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";

interface Docentes {
  matric: string;
  inscUFMG: string;
  nome: string;
  genero: string;
  situacao: string;
  rt: string;
  clas: string;
  cargo: string;
  classe: string;
  ref: string;
  titulacao: string;
  entradaNaUFMG: string;
  progressao: string;
  year_charge: string;
  semester: string;
}

const chartConfig = {
  "PROF ADJUNTO": {
    label: "Professor Adjunto",
    color: "hsl(var(--chart-1))",
  },
  "PROF ASSOCIADO": {
    label: "Professor Associado",
    color: "hsl(var(--chart-2))",
  },
  "PROF TITULAR": {
    label: "Professor Titular",
    color: "hsl(var(--chart-3))",
  },
  "PROF ASSISTENTE": {
    label: "Professor Assistente",
    color: "hsl(var(--chart-4))",
  },
  "PROF TITULAR - LIVRE": {
    label: "Professor Titular - Livre",
    color: "hsl(var(--chart-5))",
  },
  "PROF AUXILIAR": {
    label: "Professor Auxiliar",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export function GraficoDocentesClasse({ docentes }: { docentes: Docentes[] }) {
  const [chartData, setChartData] = useState<{ classe: string; count: number }[]>([]);

  useEffect(() => {
    const counts: { [key: string]: number } = {};

    docentes.forEach(docente => {
      const classe = docente.classe;
      counts[classe] = (counts[classe] || 0) + 1;
    });

    const data = Object.entries(counts).map(([classe, count]) => ({
      classe,
      count,
    }));

    setChartData(data);
  }, [docentes]);

  function getColorForClasse(classe: string) {
    const colors = {
      "PROF ADJUNTO": '#FFB74D',
      "PROF ASSOCIADO": '#64B5F6',
      "PROF TITULAR": '#81C784',
      "PROF ASSISTENTE": '#FF8A65',
      "PROF TITULAR - LIVRE": '#E57373',
      "PROF AUXILIAR": '#BA68C8',
    };
    return colors[classe] || '#000000';
  }

  return (
    <Alert className="p-0 border-0 h-full">
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer>
          <BarChart layout="vertical" data={chartData} margin={{ top: 20, right: 5, left: 30, bottom: 0 }}>
            <XAxis type="number" tickLine={false}  axisLine={false} />
            <YAxis type="category" dataKey="classe" tickLine={false} tickMargin={10} axisLine={false} />
            <CartesianGrid horizontal={false} vertical={true} />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="count" radius={4}>
              <LabelList dataKey="count" position="right" offset={12} className="fill-foreground" fontSize={12} />
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorForClasse(entry.classe)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Alert>
  );
}
