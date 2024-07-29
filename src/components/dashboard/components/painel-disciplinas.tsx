import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";
import { Label } from "../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { BarChart, Bar, XAxis, AreaChart, YAxis, LabelList, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Area } from "recharts";
import { ChartContainer, ChartTooltip,ChartConfig, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../components/ui/chart";
import { GraficoDisciplinas } from "./grafico-disciplias";

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
  

export function PainelDisciplinas() {
      ///
      const [data, setData] = useState<Disciplinas[]>([]);

      const {urlGeralAdm} = useContext(UserContext)

      let urlDisciplinas = urlGeralAdm + `departamentos/disciplinas`
  
      console.log(urlDisciplinas)
  
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(urlDisciplinas , {
              mode: "cors",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "3600",
                "Content-Type": "text/plain",
              },
            });
            const data = await response.json();
            if (data) {
                setData(data)
            }
          } catch (err) {
            console.log(err);
          }
        };
        fetchData()
  
      }, [urlDisciplinas]);
  
      console.log(data)
      
 
      
    const [selectedDiscipline, setSelectedDiscipline] = useState<string>('');
  const [selectedProfessor, setSelectedProfessor] = useState<string>('');
  const [filteredData, setFilteredData] = useState<Disciplinas[]>([])

  useEffect(() => {
    // Filter data based on selectedDiscipline and selectedProfessor
    const filtered = data.filter(d => 
      (selectedDiscipline ? d.academic_activity_name === selectedDiscipline : true) &&
      (selectedProfessor ? d.researcher === selectedProfessor : true)
    );
    setFilteredData(filtered);
  }, [selectedDiscipline, selectedProfessor, data]);

  const uniqueDisciplines = [...new Set(data.map(d => d.academic_activity_name))];
  const uniqueProfessors = [...new Set(data.map(d => d.researcher))];


    return(
            <div>
                  <GraficoDisciplinas disciplinas={data}/>
            </div>
    )
}