/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { cn } from "../../lib"
import React, { useContext, useEffect, useState } from "react";
import dt from '../../assets/dt.png'
import pq from '../../assets/pq.png'
import { PuzzlePiece } from "phosphor-react";
import { InfiniteMovingCards } from "./infinite-moving-cards";
import { CardTitle } from "./card";
import { Alert } from "./alert";
import { GraduationCap, MapPin } from "lucide-react";
import { useModal } from "../hooks/use-modal-store";
import { UserContext } from "../../context/context";
import { ArticleItem } from "../homepage/categorias/articles-home/article-item";

interface Bolsistas {
  aid_quantity:string
  call_title:string
  funding_program_name:string
  modality_code:string
  category_level_code:string
  institute_name:string
  modality_name:string
  scholarship_quantity:string
  
  }


export const InfiniteMovingResearchers = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string,
    area: string,
    id: string,
    city: string,
    graduation: string,
    subsidy:Bolsistas[]
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { onOpen } = useModal();
  const { urlGeral,  setPesquisadoresSelecionados, pesquisadoresSelecionados} = useContext(UserContext)

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true); // MUDAR
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "1080s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative  w-full overflow-hidden  [mask-image:linear-gradient(to_right,transparent, transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4  w-max flex-nowrap",
          start ? "animate-scroll " : "",
          pauseOnHover
            ? "hover:[animation-play-state:paused] hover:cursor-pointer"
            : ""
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              "transition-all duration-300" // Transição suave
             
            )}
          >
            <ArticleItem
            
            
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
