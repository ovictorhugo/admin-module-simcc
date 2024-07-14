import { useContext, useEffect, useState } from "react";
import { useModalHomepage } from "../hooks/use-modal-homepage";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, Info, Rows } from "lucide-react";
import { SelectTypeSearch } from "../search/select-type-search";
import { Input } from "../ui/input";
import { MagnifyingGlass } from "phosphor-react";
import { UserContext } from "../../context/context";

interface Post {
    frequency: string;
    term: string;
    checked: boolean;
    area_expertise: string;
    area_specialty: string;
}

export function Dicionario() {
    const { onClose, isOpen, type: typeModal } = useModalHomepage();
    const isModalOpen = (isOpen && typeModal === 'dicionario');

    const [words, setWords] = useState<Post[]>([]);
    const [pesquisaInput, setPesquisaInput] = useState('');
    const { searchType, urlGeral, setItensSelecionados } = useContext(UserContext);

    const pesquisaInputFormatado = pesquisaInput.trim().replace(/\s+/g, ";");

    let urlTerms = urlGeral + `/originals_words?initials=&type=ARTICLE`;

    if (searchType === 'name') {
        urlTerms = urlGeral + `/originals_words?initials=${pesquisaInputFormatado}&type=ARTICLE`;
      } else if (searchType === 'article') {
        urlTerms = urlGeral + `/originals_words?initials=${pesquisaInputFormatado}&type=ARTICLE`;
      } else if (searchType === 'book') {
        urlTerms = urlGeral + `/originals_words?initials=${pesquisaInputFormatado}&type=ARTICLE`;
      } else if (searchType === 'area') {
        urlTerms = urlGeral + `/originals_words?initials=${pesquisaInputFormatado}&type=ARTICLE`;
      } else if (searchType === 'speaker') {
        urlTerms = urlGeral + `/originals_words?initials=${pesquisaInputFormatado}&type=ARTICLE`;
      } else if (searchType === 'patent') {
        urlTerms = urlGeral + `/originals_words?initials=${pesquisaInputFormatado}&type=ARTICLE`;
      } else if (searchType === 'abstract') {
        urlTerms = urlGeral + `/originals_words?initials=${pesquisaInputFormatado}&type=ARTICLE`;
      }

    useEffect(() => {
        fetch(urlTerms, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600',
                'Content-Type': 'text/plain'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const newData = data.map((post: Post) => ({
                    ...post,
                    term: post.term
                }));

                setWords(newData);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [urlTerms]);

    const groupedWords = words.reduce((acc, word) => {
        const firstLetter = word.term[0].toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(word);
        return acc;
    }, {} as { [key: string]: Post[] });

    const navigate = useNavigate();

    function handlePesquisaChange(term: string) {
        setItensSelecionados([{ term }]);

        navigate(`/resultados?type_search=${searchType}&terms=${term}`)

      }
    

    return (
        <>
            {isModalOpen && (
                <main className="flex  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                    <div>
                        <Link to={''} className="inline-flex items-center rounded-lg bg-neutral-100 dark:bg-neutral-700 gap-2 mb-3 px-3 py-1 text-sm font-medium">
                            <Info size={12} />
                            <div className="h-full w-[1px] bg-neutral-200 dark:bg-neutral-800"></div>
                            Saiba como utilizar a plataforma
                            <ArrowRight size={12} />
                        </Link>

                        <h1 className="max-w-[900px] text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] md:block mb-3">
                            Dicionário de{" "}
                            <strong className="bg-[#709CB6] rounded-md px-3 pb-2 text-white font-medium">
                                termos
                            </strong>{" "}
                            de busca
                        </h1>
                        <p className="max-w-[750px] text-lg font-light text-foreground">
                            Pesquise termos para auxiliar o seu filtro na plataforma
                        </p>
                        <div className="flex gap-3 mt-3">
                            <div className="flex gap-3 items-center w-full max-w-[550px] rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-400">
                                <MagnifyingGlass size={16} className="whitespace-nowrap w-10" />
                                <SelectTypeSearch />
                                <Input className="border-0 p-0 h-9 flex flex-1" value={pesquisaInput} onChange={(e) => setPesquisaInput(e.target.value)} />
                            </div>
                        </div>
                    </div>

                   <div className={`grid pb-8  gap-6 ${pesquisaInput.length != 0 ? ('grid-cols-1'):('grid-cols-3')}`}>
                   {Object.keys(groupedWords).sort().map((letter) => (
                        <div key={letter}>
                            <div className="flex gap-3 mb-3 items-center">
                                <Rows size={16} />
                                <h3 className="font-bold text-2xl">{letter}</h3>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {groupedWords[letter].map((word, index) => (
                                    <div
                                        key={index}
                                        className={`flex gap-2 capitalize h-8 cursor-pointer transition-all bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-900 dark:bg-neutral-800 items-center p-2 px-3 rounded-md text-xs`}
                                    onClick={() => {
                                        handlePesquisaChange(word.term)
                                    }}
                                    >
                                        {word.term}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                   </div>
                </main>
            )}
        </>
    );
}
