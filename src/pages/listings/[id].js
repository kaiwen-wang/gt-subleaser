import Head from "next/head";

import { AppContext } from "/src/components/AppState.js";
import { useContext, useEffect } from "react";

import Header from "@/components/PageComponents/Header";
import Footer from "@/components/PageComponents/Footer";

import EmblaCarousel from "@/components/Carousel/Carousel";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import HeadElement from "@/components/PageComponents/HeadElement";

const OPTIONS = {};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());


export async function getStaticProps({ params }) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  let { data, error } = await supabase
    .from('subleases')
    .select()
    .eq('id', params.id)

  // I think it's wrapped around an object or array thing
  data = data[0]

  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  let { data, error } = await supabase
    .from('subleases')
    .select('id')

  let paths = data.map((sublease) => {
    return {
      params: {
        id: sublease.id.toString(), // Changed this line to provide the id property
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}


export default function Listing(props) {
  const { data } = props;

  return (
    <>
      <HeadElement />

      <Header />
      <main className="">
        <div className="container mx-auto pb-8 pt-4">
          <div className="grid grid-cols-2">
            <div className="sticky top-20 grid max-h-64 grid-cols-2 grid-rows-2 gap-2 pr-4">
              <div className="bg-gray-500"></div>
              <div className="bg-gray-500"></div>
              <div className="bg-gray-500"></div>
              <div className="bg-gray-500"></div>
              <div className="mt-8">
                <button className="rounded-full px-4 py-2 text-sm font-medium outline outline-gray-200 hover:bg-gray-100">
                  Contact
                </button>
                <p className="text-xs">Clicks: {data.contact_clicks} | Views: {data.total_views}</p>
              </div>
            </div>
            <div className="bg-white">
              <div className="rounded-md px-4 py-4 outline outline-1 outline-gray-700">
                <h1 className="mb-4 text-2xl font-semibold">
                  {data.title}
                </h1>
                <div className="prose mt-2">
                  {data.description}
                </div>
              </div>

              <h2 className="mb-2 mt-2 text-center text-xl font-semibold">
                Dates
              </h2>
              <div className="rounded-lg p-4 outline outline-gray-200">
                <div className="h-50">Availability:</div>
                {data.semester}


                {data.move_in}

                MOve out:
                {data.move_out}
              </div>

              <h2 className="mb-2 mt-2 text-center text-xl font-semibold">
                Pricing
              </h2>
              <div className="rounded-lg p-4 outline outline-gray-200">
                <div className="h-50">Pricing per month:</div>
                <ul className="max-w-[50%]">
                  <li className="flex justify-between">
                    <p>Sublease</p>
                    <p>{data.monthly_price}</p>
                  </li>

                  <li className="flex justify-between">
                    <p>Utilities</p>
                    <p>{data.utilities_fee}</p>
                  </li>

                  <li className="flex justify-between">
                    <p>Fees</p>
                    <p>{data.misc_fees}</p>
                  </li>
                </ul>
              </div>

              <h2 className="mb-2 mt-2 text-center text-xl font-semibold">
                Appliances
              </h2>
              <div className="grid grid-cols-2 gap-3 text-sm font-medium [&>*]:rounded-md [&>*]:px-3 [&>*]:pb-2 [&>*]:pt-3 [&>*]:outline [&>*]:outline-gray-200">
                <div className="">
                  <Image
                    src="/washing-machine.png"
                    alt="Dryer"
                    width="24"
                    height="24"
                  />
                  <p>Washing Machine</p>
                </div>
                <div>
                  <Image src="/dryer.png" alt="Dryer" width="24" height="24" />
                  <p>Dryer</p>
                </div>
                <div>
                  <Image src="/sink.png" alt="Dryer" width="24" height="24" />
                  <p>Sink</p>
                </div>
                <div>
                  <Image
                    src="/disposal.png"
                    alt="Dryer"
                    width="24"
                    height="24"
                  />
                  <p>Drain Disposal</p>
                </div>
                <div>
                  <Image src="/fridge.png" alt="Dryer" width="24" height="24" />
                  <p>Fridge</p>
                </div>
                <div>
                  <Image
                    src="/freezer.png"
                    alt="Dryer"
                    width="24"
                    height="24"
                  />
                  <p>Freezer</p>
                </div>
                <div>
                  <Image
                    src="/microwave.png"
                    alt="Dryer"
                    width="24"
                    height="24"
                    className="pt-1"
                  />
                  <p>Microwave</p>
                </div>
                <div>
                  <Image src="/oven.png" alt="Dryer" width="24" height="24" />
                  <p>Stove</p>
                </div>
              </div>
              <h2 className="mb-2 mt-4 text-center text-xl font-semibold">
                Allowed
              </h2>
              <div className="grid grid-cols-4 gap-3 text-sm font-medium [&>*]:rounded-md [&>*]:px-3 [&>*]:pb-2 [&>*]:pt-3 [&>*]:outline [&>*]:outline-gray-200">
                <div className="">
                  <Image
                    src="/washing-machine.png"
                    alt="Dryer"
                    width="24"
                    height="24"
                  />
                  <p>Pets</p>
                </div>
                <div>
                  <Image src="/dryer.png" alt="Dryer" width="24" height="24" />
                  <p>Drinking</p>
                </div>
                <div>
                  <Image src="/sink.png" alt="Dryer" width="24" height="24" />
                  <p>Smoking</p>
                </div>
                <div>
                  <Image src="/oven.png" alt="Dryer" width="24" height="24" />
                  <p>Parties</p>
                </div>
              </div>
            </div>
          </div>

          {/* <section className="sandbox__carousel">
                        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
                    </section> */}
        </div>
      </main >
    </>
  );
}
