

import { columns } from "./columns-pos-graduate";

import { DataTable } from "./data-table-pos-graduate";
import { ScrollArea } from "../ui/scroll-area";

type posGraduationsProps = {
  PosGraduationsProps: [];
  };
  

export function TablePosGraduateViewDashboard(props:posGraduationsProps) {
 

  return (
    <div className="w-full overflow-y-auto">
   
      <ScrollArea>
      <div className="  ">
          <DataTable columns={columns} data={props.PosGraduationsProps} />
        </div>
      </ScrollArea>
    
    </div>
  );
}
