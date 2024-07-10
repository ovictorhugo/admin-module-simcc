import { useContext, useEffect, useState } from "react";
import { Alert } from "../ui/alert";
import { UserContext } from "../../context/context";
import { toast } from "sonner"
import { Button } from "../ui/button";
import { Terminal } from "phosphor-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface PesquisadorProps {
    message:string
}
export function ApacheViewDashboard() {
    const { urlGeralAdm, user } = useContext(UserContext);
    const [researcher, setResearcher] = useState<PesquisadorProps[]>([]);
    const urlGetApache = urlGeralAdm + `sys/checkHop`;

    const fetchData = async () => {
      try {
        const response = await fetch(urlGetApache, {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600',
            'Content-Type': 'text/plain',
          },
        });

        const data = await response.json();
  
        // Ensure data is an array
        const dataArray = Array.isArray(data) ? data : [data];
  
        if (dataArray && dataArray.length > 0) {
          setResearcher((prevResearcher) => {
            // Check if the last item of the current researcher array is different from the new data
            const lastItem = prevResearcher[prevResearcher.length - 1];
            const newItem = dataArray[dataArray.length - 1];
  
            if (JSON.stringify(lastItem) !== JSON.stringify(newItem)) {
              return [...prevResearcher, ...dataArray];
            }
  
            return prevResearcher;
          });
          console.log('data', researcher);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    useEffect(() => {
      fetchData(); // Initial fetch
      console.log(researcher);
      const intervalId = setInterval(fetchData, 2000); // Fetch every 2 seconds
  
      return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    


    return(
      <div className="grid gap-4">
      <div className="rounded-md bg-black p-6 h-[300px]">
        <pre>
          <code className="grid gap-1 text-sm text-muted-foreground [&_span]:h-4">
        

        <ScrollArea>
          
        {researcher.map((props) => {
                  return(
                      <span className="text-gray-500 text-sm">{props.message}</span>
                  )
              })}
         

        </ScrollArea>

           
      </code>
      </pre>
      </div>
      </div>
    )
}