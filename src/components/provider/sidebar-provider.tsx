"use client";

import { useEffect, useState } from "react";
import { FilterSidebar } from "../sidebar/filter-sidebar";
import { InfoSidebar } from "../sidebar/info-sidebar";


export const SidebarProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
    <FilterSidebar/>
    <InfoSidebar/>
    </>
  )
}