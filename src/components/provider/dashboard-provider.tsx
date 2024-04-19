"use client";

import { useEffect, useState } from "react";
import { GeralViewDashboard } from "../dashboard/geral-view-dashboard";
import { GeralViewMaster } from "../dashboard/master/geral-view-master";


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
    <GeralViewMaster/>
    </>
  )
}