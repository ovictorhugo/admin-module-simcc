// LoadingWrapper.tsx
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { LogoConectee } from './svg/LogoConectee';
import { UserContext } from '../context/context';


interface LoadingWrapperProps {
  children: React.ReactNode;
}

interface UserData {
  application_id:string
  session_id:string
  identity_provider:string
  authentication_instant:string
  authentication_method:string
  authn_context_class:string
  session_index:string
  org_dn:string
  org_unit_dn:string
  primary_affiliation:string
  given_name:string
  common_name:string
  email:string
  uid:string
  surname:string
  cpf:string
  curso_nivel:string
  data_nascimento:string
  sexo:string
  status:string
  url_email:string
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const {urlGeral, loggedIn, setLoggedIn} = useContext(UserContext)

    ///// LOGIN SHIBBOLETH

    let urlMagazine = `${urlGeral}/login`;

    const [userData, setUserData] = useState<UserData[]>([]);
  
  useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        try {
          const response = await fetch(urlMagazine, {
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET',
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Max-Age': '3600',
              'Content-Type': 'text/plain'
            }
          });
          const data = await response.json();
          if (data) {
            setUserData(data);
            setLoggedIn(true)
            setTimeout(() => {
              setLoading(false);
            }, 2000); // Atraso de 2 segundos (2000 milissegundos)
           
          }
        } catch (err) {
          console.log(err);
          setTimeout(() => {
            setLoading(false);
          }, 2000); // Atraso de 2 segundos (2000 milissegundos)
        }
      };
      fetchData();
    }, []);
  
  
    console.log(userData)

  return <>{loading ? <main className='h-screen w-full flex items-center justify-center'>
        <div className='h-16 animate-pulse'>
            <LogoConectee/>
        </div>
  </main> : children}</>;
};

export default LoadingWrapper;
