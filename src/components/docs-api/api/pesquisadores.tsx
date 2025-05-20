import { Alert } from "../../ui/alert";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { UserContext } from "../../../context/context";
import { Home } from "lucide-react";
import { useContext } from "react";
import { getVersion } from "../../../gerVersion";
import bg_popup from "../../../assets/bg_home.png";

export function Pesquisadores() {
  const { version } = useContext(UserContext);
  const platform = version ? "Conectee" : "Simcc";
  const version2 = getVersion();

  return (
    <main className="p-4 md:p-8 bg-neutral-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-[936px] mx-auto space-y-8">
        {/* Header */}
        <Alert className="p-0">
          <div className="flex border-0 rounded-b-none justify-between items-center bg-neutral-100 dark:bg-neutral-800 p-4 md:p-6 rounded-md">
            <span className="text-base font-medium text-gray-600 dark:text-gray-300">
              Informações - Pesquisadores
            </span>
            <Link to="/">
              <Button variant="outline">
                <Home size={16} className="mr-2" />
                Página Inicial
              </Button>
            </Link>
          </div>

          {/* Banner Hero */}
          <div
            className="p-8 rounded-t-none md:p-12 bg-cover bg-center rounded-md"
            style={{ backgroundImage: `url(${bg_popup})` }}
          >
            <h1 className="text-4xl font-bold mb-2">
              Plataforma {platform}
            </h1>
            <p className="text-sm font-light">
              Versão da plataforma: {version2}
            </p>
          </div>
        </Alert>

        {/* Sobre os Pesquisadores no SIMCC */}
        <Alert className="space-y-4 p-8">
          <h2 className="text-2xl font-semibold">Sobre os Pesquisadores no SIMCC</h2>
          <p>
            No SIMCC, os pesquisadores são apresentados de forma estruturada, com um perfil completo que reúne sua produção técnica e científica, suas áreas de atuação e indicadores atualizados. A plataforma centraliza dados de diversas fontes e oferece uma visão ampla e qualificada da atuação dos pesquisadores vinculados a instituições da Bahia.
          </p>
        </Alert>

        {/* Informações Disponíveis no Perfil do Pesquisador */}
        <Alert className="space-y-4 p-8">
          <h2 className="text-2xl font-semibold">Informações Disponíveis no Perfil do Pesquisador</h2>
          <p>
            Cada pesquisador possui um perfil individual com:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><strong>Resumo do Currículo Lattes</strong></li>
            <li><strong>Participação em grupos de pesquisa</strong></li>
            <li><strong>Participação em programas de pós-graduação</strong></li>
            <li><strong>Índices de produção científica:</strong> como H, 10H, ORCID e SCOPUS (quando disponíveis)</li>
            <li><strong>Temas mais recorrentes em sua produção</strong></li>
            <li><strong>Lista de coautores e rede de colaborações</strong></li>
          </ul>
          <p className="mt-3">
            Essas informações permitem identificar áreas de especialidade e caminhos de atuação dentro da comunidade científica.
          </p>
        </Alert>

        {/* Indicadores de Formação e Atuação */}
        <Alert className="space-y-4 p-8">
          <h2 className="text-2xl font-semibold">Indicadores de Formação e Atuação</h2>
          <p>
            O SIMCC organiza dados sobre a formação acadêmica dos pesquisadores, destacando os diferentes níveis de titulação (graduação, especialização, mestrado, doutorado). Além disso, a plataforma também apresenta a distribuição por áreas de conhecimento, com base nos dados informados na Plataforma Lattes.
          </p>
          <p className="mt-3">
            Esses gráficos permitem compreender como o corpo de pesquisadores está distribuído nas diferentes áreas e níveis de formação.
          </p>
        </Alert>

        {/* Atualização e Acompanhamento dos Currículos */}
        <Alert className="space-y-4 p-8">
          <h2 className="text-2xl font-semibold">Atualização e Acompanhamento dos Currículos</h2>
          <p>
            Outro aspecto monitorado é o tempo desde a última atualização do Currículo Lattes dos pesquisadores. A plataforma oferece filtros que indicam quem mantém seu perfil atualizado com frequência, fornecendo maior confiança e relevância aos dados apresentados.
          </p>
        </Alert>

        {/* Localização e Distribuição Territorial */}
        <Alert className="space-y-4 p-8">
          <h2 className="text-2xl font-semibold">Localização e Distribuição Territorial</h2>
          <p>
            Os pesquisadores estão georreferenciados no SIMCC, o que permite visualizar sua distribuição territorial no mapa da Bahia. Isso possibilita:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Identificar polos de conhecimento em diferentes regiões</li>
            <li>Apoiar a descentralização da pesquisa</li>
            <li>Facilitar o contato regional entre pesquisadores</li>
          </ul>
        </Alert>

        {/* Buscas Inteligentes e Descoberta de Competências */}
        <Alert className="space-y-4 p-8">
          <h2 className="text-2xl font-semibold">Buscas Inteligentes e Descoberta de Competências</h2>
          <p>
            Com o uso de operadores booleanos e processamento de linguagem natural, o SIMCC permite localizar pesquisadores com base em:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Termos temáticos da produção científica</li>
            <li>Localização geográfica</li>
            <li>Área de conhecimento</li>
            <li>Participação em projetos ou grupos</li>
          </ul>
          <p className="mt-3">
            Isso fortalece a capacidade de formar redes, iniciar colaborações e descobrir novas competências.
          </p>
        </Alert>

        {/* Análises Coletivas e Estratégicas */}
        <Alert className="space-y-4 p-8">
          <h2 className="text-2xl font-semibold">Análises Coletivas e Estratégicas</h2>
          <p>
            Além da visualização individual, o sistema permite análises agregadas por:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><strong>Titulação</strong></li>
            <li><strong>Área de atuação</strong></li>
            <li><strong>Frequência de atualização de currículo</strong></li>
            <li><strong>Presença em bases como ORCID e SCOPUS</strong></li>
          </ul>
          <p className="mt-3">
            Essas análises são fundamentais para coordenadores de programas, gestores públicos e instituições que precisam conhecer o perfil científico da Bahia de forma ampla e estruturada.
          </p>
        </Alert>

        {/* Pesquisadores como Protagonistas do Conhecimento */}
        <Alert className="space-y-4 p-8">
          <h2 className="text-2xl font-semibold">Pesquisadores como Protagonistas do Conhecimento</h2>
          <p>
            Toda a estrutura do SIMCC valoriza o pesquisador como protagonista da produção científica e tecnológica. A plataforma não apenas exibe dados, mas organiza e conecta essas informações de forma que ampliem o reconhecimento, a colaboração e a tomada de decisão com base em evidências.
          </p>
        </Alert>

        {/* Documentação da API de Pesquisadores */}
        <Alert className="space-y-4 p-8">
          <h2 className="text-2xl font-semibold">Documentação da API de Pesquisadores</h2>

          <div className="space-y-4">
            {/* Endpoint */}
            <div>
              <h3 className="font-semibold">Utilize o endpoint abaixo para consultar pesquisadores:</h3>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
                GET https://conectee.eng.ufmg.br/api/researcherName?name=...
              </code>
            </div>

            {/* Filtros Disponíveis */}
            <div>
              <h3 className="font-semibold">Filtros Disponíveis</h3>
              <table className="w-full table-auto border-collapse mt-2 text-sm">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="border px-4 py-2 text-left">Nome do Parâmetro</th>
                    <th className="border px-4 py-2 text-left">Tipo</th>
                    <th className="border px-4 py-2 text-left">Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="border px-4 py-2">name</td>
                    <td className="border px-4 py-2">string</td>
                    <td className="border px-4 py-2">Nome ou parte do nome do pesquisador (pode ser múltiplo, separados por |)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Exemplo de Requisição */}
            <div>
              <h3 className="font-semibold">Exemplo de Requisição</h3>
              <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
                GET https://conectee.eng.ufmg.br/api/researcherName?name=joao|maria
              </code>
            </div>

            {/* Campos Retornados na Resposta */}
            <div>
              <h3 className="font-semibold">Campos Retornados na Resposta</h3>
              <p className="text-sm text-gray-500 mb-2">
                A resposta é um array de objetos, cada um representando um pesquisador. Os principais campos retornados são:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="border px-4 py-2 text-left">Campo</th>
                      <th className="border px-4 py-2 text-left">Tipo</th>
                      <th className="border px-4 py-2 text-left">Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">id</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Identificador único do pesquisador</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">researcher_id</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Identificador do pesquisador (pode ser igual ao id ou diferente)</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">name</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Nome completo do pesquisador</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">university</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Universidade/instituição</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">lattes_id</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">ID Lattes</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">lattes_10_id</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">ID Lattes 10</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">orcid</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">ORCID</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">image</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">URL da imagem do pesquisador</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">graduation</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Formação</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">area</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Área de atuação</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">city</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Cidade</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">abstract</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Resumo</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">patent</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Patentes</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">software</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Softwares</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">brand</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Marcas</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">lattes_update</td><td className="border px-4 py-2">Date</td><td className="border px-4 py-2">Data de atualização do Lattes</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">entradanaufmg</td><td className="border px-4 py-2">Date</td><td className="border px-4 py-2">Data de entrada na UFMG</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">genero</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Gênero</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">h_index</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Índice H</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">relevance_score</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Score de relevância</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">works_count</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Total de trabalhos</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">cited_by_count</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Total de citações</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">i10_index</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Índice i10</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">scopus</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Scopus ID</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">openalex</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">OpenAlex ID</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">classification</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Classificação</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">institution_id</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">ID da instituição</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">status</td><td className="border px-4 py-2">boolean</td><td className="border px-4 py-2">Status do pesquisador (ativo/inativo)</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">subsidy</td><td className="border px-4 py-2">array</td><td className="border px-4 py-2">Bolsas (detalhes no objeto Bolsistas)</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">graduate_programs</td><td className="border px-4 py-2">array</td><td className="border px-4 py-2">Programas de pós-graduação</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">departments</td><td className="border px-4 py-2">array</td><td className="border px-4 py-2">Departamentos</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">research_groups</td><td className="border px-4 py-2">array</td><td className="border px-4 py-2">Grupos de pesquisa</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">relevance_itens</td><td className="border px-4 py-2">number</td><td className="border px-4 py-2">Itens de relevância</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">cargo</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Cargo</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">clas</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Classificação</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">classe</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Classe</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">rt</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">RT</td></tr>
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-800"><td className="border px-4 py-2">situacao</td><td className="border px-4 py-2">string</td><td className="border px-4 py-2">Situação</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Observação: Alguns campos podem ser arrays de objetos com estrutura própria, como <strong>subsidy</strong>, <strong>graduate_programs</strong>, <strong>departments</strong> e <strong>research_groups</strong>.
              </p>
            </div>
          </div>
        </Alert>
      </div>
    </main>
  );
}