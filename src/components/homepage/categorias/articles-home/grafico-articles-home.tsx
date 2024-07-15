import { useEffect, useState } from "react";
import { Alert } from "../../../ui/alert";
import { BarChart, Bar, XAxis, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../../components/ui/chart";

type Articles = {
  articles: any[];
};

const chartConfig = {
  views: {
    label: "Page Views",
  },
  A1: {
    label: "Qualis A1",
    color: "hsl(var(--chart-1))",
  },
  A2: {
    label: "Qualis A2",
    color: "hsl(var(--chart-2))",
  },
  A3: {
    label: "Qualis A3",
    color: "hsl(var(--chart-3))",
  },
  A4: {
    label: "Qualis A4",
    color: "hsl(var(--chart-4))",
  },
  B1: {
    label: "Qualis B1",
    color: "hsl(var(--chart-5))",
  },
  B2: {
    label: "Qualis B2",
    color: "hsl(var(--chart-6))",
  },
  B3: {
    label: "Qualis B3",
    color: "hsl(var(--chart-7))",
  },
  B4: {
    label: "Qualis B4",
    color: "hsl(var(--chart-8))",
  },
  C: {
    label: "Qualis C",
    color: "hsl(var(--chart-9))",
  },
  SQ: {
    label: "Sem qualis",
    color: "hsl(var(--chart-10))",
  },
} satisfies ChartConfig;

export function GraficoArticleHome(props: Articles) {
  type Qualis = "A1" | "A2" | "A3" | "A4" | "B1" | "B2" | "B3" | "B4" | "B5" | "C" | "SQ" | "NP";

  const [chartData, setChartData] = useState<{ label: string; count: number }[]>([]);

  type CountResult = {
    [label: string]: number;
  };

  useEffect(() => {
    if (props.articles) {
      const counts = props.articles.reduce((result: CountResult, publicacao) => {
        const qualis = publicacao.qualis;
        result[qualis] = (result[qualis] || 0) + 1;
        return result;
      }, {});

      const data = Object.entries(counts).map(([label, count]) => {
        return { label, count };
      });

      const sortedData = data.sort((a, b) => a.label.localeCompare(b.label));

      setChartData(sortedData);
    }
  }, [props.articles]);

  function getColorForInstitution(qualis: Qualis) {
    const colors = {
      A1: '#006837',
      A2: '#8FC53E',
      A3: '#ACC483',
      A4: '#BDC4B1',
      B1: '#F15A24',
      B2: '#F5831F',
      B3: '#F4AD78',
      B4: '#F4A992',
      B5: '#F2D3BB',
      C: '#EC1C22',
      SQ: '#560B11',
      NP: '#560B11',
    };
    return colors[qualis] || '#000000';
  }

  return (
    <Alert className="pt-12">
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="label" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartLegend content={<ChartLegendContent />} />
            <CartesianGrid vertical={false} horizontal={false} />
   
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="count" radius={4}>
              <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorForInstitution(entry.label as Qualis)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Alert>
  );
}
