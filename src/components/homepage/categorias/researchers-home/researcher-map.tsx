type Research = {
    researcher: any[];
}

export function ResearcherMap(props:Research) {
    return(
        <div>
            {props.name}
        </div>
    )
}