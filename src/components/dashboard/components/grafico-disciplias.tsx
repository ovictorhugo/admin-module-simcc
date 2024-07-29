import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, AreaChart, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Area } from "recharts";
import { ChartContainer, ChartTooltip,ChartConfig, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface Disciplinas {
    semester: string;
    department: string;
    academic_activity_code: string;
    academic_activity_name: string;
    academic_activity_ch: string;
    demanding_courses: string;
    oft: string;
    id: string;
    available_slots: string;
    occupied_slots: string;
    percent_occupied_slots: string;
    schedule: string;
    language: string;
    researcher: string;
    status: string;
    dep_id:string
    professor:string
}



const chartConfig = {
    available_slots: {
        label: 'Available Slots',
        color: '#82ca9d',
      },
      occupied_slots: {
        label: 'Occupied Slots',
        color: '#8884d8',
      },
  } satisfies ChartConfig;
  

export function GraficoDisciplinas({ disciplinas }: { disciplinas: Disciplinas[] }) {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [selectedProfessor, setSelectedProfessor] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Disciplinas[]>([]);

  useEffect(() => {
    // Filtrar dados com base na disciplina e professor selecionados
    const filtered = disciplinas.filter(d => 
      (selectedDiscipline ? d.academic_activity_name === selectedDiscipline : true) &&
      (selectedProfessor ? d.professor === selectedProfessor : true)
    );
    setFilteredData(filtered);
  }, [selectedDiscipline, selectedProfessor, disciplinas]);

  const uniqueDisciplines = [...new Set(disciplinas.map(d => d.academic_activity_name))];
  const uniqueProfessors = [...new Set(disciplinas.map(d => d.professor))];

  return (
    <div className="grid gap-3 w-full">
      <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
        <SelectTrigger className="">
          <SelectValue placeholder="Selecione a disciplina" />
        </SelectTrigger>
        <SelectContent>
          {uniqueDisciplines.map((discipline) => (
            <SelectItem key={discipline} value={discipline}>{discipline}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedProfessor} onValueChange={setSelectedProfessor}>
        <SelectTrigger className="">
          <SelectValue placeholder="Selecione o professor" />
        </SelectTrigger>
        <SelectContent>
          {uniqueProfessors.map((professor) => (
            <SelectItem key={professor} value={professor}>{professor}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={filteredData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAvailable" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorOccupied" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="semester" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="available_slots" stroke="#82ca9d" fillOpacity={1} fill="url(#colorAvailable)" />
          <Area type="monotone" dataKey="occupied_slots" stroke="#8884d8" fillOpacity={1} fill="url(#colorOccupied)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
