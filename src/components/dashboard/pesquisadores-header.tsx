import { AddResearcherDashboard } from "./add-researcher-dashboard";

export function PesquisadoresHeader() {
    return (
        <div className="flex items-center gap-6 w-full">
            <div>
            <h1 className=" text-3xl mb-4  font-medium max-w-[380px] ">
          Página de cadastro <strong className="bg-red-700 font-medium text-white"> pesquisadores </strong>{" "}
      </h1>
      <p className="mt-2 max-w-[420px] text-gray-500 dark:text-gray-300">Cadastre, edite e remova pesquisadores e programa de pós-graduações no módulo administrativo</p>
            </div>
             <AddResearcherDashboard/>
        </div>
    )
}