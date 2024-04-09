import { useContext } from "react";
import { CategoriasItemHome } from "./categorias-item-home";
import { Buildings, File, User } from "phosphor-react";
import { UserContext } from "../../context/context";
import { useModalResult } from "../hooks/use-modal-result";

export function CategoriasPesquisaHome() {

    const {searchType} = useContext(UserContext)
    const { type, onOpen} = useModalResult();
  
  
    return (
        <div className="flex items-center gap-2 my-6 p-2 border border-gray-300 dark:border-stone-700 rounded-full">
            <div onClick={() => onOpen('researchers-home')}><CategoriasItemHome  on={type === 'researchers-home' ? (true):(false)} type={searchType}  title="Pesquisadores"><User size={16} className="" /></CategoriasItemHome></div>
            <div onClick={() => onOpen('articles-home')}><CategoriasItemHome  on={type === 'articles-home' ? (true):(false)}  type={searchType} title="Publicações"><File size={16} className="" /></CategoriasItemHome></div>
            <div onClick={() => onOpen('institutions-home')}><CategoriasItemHome  on={type === 'institutions-home'}  type={searchType} title="Instituições"><Buildings size={16} className="" /></CategoriasItemHome></div>
        </div>
    )
}