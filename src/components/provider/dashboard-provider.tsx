"use client";

import { useEffect, useState } from "react";
import { GeralViewDashboard } from "../dashboard/geral-view-dashboard";


export const DashboardProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
    <GeralViewDashboard/>
    </>
  )
}