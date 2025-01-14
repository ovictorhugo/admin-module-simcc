import { Book, Books, Code, Copyright, Quotes, StripeLogo } from "phosphor-react";
import { Alert } from "../ui/alert";

interface Props {
    among: number,
    articles: number,
    book: number,
    book_chapters: number,
    patent: string,
    software: string,
    brand: string,
}

export function TotalViewResearcher(props: Props) {
    return (

        <div>
            <div className="font-medium text-2xl mb-6 pr-12 text-left">Total de produção científica e técnica</div>
            <div className="gap-4 flex flex-wrap">
                <Alert className="w-fit flex items-center gap-3 pr-6">
                    <Quotes size={16} className="" />
                    <span className="flex flex-col items-start">
                        <p className="font-bold">
                            {props.articles}
                        </p>
                        <div className="text-sm text-gray-500">Artigos</div>
                    </span>
                </Alert>

                <Alert className="w-fit flex items-center gap-3 pr-6">
                    <Book size={16} className="" />
                    <span className="flex flex-col items-start">
                        <div className="flex flex-col items-start">
                            <p className="font-bold">{props.book} </p><div className="text-sm text-gray-500">Livros</div>
                        </div>
                    </span>
                </Alert>

                <Alert className="flex w-fit items-center gap-3 pr-6">
                    <Books size={16} className="" />
                    <span className="flex flex-col items-start">
                        <div className="flex flex-col items-start">
                            <p className="font-bold">{props.book_chapters} </p><div className="text-sm text-gray-500">Capítulos</div>
                        </div>
                    </span>
                </Alert>

                <Alert className="flex w-fit items-center gap-3 pr-6">
                    <Copyright size={16} className="" />
                    <span className="flex flex-col items-start">
                        <div className="flex flex-col items-start">
                            <p className="font-bold">{props.patent} </p><div className="text-sm text-gray-500">Patentes</div>
                        </div>
                    </span>
                </Alert>

                <Alert className="flex w-fit items-center gap-3 pr-6">
                    <StripeLogo size={16} className="" />
                    <span className="flex flex-col items-start">
                        <div className="flex flex-col items-start">
                            <p className="font-bold">{props.brand} </p><div className="text-sm text-gray-500">Marcas</div>
                        </div>
                    </span>
                </Alert>

                <Alert className="flex w-fit items-center gap-3 pr-6">
                    <Code size={16} className="" />
                    <span className="flex flex-col items-start">
                        <div className="flex flex-col items-start">
                            <p className="font-bold">{props.software} </p><div className="text-sm text-gray-500">Softwares</div>
                        </div>
                    </span>
                </Alert>
            </div>
        </div>
    )
}