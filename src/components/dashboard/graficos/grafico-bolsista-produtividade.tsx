import React, { useEffect, useState } from "react";
import { Alert } from "../../ui/alert";
import { BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";

interface Bolsistas {
  aid_quantity: string;
  call_title: string;
  funding_program_name: string;
  modality_code: string;
  category_level_code: string;
  institute_name: string;
  modality_name: string;
  name: string;
  researcher_id: string;
  scholarship_quantity: string;
}

const chartConfig = {
  2: {
    label: "Category 2",
    color: "hsl(var(--chart-1))",
  },
  "1A": {
    label: "Category 1A",
    color: "hsl(var(--chart-2))",
  },
  "1B": {
    label: "Category 1B",
    color: "hsl(var(--chart-3))",
  },
  "1C": {
    label: "Category 1C",
    color: "hsl(var(--chart-4))",
  },
  "1D": {
    label: "Category 1D",
    color: "hsl(var(--chart-5))",
  },
  SR: {
    label: "Category SR",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig;

export function GraficoBolsistaProdutividade({ bolsistas }: { bolsistas: Bolsistas[] }) {
  const [chartData, setChartData] = useState<{ category: string; count: number }[]>([]);

  useEffect(() => {
    const counts: { [key: string]: number } = {};

    bolsistas.forEach(bolsista => {
      if (bolsista.modality_code === "PQ") {
        const category = bolsista.category_level_code;
        counts[category] = (counts[category] || 0) + 1;
      }
    });

    const data = Object.entries(counts).map(([category, count]) => ({
      category,
      count,
    }));

    setChartData(data);
  }, [bolsistas]);

  function getColorForCategory(category: string) {
    const colors = {
      2: '#FFB74D',
      '1A': '#64B5F6',
      '1B': '#81C784',
      '1C': '#FF8A65',
      '1D': '#E57373',
      SR: '#F06292',
    };
    return colors[category] || '#000000';
  }

  return (
    <Alert className="p-0 border-0 h-full">
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="category" tickLine={false} tickMargin={10} axisLine={false} />
         
            <CartesianGrid vertical={false} horizontal={false} />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="count" radius={4}>
              <LabelList dataKey="count" position="top" offset={12} className="fill-foreground" fontSize={12} />
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorForCategory(entry.category)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Alert>
  );
}
