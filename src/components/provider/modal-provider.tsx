"use client";

import { useEffect, useState } from "react";
import { SearchModal } from "../modals/search-modal";
import { AddGraduateProgram } from "../modals/add-graduate-program";


export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
    <SearchModal/>
    <AddGraduateProgram/>
    </>
  )
}