import { useMemo, useState } from "react";
import { Alert } from "../ui/alert";
import { Label } from "../ui/label";
import { CalendarBlank, CheckSquare } from "phosphor-react";
import { Slider } from "../ui/slider";

interface Props {
    onFilterUpdate: (newResearcher: Filter[]) => void;
}

type Filter = {
    year: number[]
    qualis: string[]
}

export function FilterArticlePopUp(props:Props) {
    const qualisColor: { [key: string]: string } = {
        'A1': 'bg-[#006837]',
        'A2': 'bg-[#8FC53E]',
        'A3': 'bg-[#ACC483]',
        'A4': 'bg-[#BDC4B1]',
        'B1': 'bg-[#F15A24]',
        'B2': 'bg-[#F5831F]',
        'B3': 'bg-[#F4AD78]',
        'B4': 'bg-[#F4A992]',
        'C': 'bg-[#EC1C22]',
        'SQ': 'bg-[#560B11]',
        'NP': 'bg-[#560B11]'
      }


    const [qualis] = useState([
      { id: 1, itens: 'A1' },
      { id: 2, itens: 'A2' },
      { id: 3, itens: 'A3' },
      { id: 4, itens: 'A4' },
      { id: 5, itens: 'B1' },
      { id: 6, itens: 'B2' },
      { id: 7, itens: 'B3' },
      { id: 8, itens: 'B4' },
      { id: 10, itens: 'C' },
      { id: 11, itens: 'SQ' },
    ]);

    const [itensSelecionados, setItensSelecionados] = useState<string[]>([]);
    const currentDate = new Date();
    const year = currentDate.getFullYear()
    const [filterYear, setFilterYear] = useState([year-4])
    type CheckboxStates = {
      [index: number]: boolean;
    };

    console.log(itensSelecionados)
  
    const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({});
  
    const handleCheckboxChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const itemId = event.target.name;
      const isChecked = event.target.checked;
  
      setCheckboxStates((prevStates) => ({ ...prevStates, [itemId]: isChecked }));
  
      setItensSelecionados((prevSelecionados) => {
        const selectedQualis = qualis.find((q) => q.id === parseInt(itemId));
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

   
    
  
    const checkboxQualis = qualis.map((quali) => {
      const isChecked = checkboxStates[quali.id];
      return (
        <li
          key={quali.id}
          className="checkboxLabel group list-none inline-flex  group overflow-hidden"
          onMouseDown={(e) => e.preventDefault()}
        >
          <label
            className={` cursor-pointer gap-3 transition-all flex h-10 items-center px-4  rounded-md text-xs font-medium hover:bg-gray-100 ${isChecked ? 'bg-gray-200 ' : ''}`}
          >
            <div className={`rounded-sm h-4 w-4 ${qualisColor[quali.itens]}`}></div>
            <span className="text-center block">{quali.itens}</span>
            <input
              type="checkbox"
              name={quali.id.toString()}
              className="absolute hidden group"
              onChange={handleCheckboxChangeInput}
              id={quali.itens}
              checked={isChecked}
            />
          </label>
        </li>
      );
    });

    //ano atual
   

    const updateResearcher = (newResearcher: Filter[]) => {
        if (props.onFilterUpdate) {
          props.onFilterUpdate(newResearcher);
        }
      };

      const filtros = {
        year: filterYear, // assuming filterYear is correct
        qualis: itensSelecionados // assuming itensSelecionados is correct
    };
    useMemo(() => {
      updateResearcher([filtros])
    }, [filterYear, itensSelecionados]);

    return(
       <div className="mb-6 flex gap-6">
        <div className="flex flex-col">
           <div className="flex items-center gap-3 mb-4 ">
           <CheckSquare size={24} className="text-gray-400" />
           <p className="text-sm font-bold">Selecione o Qualis</p>
           </div>
        <Alert className="w-fit">

<div className="gap-4 flex flex-wrap ">
{checkboxQualis}
</div>

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
min={2000}
step={1}
className="color-blue-700"

></Slider>

<p className="text-sm font-bold">{filterYear}</p>

</Alert>
        </div>
       </div>
    )
}