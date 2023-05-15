import SkellyImage from "@/components/PageComponents/SkellyImage";
import { timeAgo } from "@/utils/timeAgo";
import { useContext, useEffect, useRef, useCallback } from "react";

export default function FilteredGrid({
  postsData,
  error,
  loadMoreItems,
  loading,
  dataIsLoading,
}) {
  let parsedError = error ? JSON.parse(error) : null;

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMoreItems]
  );

  return (
    <div className="sm:px-8 xl:px-12 3xl:max-w-screen-3xl px-6 pb-12 mx-auto mt-2">
      <div className="xs:grid-cols-2 md:grid-cols-3 lg:gap-4 xl:gap-4 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 grid grid-cols-1 gap-3">
        {postsData && postsData.length !== 0 ? (
          postsData.map((item, index) => {
            let meow = item.id;

            return (
              // <Link key={key} href={`/listings/${key}`} target="_blank">
              <div
                key={`${meow}-${index}`}
                ref={index === postsData.length - 1 ? lastItemRef : null}
              >
                <div className="group rounded-xl will-change-transform relative overflow-hidden border border-black shadow-md">
                  <SkellyImage url={item.id} freudID={meow} item={item} />
                </div>
                <div className="mt-0.5 flex justify-between">
                  <p className="font-medium tracking-wide">
                    {item.neighborhood}
                  </p>
                  <div>
                    <span className="text-sm font-medium">
                      ${item.monthly_price}
                    </span>
                    <span> / </span>
                    <span className="text-gray-600">month</span>
                  </div>
                </div>
                <div className="-mt-0.5 flex justify-between text-sm text-gray-500">
                  <span>
                    {item.free_rooms} Bed{" "}
                    {item.private_bathroom
                      ? `${Math.min(item.total_bathrooms, 1 * item.free_rooms)}`
                      : `Shared`}{" "}
                    Bath in a {item.total_bedrooms}B/{item.total_bathrooms}B
                  </span>
                </div>
                <span className="block text-sm">
                  {"Posted " + timeAgo(item.created_at)}
                </span>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">
            {parsedError
              ? "Error: " +
                parsedError.info.error +
                " Code " +
                parsedError.status
              : dataIsLoading
              ? "Loading..."
              : "No results found"}
          </p>
        )}
      </div>
    </div>
  );
}
