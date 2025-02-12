import { useContext } from "react";
import { Badge } from "../ui/badge";
import { UserContext } from "../../context/context";
import { Alert } from "../ui/alert";
import { Blocks, Building2, ClipboardEdit, FlaskConical, GraduationCap, Mail, PieChart, SlidersHorizontal, Users, Weight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export function HomeDashboard() {

  const { role, permission, user } = useContext(UserContext)

  const hasBaremaAvaliacao = permission.some(
    (perm) => perm.permission === 'criar_barema_avaliacao'
  );

  const hasNotificacoes = permission.some(
    (perm) => perm.permission === 'enviar_notificacoes'
  );

  const has_visualizar_pesquisadores = permission.some(
    (perm) => perm.permission === 'visualizar_pesquisadores'
  );

  const has_visualizar_todos_departamentos = permission.some(
    (perm) => perm.permission === 'visualizar_todos_departamentos'
  );


  const has_visualizar_todos_programas = permission.some(
    (perm) => perm.permission === 'visualizar_todos_programas'
  );

  const has_visualizar_grupos_pesquisa = permission.some(
    (perm) => perm.permission === 'visualizar_grupos_pesquisa'
  );

  const has_visualizar_inct = permission.some(
    (perm) => perm.permission === 'visualizar_inct'
  );

  const has_editar_pesos_avaliacao = permission.some(
    (perm) => perm.permission === 'editar_pesos_avaliacao'
  );

  const has_visualizar_indicadores_instituicao = permission.some(
    (perm) => perm.permission === 'visualizar_indicadores_instituicao'
  );


  const has_visualizar_gerencia_modulo_administrativo = permission.some(
    (perm) => perm.permission === 'visualizar_gerencia_modulo_administrativo'
  );

  const { version } = useContext(UserContext)

  return (
    <main className="w-full md:p-8 p-4">
      <Helmet>
        <title>Dashboard | Módulo administrativo | {version ? ('Conectee') : ('Iapós')} </title>
        <meta name="description" content={`Dashboard | Módulo administrativo | ${version ? ('Conectee') : ('Iapós')}`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className=" bg-eng-blue rounded-md w-full h-[40vh]  text-white p-8 flex flex-col justify-between">
        <div>
          <Badge className="mb-4 text-eng-blue" variant={'secondary'} >{role}</Badge>
        </div>

        <div>
          <div className=" gap-2">

            <h1 className="max-w-[750px] mb-2 text-lg font-light text-foreground">Olá {user?.display_name}, </h1>
            <h1 className="max-w-[500px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block">Dashboard</h1>

          </div>
          <p className="max-w-[750px] mt-2 text-lg font-light text-foreground"></p>
        </div>
      </div>

      <h3 className="text-2xl font-medium my-4 md:my-8 ">Acesso rápido na plataforma</h3>

      <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2 mgrid-cols-1 2xl:grid-cols-5">
        {has_visualizar_gerencia_modulo_administrativo && (
          <Link to={'/dashboard/administrativo'}>
            <Alert className="h-[80px] hover:bg-neutral-100 text-sm dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center lg:p-8"><div className="flex items-center gap-3 font-medium cursor-pointer">
              <SlidersHorizontal size={16} />Administrativo</div></Alert></Link>
        )}

        {has_visualizar_todos_departamentos && (
          <Link to={'/dashboard/departamentos'}>
            <Alert className="h-[80px] hover:bg-neutral-100 text-sm dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center lg:p-8"><div className="flex items-center gap-3 font-medium cursor-pointer">
              <Building2 size={16} />Departamentos</div></Alert></Link>
        )}

        {has_visualizar_pesquisadores && (
          <Link to={'/dashboard/pesquisadores'}>
            <Alert className="h-[80px] hover:bg-neutral-100 text-sm dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center lg:p-8"><div className="flex items-center gap-3 font-medium cursor-pointer">
              <Users size={16} />Pesquisadores</div></Alert></Link>
        )}


        {has_visualizar_todos_programas && (
          <Link to={'/dashboard/programas'}>
            <Alert className="h-[80px] hover:bg-neutral-100 text-sm dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center lg:p-8"><div className="flex items-center gap-3 font-medium cursor-pointer">
              <GraduationCap size={16} />Programas</div></Alert></Link>
        )}

        {has_visualizar_grupos_pesquisa && (
          <Link to={'/dashboard/grupos-pesquisa'}>
            <Alert className="h-[80px] hover:bg-neutral-100 text-sm dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center lg:p-8"><div className="flex items-center gap-3 font-medium cursor-pointer">
              <Blocks size={16} />Grupos de pesquisa</div></Alert></Link>
        )}

        {has_visualizar_inct && (
          <Link to={'/dashboard/inct'}>
            <Alert className="h-[80px] hover:bg-neutral-100 text-sm dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center lg:p-8"><div className="flex items-center gap-3 font-medium cursor-pointer">
              <FlaskConical size={16} />INCT's</div></Alert></Link>
        )}


        {has_editar_pesos_avaliacao && (
          <Link to={'/dashboard/pesos-avaliacao'}>
            <Alert className="h-[80px] hover:bg-neutral-100 text-sm dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center lg:p-8"><div className="flex items-center gap-3 font-medium cursor-pointer">
              <Weight size={16} />Pesos de avaliação</div></Alert></Link>
        )}

        {has_visualizar_indicadores_instituicao && (
          <Link to={'/dashboard/indicadores'}>
            <Alert className="h-[80px] hover:bg-neutral-100 text-sm dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center lg:p-8"><div className="flex items-center gap-3 font-medium cursor-pointer">
              <PieChart size={16} />Indicadores</div></Alert></Link>
        )}

        {hasBaremaAvaliacao && (
          <Link to={'/dashboard/baremas'}>
            <Alert className="h-[80px] hover:bg-neutral-100 text-sm dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center lg:p-8"><div className="flex items-center gap-3 font-medium cursor-pointer">
              <ClipboardEdit size={16} />Baremas</div></Alert></Link>
        )}

        {hasNotificacoes && (
          <Link to={'/dashboard/enviar-notificacoes'}>
            <Alert className="h-[80px] hover:bg-neutral-100 text-sm dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center lg:p-8"><div className="flex items-center gap-3 font-medium cursor-pointer">
              <Mail size={16} />Enviar notificações</div></Alert></Link>
        )}

      </div>
    </main>
  )
}