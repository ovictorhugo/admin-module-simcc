import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/context";

interface User {
    institution_id: string
    user_id:string
    display_name:string
    email:string 
    uid:string
    photo_url:string
    dep_id:string
    roles:Roles[]
    linkedin:string
    lattes_id:string
    shib_id:string
    graduate_program:GraduateProgram[]
    researcger_name:string
  }
  
  interface GraduateProgram {
    graduate_program_id:string
    name:string
  }
  
  interface Roles {
    id:string
    role_id:string
  }

export function EditarInfoUsuarios() {

    const {urlGeralAdm} = useContext(UserContext)

    const [user, setUser] = useState<User[]>([])

    const urlUser = `${urlGeralAdm}/s/user/entrys`;
    console.log(urlUser);

    const fetchData = async () => {
      try {
        const response = await fetch(urlUser, {
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
        if (data ) {

          setUser(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
      
      }
    };

useEffect(() => {
    fetchData()
    }, [])

    return(
        <div>

        </div>
    )
}