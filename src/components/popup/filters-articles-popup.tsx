import { useMemo, useState } from "react";
import { Alert } from "../ui/alert";

import { CalendarBlank, CheckSquare } from "phosphor-react";
import { Slider } from "../ui/slider";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,

  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";

interface Props {
  onFilterUpdate: (newResearcher: Filter[]) => void;
}

type Filter = {
  year: number[];
  qualis: any[];
};

export function FilterArticlePopUp(props: Props) {
  const qualisColor: { [key: string]: string } = {
    A1: "bg-[#006837]",
    A2: "bg-[#8FC53E]",
    A3: "bg-[#ACC483]",
    A4: "bg-[#BDC4B1]",
    B1: "bg-[#F15A24]",
    B2: "bg-[#F5831F]",
    B3: "bg-[#F4AD78]",
    B4: "bg-[#F4A992]",
    C: "bg-[#EC1C22]",
    SQ: "bg-[#560B11]",
    NP: "bg-[#560B11]",
  };

  const [qualis] = useState([
    { id: 1, itens: "A1" },
    { id: 2, itens: "A2" },
    { id: 3, itens: "A3" },
    { id: 4, itens: "A4" },
    { id: 5, itens: "B1" },
    { id: 6, itens: "B2" },
    { id: 7, itens: "B3" },
    { id: 8, itens: "B4" },
    { id: 10, itens: "C" },
    { id: 11, itens: "SQ" },
  ]);

  const [itensSelecionados, setItensSelecionados] = useState<string[]>([]);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const [filterYear, setFilterYear] = useState([1990]);
  type CheckboxStates = {
    [index: number]: boolean;
  };

  console.log(itensSelecionados);

  const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>( {});

  const handleCheckboxChangeInput = (itemId: number, isChecked: boolean) => {
    setCheckboxStates((prevStates) => ({ ...prevStates, [itemId]: isChecked }));

    setItensSelecionados((prevSelecionados) => {
      const selectedQualis = qualis.find((q) => q.id === itemId);
      if (selectedQualis) {
        if (isChecked) {
          return [...prevSelecionados, selectedQualis.itens];
        } else {
          return prevSelecionados.filter((item) => item !== selectedQualis.itens);
        }
      } else {
        // handle the case where selectedQualis is undefined
        return prevSelecionados;
      }
    });
  };

  const updateResearcher = (newResearcher: Filter[]) => {
    if (props.onFilterUpdate) {
      props.onFilterUpdate(newResearcher);
    }
  };

  const filtros = {
    year: filterYear,
    qualis: itensSelecionados,
  };

  useMemo(() => {
    updateResearcher([filtros]);
  }, [filterYear, itensSelecionados]);

  console.log('ED',itensSelecionados)

  return (
    <div className="mb-6 flex gap-6">
      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-4 ">
          <CheckSquare size={24} className="text-gray-400" />
          <p className="text-sm font-bold">Selecione o Qualis</p>
        </div>
        <Alert className="w-full">
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full  justify-start font-normal min-w-[220px]">
                {itensSelecionados.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {itensSelecionados.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <div className={`rounded-sm h-4 w-4 ${qualisColor[item]}`}></div>
                        {item}
                      </div>
                    ))}
                  </div>
                ) : (
                  "Escolha o Qualis dos artigos"
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
             

              {qualis.map((quali) => (
                <DropdownMenuCheckboxItem
                  key={quali.id}
                  checked={checkboxStates[quali.id] || false}
                  onCheckedChange={(isChecked) =>
                    handleCheckboxChangeInput(quali.id, isChecked as boolean)
                  }
                >
                  <div className="flex gap-4 items-center">
                    <div className={`flex rounded-sm h-4 w-4 ${qualisColor[quali.itens]}`}></div>
                    {quali.itens}
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </Alert>
      </div>

      <div className="w-full flex flex-1 flex-col">
        <div className="flex items-center gap-3 mb-4 ">
          <CalendarBlank size={24} className="text-gray-400" />
          <p className="text-sm font-bold">Selecione o ano</p>
        </div>
        <Alert className="w-full flex items-center gap-2 h-full">
          <Slider
            defaultValue={filterYear}
            onValueChange={(value) => setFilterYear(value)}
            max={year}
            min={1990}
            step={1}
            className="eng-blue"
          ></Slider>
          <p className="text-sm font-bold">{filterYear}</p>
        </Alert>
      </div>
    </div>
  );
}
