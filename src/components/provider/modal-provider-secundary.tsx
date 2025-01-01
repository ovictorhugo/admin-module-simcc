"use client";

import { useEffect, useState } from "react";

import { ArticlesModal } from "../modals/articles-modal";


import { useModalSecundary } from "../hooks/use-modal-store-secundary";
import { CookiesModal } from "../modals/cookies";
import { EditArticle } from "../modals/edit-article";
import { ProjectModal } from "../modals/project-modal";


const ModalContentSecundary = () => {
  const { type } = useModalSecundary();

  switch (type) {
      case 'articles-modal':
        return <ArticlesModal/>
        case 'cookies':
          return <CookiesModal/>
        case 'edit-article':
          return <EditArticle/>
        case 'project-modal':
          return <ProjectModal/>
    default:
      return null;
  }
};


export const ModalProviderSecundary = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ModalContentSecundary />
}