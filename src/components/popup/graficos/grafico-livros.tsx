import React, { useEffect, useState } from "react";
import { Alert } from "../../ui/alert";
import { BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";

type Livro = {
    id: string,
    title: string,
    year: string,
    isbn: string,
    publishing_company: string
};

const chartConfig = {
  capLivros: {
    label: "Capítulos de Livros",
    color: "hsl(var(--chart-1))",
  },
  publicacoes: {
    label: "Livros",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function GraficoLivros({ capLivros, publicacoes }: { capLivros: Livro[], publicacoes: Livro[] }) {
    const [chartData, setChartData] = useState<{ label: string; count: number }[]>([]);

  useEffect(() => {
    const data = [
      { label: 'Capítulos de Livros', count: capLivros.length },
      { label: 'Livros', count: publicacoes.length },
    ];

    setChartData(data);
  }, [capLivros, publicacoes]);

  function getColorForType(type: 'Capítulos de Livros'| 'Livros') {
    const colors = {
      'Capítulos de Livros': '#E8ACD2',
      'Livros': '#89274D',
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
