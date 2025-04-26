import { useEffect, useState } from "react";
 // ajuste conforme seu projeto

import { Alert } from "../../ui/alert";
import { getInstitutionImageName } from "../../homepage/categorias/institutions-home/institution-image-name";
import { Buildings } from "phosphor-react";

interface ColaboradorProps {
  nome: string;
  instituicao: string;
}

interface ColaboradorCardProps {
  colaborador: ColaboradorProps;
}

export const ColaboradorCard = ({ colaborador }: ColaboradorCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async  () => {
      const url =  await getInstitutionImageName(colaborador.instituicao);
      setImageUrl(url);
    };
    fetchImage();
  }, [colaborador.instituicao]);

  return (
    <div className="flex">
      <div className="w-2 rounded-l-md border border-r-0 bg-eng-blue"></div>
      <Alert className="rounded-l-none flex gap-3 p-8">
        <div className="flex flex-1 flex-col">
          <div className="mb-8">
            <p className="text-lg font-medium">{colaborador.nome}</p>
            <div className="flex text-gray-500 items-center gap-2 mb-2">
              {!imageUrl ? (
                <Buildings size={16} />
              ) : (
                <img src={imageUrl} alt="" className="h-6" />
              )}
              <p className="text-md">{colaborador.instituicao}</p>
            </div>
          </div>
        </div>
      </Alert>
    </div>
  );
};
