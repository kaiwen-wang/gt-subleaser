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
    }, 10);
  }, [supabaseURL]);

  return (
    <div className="embla relative w-full h-full">
      <Link href={`/listings/${freudID}`} target="_blank">
        <div key={refreshKey} ref={emblaRef} className=" w-full h-full">
          <div className="flex embla__container h-full ">
            {supabaseURL.map((url, index) => (
              <div className="relative flex-shrink-0 embla__slide" key={index}>
                {/* <div className="absolute top-0 right-0 w-12 h-12 bg-blue-500 text-center m-2">
                    {index + 1}
                  </div> */}
                <Image
                  className="block w-full h-full object-cover embla__slide__img"
                  src={url}
                  alt="Alt text"
                  fill={true}
                  // width={500}
                  // height={500}
                  // sizes="(max-width: 768px) 100vw,
                  // (max-width: 1200px) 50vw,
                  // 33vw"
                  //     style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </div>
      </Link>

      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />

      <div className="flex items-center justify-center gap-2 absolute h-8 inset-x-0 bottom-0 z-50">
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
