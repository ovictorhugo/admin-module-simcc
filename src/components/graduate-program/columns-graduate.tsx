
import { ColumnDef } from "@tanstack/react-table"
import { GraduateProgram } from "./graduate-program";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export const columnsGraduate: ColumnDef<GraduateProgram>[] = [
  {
    accessorKey: "acronym",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sigla
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
      accessorKey: "name",
      header: "Nome do programa",
    },
    {
      accessorKey: "type",
      header: "Tipo",
    },
    {
      accessorKey: "modality",
      header: "Modalidade",
    },
    {
      accessorKey: "area",
      header: "Área",
    },
    {
      accessorKey: "city",
      header: "Cidade",
    },
    {
      accessorKey: "institution",
      header: "Instituição",
    },
    {
      accessorKey: "rating",
      header: "Nota",
    }
   
  ];