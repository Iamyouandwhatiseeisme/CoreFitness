"use client";
import { Button } from "@components/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@components/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

interface ImageCarouselProps {
  images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const updateCarouselState = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", updateCarouselState);
    updateCarouselState();

    return () => {
      api.off("select", updateCarouselState);
    };
  }, [api]);

  return (
    <div className=" h-96 max-h-[500px] px-5 w-full mt-5 max-w-7xl lg:mt-6">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="w-full h-96 max-h-[500px] z-10"
      >
        <CarouselContent className="w-full shrink-0">
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full">
              <div className=" h-96">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 z-20 flex items-center justify-between px-3 pointer-events-none">
        <Button
          variant="ghost"
          onClick={() => api?.scrollPrev()}
          className="pointer-events-auto rounded-full w-12 h-12 p-0"
        >
          <ChevronLeft className="size-6" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => api?.scrollNext()}
          className="pointer-events-auto rounded-full w-12 h-12 p-0"
        >
          <ChevronRight className="size-6" />
        </Button>
      </div>

      <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 flex gap-2 z-30 bg-slate-600/20 rounded-2xl p-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-muted"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
