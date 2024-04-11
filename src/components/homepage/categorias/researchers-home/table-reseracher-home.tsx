import { Alert } from "../../../ui/alert";
import { columns } from "./columns";

import { DataTable } from "./data-table";

type Research = {
    researcher: any[];
}


export function TableReseracherhome(props:Research){

    return (
        <div className="w-full overflow-auto ">
        <Alert className=" overflow-y-auto elementBarra">
        <div className=" overflow-y-auto max-h-fit h-full elementBarra pr-2">
            <DataTable columns={columns} data={props.researcher} />
          </div>
        </Alert>
      </div>
    
)
}