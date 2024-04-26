import { useContext, useState } from "react";

import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Button } from "../ui/button";
import { Plus } from "phosphor-react";
import { UserContext } from "../../context/context";
import { useModalSidebar } from "../hooks/use-modal-sidebar";
import { ArticleItem } from "../homepage/categorias/articles-home/article-item";

type Articles = {
    articles: any[];
    distinct: boolean
}


export function BookBlockPopUp(props:Articles) {
    const {navbar} = useContext(UserContext)
    const [count, setCount] = useState(12)

    const {isOpen} = useModalSidebar()

    return(
       <div>
         <ResponsiveMasonry
    columnsCountBreakPoints={{
        350: 1,
        750: 1,
        900: 2,
        1200: 3,
    }}
>
                 <Masonry gutter="16px">
{props.articles.slice(0, count).map((props: any) => {

        return (
            <BookItem
            id={props.id}
            title={props.title}
            year={props.year}
            isbn= {props.isbn}
            publishing_company= {props.publishing_company}

        />
        );
        })}
        </Masonry>
        </ResponsiveMasonry>

        {props.articles.length >= count && (
            <div className="w-full flex justify-center mt-8"><Button onClick={() => setCount(count + 12)}><Plus size={16} />Mostrar mais</Button></div>
        )}

       </div>
    )
}