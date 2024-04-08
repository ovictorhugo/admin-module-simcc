"use client";

import { useEffect, useState } from "react";
import { InitialHome } from "../homepage/inital-home";



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
    </>
  )
}