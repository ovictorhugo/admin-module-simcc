import { useContext, useState } from "react";
import { ResearchItem } from "./researcher-item";
import { UserContext } from "../../../../context/context";

type Research = {
    researcher: any[];
}

export function ResearchersBloco(props: Research) {

    const [count, setCount] = useState(12)
    const {navbar} = useContext(UserContext)
    return(
        <div className={`gap-4 grid ${navbar ? ('grid-cols-2'):('grid-cols-3')}`}>
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
        </div>
    )
}