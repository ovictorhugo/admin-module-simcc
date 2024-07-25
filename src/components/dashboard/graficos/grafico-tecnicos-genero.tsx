import React, { useEffect, useState } from "react";
import { Alert } from "../../ui/alert";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Label } from "recharts";
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent } from "../../../components/ui/chart";

interface Docentes {
    matric: string;
    insUFMG: string;
    nome: string;
    genero: string;
    denoSit: string;
    rt: string;
    classe: string;
    cargo: string;
    nivel: string;
    ref: string;
    titulacao: string;
    setor: string;
    detalheSetor: string;
    dtIngOrg: string;
    dataProg: string;
    year_charge: string;
    semester: string;
}

const chartConfig = {
  MASCULINO: {
    label: "Masculino",
    color: "#5F82ED",
  },
  FEMININO: {
    label: "Feminino",
    color: "#D15697",
  },
} satisfies ChartConfig;

export function GraficoTecnicosGenero({ docentes }: { docentes: Docentes[] }) {
  const [chartData, setChartData] = useState<{ genero: string; count: number }[]>([]);

  useEffect(() => {
    const counts: { [key: string]: number } = {};

    docentes.forEach(docente => {
      const genero = docente.genero;
      counts[genero] = (counts[genero] || 0) + 1;
    });

    const data = Object.entries(counts).map(([genero, count]) => ({
      genero,
      count,
    }));

    setChartData(data);
  }, [docentes]);

  function getColorForGenero(genero: string) {
    const colors = {
      "MASCULINO": chartConfig.MASCULINO.color,
      "FEMININO": chartConfig.FEMININO.color,
    };
    return colors[genero] || '#000000';
  }

  const totalDocentes = chartData.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <Alert className="p-0 border-0 h-full">
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" nameKey="genero" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalDocentes.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Docentes
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorForGenero(entry.genero)} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Alert>
  );
}
