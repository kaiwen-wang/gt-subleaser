import {
  DotButton,
  PrevButton,
  NextButton,
} from "./EmblaCarouselArrowsDotsButtons";
import ImageByIndex from "./ImageByIndex";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";

export default function EmblaCarousel({ supabaseURL, url, freudID }) {
  let [emblaRef, emblaApi] = useEmblaCarousel({});
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setRefreshKey(refreshKey + 1);
    }, 1);
  }, [supabaseURL]);

  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="embla relative w-full h-full overflow-hidden">
      <Link href={`/listings/${freudID}`} target="_blank">
        <div key={refreshKey} ref={emblaRef} className=" w-full h-full">
          <div className="embla__container flex h-full">
            {supabaseURL.map((url, index) => (
              <div className="embla__slide relative flex-shrink-0" key={index}>
                {/* <div className="absolute top-0 right-0 w-12 h-12 m-2 text-center bg-blue-500">
                    {index + 1}
                  </div> */}
                <Image
                  className={`embla__slide__img block object-cover w-full h-full ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  src={url}
                  alt="Image of sublease listing"
                  fill={true}
                  sizes="(max-width: 550px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, (max-width: 1536px) 20vw, 20vw"
                  onLoadingComplete={() => {
                    setImageLoaded(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </Link>

      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />

      <div className="absolute inset-x-0 bottom-0 z-50 flex items-center justify-center h-8 gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
