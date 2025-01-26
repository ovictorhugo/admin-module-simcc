import { DataTable } from "../../categorias/researchers-home/data-table";
import { columnsParcicipacaoEvento } from "../../../popup/columns/columns-participacao-eventos";
import { columns } from "../../../popup/columns/columns-articles";

type Articles = {
  articles: any[];
};

export function TableReseracherArticleshome(props: Articles) {
  return (
    <div className="w-full overflow-auto ">
      <div className="rounded-md">
        <div className=" overflow-y-auto max-h-fit h-full ">
          <DataTable columns={columns} data={props.articles} />
        </div>
      </div>
    </div>
  );
}
