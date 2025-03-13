
import { ColumnDef } from "@tanstack/react-table"
import { GraduateProgram } from "./graduate-program";

export const columnsGraduate: ColumnDef<GraduateProgram>[] = [
    {
      accessorKey: "name",
      header: "Nome do programa",
    },
    {
      accessorKey: "type",
      header: "Tipo",
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
    }
   
  ];