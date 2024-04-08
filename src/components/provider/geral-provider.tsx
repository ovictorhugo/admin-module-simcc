"use client";

import { useEffect, useState } from "react";
import { InitialHome } from "../homepage/inital-home";
import { MariaHome } from "../homepage/maria-home";



export const GeralProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
    <InitialHome/>
    <MariaHome/>
    </>
  )
}