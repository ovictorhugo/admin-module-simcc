import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../components/ui/accordion"
import { Badge } from "../ui/badge"

  
export function Duvidas() {
    return(
        <div>
            <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger><div className="flex items-center gap-2">Is it accessible? <Badge variant={'outline'}>Usuário</Badge></div></AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>

        </div>
    )
}