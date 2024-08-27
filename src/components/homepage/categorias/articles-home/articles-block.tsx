import { useContext, useState } from "react";
import { useModalSidebar } from "../../../hooks/use-modal-sidebar";
import { UserContext } from "../../../../context/context";
import { ArticleItem } from "./article-item";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Button } from "../../../ui/button";
import { Plus } from "phosphor-react";

type Articles = {
    articles: any[];
    distinct: boolean
}


export function ArticleBlock(props:Articles) {
    const {navbar} = useContext(UserContext)
    const [count, setCount] = useState(12)

    const {isOpen} = useModalSidebar()

    return(
       <div>
         <ResponsiveMasonry
    columnsCountBreakPoints={{
        350: 1,
        750: 2,
        900: 3,
        1200: navbar || isOpen ? 3 : 4
    }}
>
                 <Masonry gutter="16px">
{props.articles.slice(0, count).map((props: any) => {

        return (
            <ArticleItem
            id={props.id}
                    doi={props.doi}
                    name_periodical={props.name_periodical}
                    qualis={props.qualis}
                    title={props.title.toUpperCase()}
                    year={props.year}
                    color={props.color}
                    researcher={props.researcher}
                    lattes_id={props.lattes_id}
                    magazine={props.magazine}
                    lattes_10_id={props.lattes_10_id}
                    jcr_link={props.jcr_link}
                    jif={props.jif}
                    researcher_id={props.researcher_id}
                    distinct={props.distinct}
                    abstract={props.abstract}
                    article_institution={props.article_institution}
                    authors={props.authors}
                    authors_institution={props.authors_institution}
                    citations_count={props.citations_count}
                    issn={props.issn}
                    keywords={props.keywords}
                    landing_page_url={props.landing_page_url}
                    language={props.language}
                    pdf={props.pdf}
            />
        );
        })}
        </Masonry>
        </ResponsiveMasonry>

        {props.articles.length > count && (
            <div className="w-full flex justify-center mt-8"><Button onClick={() => setCount(count + 12)}><Plus size={16} />Mostrar mais</Button></div>
        )}

       </div>
    )
}