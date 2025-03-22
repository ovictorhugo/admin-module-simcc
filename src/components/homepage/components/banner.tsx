import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Autoplay from "embla-carousel-autoplay"
import { Alert } from "../../ui/alert";
import { CardContent } from "../../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Button } from "../../ui/button";
import { Link2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Banner {
  id: string;
  titulo: string;
  imgURL: string;
  descricao?: string;
  botao?: string;
  link?: string;
}

export function BannerHome() {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const db = getFirestore();
      const bannersRef = collection(db, "background");
      const snapshot = await getDocs(bannersRef);
      const bannersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Banner[];

      setBanners(bannersData);
    };

    fetchBanners();
  }, []);

  return (
    <div className="flex w-full relative">
      <Carousel 
       plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full flex items-center">
        <CarouselContent>
          {banners.length > 0 ? (
            banners.map((banner) => (
              <CarouselItem key={banner.id}>
                <div className="">
                  <Alert className="p-0 rounded-md">
                    <CardContent
                      className="flex rounded-md h-[300px] items-center  p-16 bg-cover bg-center"
                      style={{ backgroundImage: `url(${banner.imgURL})` }}
                    >

                      <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-medium">
                          {banner.titulo}
                        </h1>

                       {banner.descricao && (
                         <p className=" ">
                         {banner.descricao}
                       </p>
                       )}

                       {banner.link && (
                        <Link to={banner.link} target="_blank"><Button className="bg-transparent dark:bg-transparent" variant={'outline'}>
                        <Link2 size={16}/> {banner.botao}
                      </Button></Link>
                       )}
                      </div>
                     
                    </CardContent>
                  </Alert>
                </div>
              </CarouselItem>
            ))
          ) : (
            <CarouselItem>
              <div className="p-1">
                <Alert>
                  <CardContent className="flex h-[300px] items-center justify-center p-6">
                    <span className="text-4xl font-semibold">Carregando...</span>
                  </CardContent>
                </Alert>
              </div>
            </CarouselItem>
          )}
        </CarouselContent>

        <div className="w-full absolute justify-between flex p-8">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
}
