import { useEffect, useState } from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid,  ResponsiveContainer, LabelList, Cell } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";
import { Alert } from "../../ui/alert";

import { CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Tooltip ,TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Info } from "lucide-react";
import { Research } from "../categorias/researchers-home";


type ResearchData = {
  researchers: Research[];
};

const chartConfig = {
  graduation: {
    label: "Graduation",
    color: "#004A75",
  },
} satisfies ChartConfig;

export function GraficoTitulacaoHome(props: ResearchData) {
  const [chartData, setChartData] = useState<{ graduation: string; count: number }[]>([]);

  useEffect(() => {
    if (props.researchers) {
      const counts: { [graduation: string]: number } = {};

      // Conta a quantidade de pesquisadores por nível de graduação
      props.researchers.forEach((researcher) => {
        const graduation = researcher.graduation;

        if (!counts[graduation]) {
          counts[graduation] = 0;
        }

        counts[graduation] += 1;
      });

      // Transforma o objeto em um array para o gráfico
      const data = Object.entries(counts).map(([graduation, count]) => ({
        graduation,
        count,
      }));

      setChartData(data);
    }
  }, [props.researchers]);

  return (
    <ChartContainer config={chartConfig} className=" w-full h-[340px]">
    <ResponsiveContainer>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="graduation" tickLine={false} tickMargin={10} axisLine={false} />
       
        <CartesianGrid vertical={false} horizontal={false} />
      
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
        <Bar
          dataKey="count"
          fill={chartConfig.graduation.color}
          radius={4}
        >
          <LabelList dataKey="count" position="top" offset={12} className="fill-foreground" fontSize={12} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>

  );
}