import Header from "@/components/PageComponents/Header";
import EmblaCarousel from "@/components/Carousel/Carousel";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "@/components/Account.js";

import FilteredGrid from "@/components/PageComponents/FilteredGrid";
import HeadElement from "@/components/PageComponents/HeadElement";

import { AppContext } from "/src/components/AppState.js";
import { useContext } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import useSWR from 'swr'


const fetcher = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.status = res.status;
    error.info = await res.json();
    throw error;
  }

  return res.json();
};

export default function Home() {
  let { semesterPreference, maxPrice, genderPreference, bathroomPreference, maxRoommates, moveIn, moveOut } = useContext(AppContext);
  let { sortFormula } = useContext(AppContext);


  // Apparently data changes when the context changes. Is this normal?
  const { data, error } = useSWR(`/api/FilteredPostsApi?semester=${semesterPreference}&price=${maxPrice}&gender=${genderPreference}&bathroom=${bathroomPreference}&roommates=${maxRoommates}&movein=${moveIn}&moveout=${moveOut}&sort=${sortFormula}`, fetcher)


  return (
    <>
      <HeadElement title="Georgia Tech Subleaser" desc="The best marketplace for subleases" />
      <Header showFilters={true} />
      <FilteredGrid postsData={data} error={JSON.stringify(error)} />
    </>
  );
}