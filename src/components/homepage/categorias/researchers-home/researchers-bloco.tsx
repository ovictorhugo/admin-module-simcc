import { useContext, useState } from "react";
import { ResearchItem } from "./researcher-item";
import { UserContext } from "../../../../context/context";
import { useModalSidebar } from "../../../hooks/use-modal-sidebar";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Button } from "../../../ui/button";
import { Plus } from "phosphor-react";

type Research = {
    researcher: any[];
}

export function ResearchersBloco(props: Research) {

    const [count, setCount] = useState(12)
    const {navbar, mapModal} = useContext(UserContext)

    const {isOpen} = useModalSidebar()

    return(
       <div className="">
       <ResponsiveMasonry
    columnsCountBreakPoints={{
        350: 1,
        750: 2,
        900: 3,
        1200: navbar || isOpen || mapModal ? 2 : ((navbar && mapModal) || (isOpen && mapModal)) ? 1 : 3
    }}
>

                     <Masonry gutter="16px">
             {props.researcher.slice(0, count).map((item: any) => {

                return (
                    <ResearchItem
                    among={item.among}
                    articles={item.articles}
                    book={item.book}
                    book_chapters={item.book_chapters}
                    id={item.id}
                    name={item.name}
                    university={item.university}
                    lattes_id={item.lattes_id}
                    area={item.area}
                    lattes_10_id={item.lattes_10_id}
                    city={item.city}
                    graduation={item.graduation}
                    patent={item.patent}
                    speaker={item.speaker}
                    />
                );
            })}
        </Masonry>
        </ResponsiveMasonry>

        {props.researcher.length >= count && (
            <div className="w-full flex justify-center mt-8"><Button onClick={() => setCount(count + 12)}><Plus size={16} />Mostrar mais</Button></div>
        )}
       </div>
    )
}