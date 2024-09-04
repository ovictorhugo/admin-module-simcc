import { Envelope } from "phosphor-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useContext } from "react";
import { UserContext } from "../../../context/context";

export function Newsletter() {
    const {version} = useContext(UserContext)

    return(
        <div className="w-full flex flex-col items-center py-24">
           <div className="flex items-center flex-col justify-center mb-6">
           <h2 className="text-2xl font-medium ">Newsletter semanal do {version ? ('Conectee'):('Iapós')}</h2>
           <p className="max-w-[750px] text-center text-lg font-light text-foreground">Receba atualizações na sua caixa de e-mails sobre as produções mais recentes</p>
           </div>

           <div className="max-w-[540px]">
           <div className="flex gap-3 w-full">
           <div className="w-full flex flex-1">
                <Input></Input>
            </div>

            <Button><Envelope size={16}/> Fazer inscrição</Button>
           </div>

            <p className="text-sm mt-4">Suas informações vão ser usadas de acordo com a
Política de Privacidade do {version ? ('Conectee'):('Iapós')}. É possível cancelar a inscrição a qualquer momento.</p>
           </div>

        </div>
    )
}