import { useContext, useEffect, useState } from "react";
import { Alert } from "../ui/alert";
import { UserContext } from "../../context/context";
import { MapPin, Star } from "phosphor-react"; 
import { GraduationCap } from "lucide-react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"



  interface PosGraduationsProps {
    graduate_program_id: string
    code: string
    name: string
    area: string
    modality: string
    type: string
    rating: string
    institution_id: string
    description: string
    url_image: string
    city:string
    visible: boolean
  }


export function PosGraducaoView() {

    const { urlGeralAdm, user } = useContext(UserContext);
    const [posgraduations, setPosgraduations] = useState<PosGraduationsProps[]>([]);

    const urlGetPosGraduations = urlGeralAdm + `GraduateProgramRest/Query?institution_id=${user.institution_id}`
  
  

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(urlGetPosGraduations, {
              mode: "cors",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "3600",
                "Content-Type": "text/plain",
              },
            });
            const data = await response.json();
            if (data) {
                setPosgraduations(data);
            }
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [urlGetPosGraduations]);



    return(

        <Alert className="flex flex-wrap gap-4">
       
    
       {posgraduations.map((posgraduation) => (
        <div key={posgraduation.graduate_program_id} className="max-w-[350px] flex flex-row items-center p-4  bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer w-full">
          <div className="flex flex-col">
            <img className="w-24 h-auto object-cover object-center rounded-l-lg" src={posgraduation.url_image} alt={posgraduation.name} />
            <div className="flex flex-row justify-between p-4 items-center">
              <MapPin className="mr-2" size={12} /> 
              <span className="text-gray-600">{posgraduation.city}</span>
            </div>
          </div>
          <div className="flex flex-col justify-between p-4">
            <div className="flex flex-col justify-between">
              <h2 className="text-xl font-semibold  text-blue-700">{posgraduation.name}</h2>
              <span className="text-gray-600 flex">
                {[...Array(Number(posgraduation.rating))].map((_, index) => (
                  <Star key={index} className="mr-1 mt-1" size={16} style={{ fill: "#FFD700" }} />
                ))}
              </span>
            </div>
            <div className="flex flex-row">
            <div className="mt-2 flex gap-1 text-xs p-2 border items-center border-gray-300 dark:border-stone-700 rounded-md">
            <GraduationCap size={12} /> 
            <span>{posgraduation.type}</span>
              </div>
              <div className="mt-2 ml-2 flex gap-1 text-xs p-2 border items-center border-gray-300 dark:border-stone-700 rounded-md">
        
                <span>{posgraduation.area}</span>
              </div>

            </div>
          
          </div>
        
        </div>
      ))}

     
    
        </Alert>
        
    )
}