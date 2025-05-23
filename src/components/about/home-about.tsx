import { useTheme } from "next-themes";

import { useContext } from "react";
import { UserContext } from "../../context/context";
import { HeroParallax } from "../ui/hero-parallax";


export function HomeAbout() {
    const { theme } = useTheme();
    const { version } = useContext(UserContext);

    const institution = version ? "a Escola de Engenharia da UFMG" : "o SECTI-BA";
    const platform = version ? "Conectee" : "Simcc";

    const products = [
        {
          title: "Página inicial",
          link: "https://gomoonbeam.com",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
        },
        {
          title: "Dicionário de termos",
          link: "/dicionario",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/cursor.png",
        },
        {
          title: "Grupos de pesquisa",
          link: "https://userogue.com",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/rogue.png",
        },
       
        {
          title: "Programas de pós-graduação",
          link: "https://editorially.org",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/editorially.png",
        },
        {
          title: "Editrix AI",
          link: "https://editrix.ai",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/editrix.png",
        },
        {
          title: "Pixel Perfect",
          link: "https://app.pixelperfect.quest",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
        },
       
        {
          title: "Algochurn",
          link: "https://algochurn.com",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
        },
        {
          title: "Aceternity UI",
          link: "https://ui.aceternity.com",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
        },
        {
          title: "Tailwind Master Kit",
          link: "https://tailwindmasterkit.com",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
        },
        {
          title: "SmartBridge",
          link: "https://smartbridgetech.com",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
        },
        {
          title: "Renderwork Studio",
          link: "https://renderwork.studio",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
        },
       
        {
          title: "Creme Digital",
          link: "https://cremedigital.com",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
        },
        {
          title: "Golden Bells Academy",
          link: "https://goldenbellsacademy.com",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
        },
        {
          title: "Invoker Labs",
          link: "https://invoker.lol",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/invoker.png",
        },
        {
          title: "E Free Invoice",
          link: "https://efreeinvoice.com",
          thumbnail:
            "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
        },
      ];

    return (
       <main className="bg-neutral-50 dark:bg-neutral-900">
         <HeroParallax products={products} />
       </main>
    );
}
