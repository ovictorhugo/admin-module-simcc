import { ColumnDef } from "@tanstack/react-table";

import { Button } from "../../../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Export} from "phosphor-react";

//import { UserContext } from "../../../../context/context"

export type Institutions = {
  among: string;
  id: string;
  image: string;
  institution: string;
};

export const columns: ColumnDef<Institutions>[] = [
  {
    accessorKey: "institution",
    header: "Instituição",
  },
  {
    accessorKey: "among",
    header: "Nº Ocorrências",
  }

 
];
