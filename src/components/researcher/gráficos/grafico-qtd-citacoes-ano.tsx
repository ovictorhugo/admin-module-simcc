import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { UserContext } from "../../../context/context";
import { ChartContainer } from "../../ui/chart";

type Dados = {
  id: string;
};

type ChartDataItem = {
  year: string; // Ano
  citations: number; // Número de citações
};

// Configuração mínima para o ChartContainer
const chartConfig = {
  Citacao: {
    label: "Citações por Ano",
    color: "#00bcd4", // Cor das barras
  }
};

export function GraficoQtdCitacoesAno(props: Dados) {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  const { urlGeral } = useContext(UserContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const resposta = await fetch(urlGeral + `researcher/${props.id}/article_metrics`, {
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
            "Content-Type": "text/plain",
          },
        });

        if (!resposta.ok) {
          throw new Error("Erro na resposta do servidor");
        }

        const dados = await resposta.json();
        setChartData(dados);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [props.id, urlGeral]);

  useEffect(() => {
    if (props.id) {
      // Mapeia e soma as citações por ano
      const countsMap: { [year: string]: number } = {};

      //props.artigos.forEach((publicacao) => {
      //  const year = publicacao.year ? publicacao.year.toString() : "Unknown"; // Ano da publicação
      //  const citations = publicacao.citations || 0; // Número de citações (default: 0)
      //
      //  // Acumula as citações no mapa
      //  countsMap[year] = (countsMap[year] || 0) + citations;
      //});

      // Transforma o mapa em um array e ordena por ano
      const data = Object.entries(countsMap)
        .map(([year, citations]) => ({ year, citations }))
        .sort((a, b) => a.year.localeCompare(b.year));

      setChartData(data); // Atualiza os dados do gráfico
    }
  }, [props.id]);

  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full">
      <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <Tooltip cursor={false} />
          <Bar dataKey="citations" fill={chartConfig.Citacao.color} radius={[4, 4, 0, 0]} barSize={40}>
            <LabelList
              dataKey="citations"
              position="top"
              fontSize={12}
              className="fill-foreground"
              formatter={(value) => (value ? value.toString() : "0")}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
