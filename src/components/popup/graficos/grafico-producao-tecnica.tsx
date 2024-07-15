import React, { useEffect, useState } from "react";
import { Alert } from "../../ui/alert";
import { BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";

type Livros = {
  id: string;
  title: string;
  year: string;
};

type Patente = {
  id: string;
  grant_date: string;
  title: string;
  year: string;
  financing: string;
  project_name: string;
};

const chartConfig = {
  software: {
    label: "Software",
    color: "hsl(var(--chart-1))",
  },
  publicacoes: {
    label: "Patentes",
    color: "hsl(var(--chart-2))",
  },
  marca: {
    label: "Marcas",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function GraficoProducaoTecnica({ software, publicacoes, marca }: { software: Livros[], publicacoes: Patente[], marca: Livros[] }) {
    const [chartData, setChartData] = useState<{ label: string; count: number }[]>([]);

  useEffect(() => {
    const data = [
      { label: 'Softwares', count: software.length },
      { label: 'Patentes', count: publicacoes.length },
      { label: 'Marcas', count: marca.length },
    ];

    setChartData(data);
  }, [software, publicacoes, marca]);

  function getColorForType(type: 'Softwares'| 'Patentes' | 'Marcas') {
    const colors = {
      'Softwares': '#7AD0EA',
      'Patentes': '#6BC26B',
      'Marcas': '#FF5733',
    };
    return colors[type] || '#000000';
  }

  return (
    <Alert className="pt-12">
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="label" tickLine={false} tickMargin={10} axisLine={false} />
        
            <CartesianGrid vertical={false} horizontal={false} />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="count" radius={4}>
              <LabelList dataKey="count" position="top" offset={12} className="fill-foreground" fontSize={12} />
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorForType(entry.label)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Alert>
  );
}
