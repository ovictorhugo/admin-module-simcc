import { Alert } from "../../ui/alert"
import { Card, CardContent } from "../../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel"

export function BannerHome() {
    return(
        <div className="">
             <Carousel className="w-full flex items-center mt-8">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Alert>
                <CardContent className="flex h-[300px] items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Alert>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    <div className="w-full absolute justify-between flex p-8">
    <CarouselPrevious />
    <CarouselNext />
    </div>
    </Carousel>
        </div>
    )
}