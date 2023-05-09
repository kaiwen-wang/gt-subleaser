import { AppContext } from "/src/components/AppState.js";
// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "@/components/Account.js";
import EmblaCarousel from "@/components/Carousel/Carousel";
import FilteredGrid from "@/components/PageComponents/FilteredGrid";
import HeadElement from "@/components/PageComponents/HeadElement";
import Header from "@/components/PageComponents/Header";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext, useState, useEffect } from "react";
import useSWR, { useSWRConfig } from "swr";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.status = res.status;
    error.info = await res.json();
    throw error;
  }

  return res.json();
};

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

  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  // This loading is only for pagination. The other loading is for the initial fetch.

  const loadMoreItems = () => {
    setLoading(true);
    setPages(pages + 1);
  };

  // Apparently data changes when the context changes. Is this normal? Secret benefit of SWR?
  const { data, error, isLoading } = useSWR(
    `/api/FilteredPostsApi?&price=${maxPrice}&gender=${genderPreference}&roommates=${maxRoommates}&movein=${moveIn}&moveout=${moveOut}&sort=${sortFormula}&pages=${pages}`,
    fetcher
  );
  const { cache, mutate, ...extraConfig } = useSWRConfig();

  // useEffect(() => {
  //   console.log("data", data);
  //   console.log("error", error);
  //   console.log("dataIsLoading", isLoading);
  // }, [data, error, isLoading]);

  // the actual posts that get passed down
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

  // TODO source of bug
  useEffect(() => {
    // if (items && items.length > 0) {
    // console.log("items exist");
    console.log(
      maxPrice,
      genderPreference,
      maxRoommates,
      moveIn,
      moveOut,
      cache,
      mutate
    );
    // } else {
    console.log(items);

    setItems([]);
    setPages(1);
    setTriggerReset(!triggerReset);
    // }
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

  return (
    <>
      <HeadElement
        title="Georgia Tech Subleaser | Midtown, Home Park, Atlantic Station, and more"
        desc="Subleases in Midtown Atlanta by GT students who are graduating, studying abroad, or interning. No spam, modern tech, easy to use."
      />
      <Header showFilters={true} />
      <FilteredGrid
        postsData={items}
        error={JSON.stringify(error)}
        loadMoreItems={loadMoreItems}
        loading={loading}
        dataIsLoading={isLoading}
      />
    </>
  );
}
