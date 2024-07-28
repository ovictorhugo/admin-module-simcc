// LoadingWrapper.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LogoConectee } from './svg/LogoConectee';


interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  return <>{loading ? <main className='h-screen w-full flex items-center justify-center'>
        <div className='h-16 animate-pulse'>
            <LogoConectee/>
        </div>
  </main> : children}</>;
};

export default LoadingWrapper;
