import { AppContext } from "/src/components/AppState.js";
// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "@/components/Account.js";
import EmblaCarousel from "@/components/Carousel/Carousel";
import FilteredGrid from "@/components/PageComponents/FilteredGrid";
import HeadElement from "@/components/PageComponents/HeadElement";
import Header from "@/components/PageComponents/Header";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useContext } from "react";
import useSWR from "swr";

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
  } = useContext(AppContext);
  let { sortFormula } = useContext(AppContext);

  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMoreItems = () => {
    setLoading(true);
    setPages(pages + 1);
  };

  // Apparently data changes when the context changes. Is this normal? Secret benefit of SWR?
  const { data, error } = useSWR(
    `/api/FilteredPostsApi?semester=${semesterPreference}&price=${maxPrice}&gender=${genderPreference}&bathroom=${bathroomPreference}&roommates=${maxRoommates}&movein=${moveIn}&moveout=${moveOut}&sort=${sortFormula}`,
    fetcher
  );

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setItems((items) => [...items, ...data]);
      setLoading(false);
    }
  }, [data]);

return (
    <>
      <HeadElement
        title="Georgia Tech Subleaser | Midtown, Home Park, Atlantic Station, and more"
        desc="Subleases in Midtown Atlanta by GT students who are graduating, studying abroad, or interning. No spam, modern tech, easy to use."
      />
      <Header showFilters={true} />
      <FilteredGrid postsData={data} error={JSON.stringify(error)} />
    </>
  );
}
