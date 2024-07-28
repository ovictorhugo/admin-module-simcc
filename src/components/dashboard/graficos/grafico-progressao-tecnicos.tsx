import React, { useEffect, useState } from "react";
import { Alert } from "../../ui/alert";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../components/ui/chart";

interface Docentes {
  cargo:string
  classe:string
  data_prog:string
  deno_sit:string
  detalhe_setor:string
  dting_org:string
  genero:string
  ins_ufmg:string
  matric:string
  nivel:string
  nome:string
  ref:string
  rt:string
  semester:string
  setor:string
  titulacao:string
}

const chartConfig = {
  line: {
    label: "Progressão",
    color: "#98A8BA",
  },
};

export function GraficoProgressaoTecnicos({ docentes }: { docentes: Docentes[] }) {
  const [chartData, setChartData] = useState<{ year: string; count: number }[]>([]);

  useEffect(() => {
    if (!Array.isArray(docentes)) {
      console.error("The 'docentes' prop is not an array:", docentes);
      return;
    }

    const counts: { [key: string]: number } = {};

    docentes.forEach(docente => {
      const date = new Date(docente.data_prog);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear().toString();
        counts[year] = (counts[year] || 0) + 1;
      }
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
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="count" stroke={chartConfig.line.color} strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Alert>
  );
}
