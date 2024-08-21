// LoadingWrapper.tsx
import React, { useState, useEffect, useContext } from 'react';
import { LogoConectee } from './svg/LogoConectee';
import { UserContext } from '../context/context';
import { useTheme } from 'next-themes';
import { LogoConecteeWhite } from './svg/LogoConecteeWhite';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useLocation } from 'react-router-dom';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

interface User {
  institution_id: string
  user_id:string
  display_name:string
  email:string 
  uid:string
  photo_url:string
  dep_id:string
  roles:Roles[]
}


interface Roles {
  id:string
  role:string
}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}




const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const { setLoggedIn, setUser, urlGeralAdm, setPermission, permission, user, setRole } = useContext(UserContext)

    ///// LOGIN SHIBBOLETH
    
    const queryUrl = useQuery();

    const [userData, setUserData] = useState<User| null>(null);;


    useEffect(() => {
      setLoading(true);

      const storedPermission = localStorage.getItem('permission');
      if (storedPermission) {
        setPermission(JSON.parse(storedPermission));
      }


    
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        
        if (firebaseUser) {
          console.log(firebaseUser.uid);
          if (firebaseUser.uid !== '') {
          
    
            // Recupera as informações adicionais do seu banco de dados aqui
            const urlUser = `${urlGeralAdm}s/user?uid=${firebaseUser.uid}`;
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
                if (data && Array.isArray(data) && data.length > 0) {
                  setLoggedIn(true)
                  data[0].roles = data[0].roles || [];
                  setUser(data[0]);
                 


                  const storedUser = localStorage.getItem('permission');
                  const storedRole = localStorage.getItem('role');
                
                    if (storedUser) {
                      // Se as informações do usuário forem encontradas no armazenamento local, defina o usuário e marque como autenticado
                      setPermission(JSON.parse(storedUser));
                
                    }

                    if (storedRole) {
                      // Se as informações do usuário forem encontradas no armazenamento local, defina o usuário e marque como autenticado
                      setRole(JSON.parse(storedRole));
                
                    }
                }
              } catch (err) {
                console.log(err);
              } finally {
                setLoading(false);
              }
            };
    
            fetchData();
          } else {
            setLoggedIn(false);
            setLoading(false);
          }
        } else {
          setLoggedIn(false);
          setLoading(false);
        }

        setLoading(false);
      });
    
      return () => {
        unsubscribe();
       
      };

     
    }, []);
    
  
  console.log(permission)

    const { theme } = useTheme()

  return <>{loading ? <main className='h-screen w-full flex items-center justify-center'>
        <div className='h-16 animate-pulse'>
            {theme == 'dark' ? (<LogoConecteeWhite/>):(<LogoConectee/>)}
        </div>
  </main> : children}</>;
};

export default LoadingWrapper;
