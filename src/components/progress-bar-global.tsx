import React, { useState } from "react";
import { Progress } from "./ui/progress";


const FetchProgressBar = () => {
  const [ progress, activeRequests ] =useState(0)

  if (activeRequests === 0) return null; // Oculta a barra se não houver requisições

  return (
    <div className="w-full fixed z-[9999999999] top-0 left-0 bg-gray-100">
      <Progress value={progress} max={100} className="h-2 bg-blue-500" />
    </div>
  );
};

export default FetchProgressBar;
