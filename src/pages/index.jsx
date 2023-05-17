import { AppContext } from "@/components/AppState";
import FilteredGrid from "@/components/PageComponents/FilteredGrid";
import HeadElement from "@/components/Header/HeadElement";
import Header from "@/components/Header/Header";
import { useContext, useState, useEffect, useRef } from "react";
import useSWR, { useSWRConfig, Fetcher } from "swr";
import { fetcher } from "@/utils/fetcher";
import FeedbackModal from "@/components/PageComponents/FeedbackModal";
import React from 'react'
import dynamic from 'next/dynamic'


export default function Home() {
  let {
    semesterPreference,
    maxPrice,
    genderPreference,
    bathroomPreference,
    maxRoommates,
    moveIn,
    moveOut,
    sortFormula,
  } = useContext(AppContext);

  // This loading is only for pagination. The other isLoading is for the initial fetch.
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMoreItems = () => {
    setLoading(true);
    setPages(pages + 1);
  };

  // Apparently data changes when the context changes. Is this normal? Secret benefit of SWR?
  const { data, error, isLoading } = useSWR(
    `/api/FilteredPostsApi?&price=${maxPrice}&gender=${genderPreference}&roommates=${maxRoommates}&movein=${moveIn}&moveout=${moveOut}&sort=${sortFormula}&pages=${pages}`,
    fetcher
  );

  // Items = actual posts
  const [items, setItems] = useState([]);
  const [triggerReset, setTriggerReset] = useState(false);

  useEffect(() => {
    if (data && data.length > 0) {
      if (items) {
        setItems((items) => [...items, ...data]);
      } else {
        setItems(data);
      }
      setLoading(false);
    }
  }, [data, triggerReset]);

  // Reset the items when the user changes the filters
  // maxPriceChanged is here to prevent double rendering, as the max price is derived from the database
  // useRef because useState causes a re-render.
  // This actually doesn't track maxPrice, it just knows that it renders twice.

  const maxPriceChanged = useRef(0);
  useEffect(() => {
    if (maxPriceChanged.current > 1) {
      setItems([]);
      setPages(1);
      setTriggerReset(!triggerReset);
    } else {
      maxPriceChanged.current = maxPriceChanged.current + 1;
    }
  }, [
    semesterPreference,
    maxPrice,
    genderPreference,
    bathroomPreference,
    maxRoommates,
    moveIn,
    moveOut,
    sortFormula,
  ]);

  const [showMap, setShowMap] = useState(false);
  const Map = React.useMemo(() => dynamic(
    () => import('@/components/MapThingy'), // replace '@components/map' with your component's location
    {
      loading: () => <p>A map is loading</p>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  ), [/* list variables which should trigger a re-render here */])


  return (
    <>
      <HeadElement
        title="Georgia Tech Subleaser | Midtown, Home Park, Atlantic Station, and more"
        desc="Subleases in Midtown Atlanta by GT students who are graduating, studying abroad, or interning. No spam, modern tech, easy to use."
      />
      {/* <div className=" drop-shadow rounded-xl fixed bottom-0 right-0 z-50 px-2.5 py-1.5 mb-4 mr-4 text-center bg-white border ">
        <span className="text-sm font-medium">Feedback on this page?</span>
      </div> */}

      <FeedbackModal />
      <div className=" flex flex-col h-screen">
        <Header showFilters={true} />

        <div className="h-full">
          {showMap ? <Map /> : <FilteredGrid
            postsData={items}
            error={JSON.stringify(error)}
            loadMoreItems={loadMoreItems}
            loading={loading}
            dataIsLoading={isLoading}
          />}
        </div>
      </div>
      <button className="w-fit bordershadow-scale-600 hover:bg-gray-200 fixed bottom-0 left-0 right-0 px-4 py-2 m-auto mb-6 text-sm text-gray-700 bg-white rounded-full"
        onClick={() => { setShowMap(!showMap) }}

      >
        {showMap ? "Show Listings" : "Show Map"}
      </button >
    </>
  );
}
