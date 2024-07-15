import { useEffect, useState } from "react";
import { Alert } from "../../ui/alert";
import { BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";

type Livro = {
  id: string,
  nature: string,
  oriented: string,
  status: string,
  title: string,
  type: string,
  year: string
};

const chartConfig = {
  EmAndamento: {
    label: "Em andamento",
    color: "hsl(var(--chart-1))",
  },
  Concluída: {
    label: "Concluída",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function GraficoOrientacoes(props: { livros: Livro[] }) {
    const [chartData, setChartData] = useState<{ label: string; count: number }[]>([]);

  type CountResult = {
    [label: string]: number;
  };

  useEffect(() => {
    if (props.livros) {
      const counts = props.livros.reduce((result: CountResult, livro) => {
        const status = livro.status;
        result[status] = (result[status] || 0) + 1;
        return result;
      }, {});

      const data = Object.entries(counts).map(([label, count]) => {
        return { label, count };
      });

      setChartData(data);
    }
  }, [props.livros]);

  function getColorForStatus(status: 'Em andamento' | 'Concluída') {
    const colors = {
      'Em andamento': '#DBB540',
      'Concluída': '#6BC26B',
    };
    return colors[status] || '#000000';
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
                <Cell key={`cell-${index}`} fill={getColorForStatus(entry.label)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Alert>
  );
}
