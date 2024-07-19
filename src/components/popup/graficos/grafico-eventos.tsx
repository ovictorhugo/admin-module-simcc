import React, { useEffect, useState } from "react";
import { Alert } from "../../ui/alert";
import { BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";

type Livros = {
  event_name: string;
  id: string;
  nature: string;
  participation: string;
  year: string;
};

const chartConfig = {
  Congresso: {
    label: "Congresso",
    color: "#DBB540",
  },
  Outra: {
    label: "Outra",
    color: "#6BC26B",
  },
  Simpósio: {
    label: "Simpósio",
    color: "#FF5733",
  },
  Encontro: {
    label: "Encontro",
    color: "#C70039",
  },
  Seminário: {
    label: "Seminário",
    color: "#900C3F",
  },
} as ChartConfig;

export function GraficosEventos({ publicacoes }: { publicacoes: Livros[] }) {
  const [chartData, setChartData] = useState<{ year: string; [nature: string]: number }[]>([]);

  useEffect(() => {
    const counts: { [year: string]: { [nature: string]: number } } = {};

    publicacoes.forEach((livro) => {
      const year = livro.year;
      const nature = livro.nature;

      if (!counts[year]) {
        counts[year] = {};
      }

      counts[year][nature] = (counts[year][nature] || 0) + 1;
    });

    const data = Object.entries(counts).map(([year, natureCounts]) => ({
      year,
      ...natureCounts,
    }));

    setChartData(data);
  }, [publicacoes]);

  function getColorForNature(nature: string) {
    return chartConfig[nature]?.color || '#000000';
  }

  return (
    <Alert className="pt-12">
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
           
            <CartesianGrid vertical={false} horizontal={false} />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            {Object.keys(chartConfig).map((nature, index) => (
              <Bar
                key={nature}
                dataKey={nature}
                stackId="a"
                fill={chartConfig[nature].color}
                radius={index === 0 ? [4, 4, 0, 0] : index === Object.keys(chartConfig).length - 1 ? [ 4, 4, 0, 0] : [0, 0, 0, 0]}
              >
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Alert>
  );
}
