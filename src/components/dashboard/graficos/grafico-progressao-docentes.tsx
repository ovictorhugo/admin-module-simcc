import React, { useEffect, useState } from "react";
import { Alert } from "../../ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../components/ui/chart";

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
  line: {
    label: "Progressão",
    color: "#98A8BA",
  },
} satisfies ChartConfig;

export function GraficoProgressaoDocentes({ docentes }: { docentes: Docentes[] }) {
  const [chartData, setChartData] = useState<{ year: string; count: number }[]>([]);

  useEffect(() => {
    const counts: { [key: string]: number } = {};

    docentes.forEach(docente => {
      const year = new Date(docente.progressao).getFullYear().toString();
      counts[year] = (counts[year] || 0) + 1;
    });

    const data = Object.entries(counts)
      .map(([year, count]) => ({
        year,
        count,
      }))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));

    setChartData(data);
  }, [docentes]);

  return (
    <Alert className="p-0 border-0 h-full">
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 20, right: 10, left: 20, bottom: 0 }}>
            <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
           
            <CartesianGrid vertical={false} horizontal={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="count" stroke={chartConfig.line.color} strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Alert>
  );
}
