"use client";

import { useEffect, useState } from "react";
import { ArticlesHome } from "../homepage/categorias/articles-home";
import { InstitutionsHome } from "../homepage/categorias/institutions-home";
import { ResearchersHome } from "../homepage/categorias/researchers-home";


export const ResultProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
    <ArticlesHome/>
    <InstitutionsHome/>
    <ResearchersHome/>
    </>
  )
}