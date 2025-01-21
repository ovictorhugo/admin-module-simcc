import { columnsProjetoPesquisa } from "./columns-projetos-pesquisa";
import { DataTable } from "./popup-data-table";

type ProjetosPesquisa = {
  projetos: any[];
};

export function TableReseracherProject(props: ProjetosPesquisa) {
  return (
    <div className="w-full overflow-auto ">
      <div className="rounded-md">
        <div className=" overflow-y-auto max-h-fit h-full ">
          <DataTable columns={columnsProjetoPesquisa} data={props.projetos} />
        </div>
      </div>
    </div>
  );
}
