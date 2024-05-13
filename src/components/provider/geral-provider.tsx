"use client";

import { useEffect, useState } from "react";
import { InitialHome } from "../homepage/inital-home";
import { MariaHome } from "../homepage/maria-home";
import { ResultHome } from "../homepage/result-home";
import { GraduateProgram } from "../graduate-program/graduate-program";
import { BaremasHome } from "../baremas/baremas-home";
import { MeusBaremasHome } from "../baremas/meus-baremas";



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
    <ResultHome/>
    <GraduateProgram/>
    <BaremasHome/>
    <MeusBaremasHome/>
    </>
  )
}