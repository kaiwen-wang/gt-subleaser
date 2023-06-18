import GenderMenu from "/src/components/Menus/Filters/GenderMenu";
import MaxRoommatesMenu from "/src/components/Menus/Filters/MaxRoommatesMenu";
import MoveInMenu from "/src/components/Menus/Filters/MoveInMenu";
import MoveOutMenu from "/src/components/Menus/Filters/MoveOutMenu";
import PriceMenu from "/src/components/Menus/Filters/PriceMenu";
import SemesterMenu from "/src/components/Menus/Filters/SemesterMenu";

import { AppContext } from "/src/components/AppState.js";
import UserIcon from "/src/components/Header/Elements/UserIcon";
import SortMenu from "/src/components/Menus/SortMenu";
import { useContext, useRef, useEffect, useState } from "react";
import PopoverMenu from "src/components/Menus/PopoverMenu";

export default function HeaderfilterMenu() {
  let { genderPreference, setGenderPreference } = useContext(AppContext);
  let { maxPrice, setMaxPrice } = useContext(AppContext);
  let { maxTopPrice } = useContext(AppContext);
  let { priceDisplayValue } = useContext(AppContext);
  let { maxRoommates, setMaxRoommates } = useContext(AppContext);
  let { moveIn, setMoveIn } = useContext(AppContext);
  let { moveOut, setMoveOut } = useContext(AppContext);
  let { semesterPreference, setSemesterPreference } = useContext(AppContext);

  const filterMenuOptions = [
    {
      id: "gender",
      isActive: genderPreference !== "",
      displayName:
        genderPreference !== ""
          ? genderPreference
            .replaceAll("-", " ")
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
          : "Your Gender",
      contextSetter: setGenderPreference,
      defaultValue: "",
      component: <GenderMenu />,
    },
    {
      id: "price",
      isActive: maxPrice !== maxTopPrice,
      displayName: maxPrice !== maxTopPrice ? "Price: $" + maxPrice : "Price",
      contextSetter: setMaxPrice,
      defaultValue: maxTopPrice,
      component: <PriceMenu />,
    },
    {
      id: "maxRoommates",
      isActive: maxRoommates !== "",
      displayName:
        maxRoommates !== "" ? "Rooms: " + maxRoommates : "Total Rooms",
      contextSetter: setMaxRoommates,
      defaultValue: "",
      component: <MaxRoommatesMenu />,
    },
    {
      id: "moveIn",
      isActive: moveIn !== "",
      displayName: moveIn !== "" ? `In: ${moveIn}` : "Move In",
      contextSetter: setMoveIn,
      defaultValue: "",
      component: <MoveInMenu />,
    },
    {
      id: "moveOut",
      isActive: moveOut !== "",
      displayName: moveOut !== "" ? `Out: ${moveOut}` : "Move Out",
      contextSetter: setMoveOut,
      defaultValue: "",
      component: <MoveOutMenu />,
    },
    {
      id: "semester",
      isActive: semesterPreference !== "",
      displayName: semesterPreference !== "" ? `Semester: ${semesterPreference.slice(0, 1).toUpperCase() + semesterPreference.slice(1)}` : "Semester",
      contextSetter: setSemesterPreference,
      defaultValue: "",
      component: <SemesterMenu />,
    },
  ];

  const firstChildRef = useRef(null);

  function isOverflowing(element) {
    return (
      element.offsetWidth < element.scrollWidth ||
      element.offsetHeight < element.scrollHeight
    );
  }

  const [isOverflowingState, setIsOverflowingState] = useState(false);

  useEffect(() => {
    if (firstChildRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        setIsOverflowingState(isOverflowing(firstChildRef.current));
      });
      resizeObserver.observe(firstChildRef.current);

      return () => resizeObserver.disconnect(); // Cleanup observer on component unmount
    }
  }, []);

  return (
    <div className=" border-t">
      <div className="sm:px-8 xl:px-12 3xl:max-w-screen-3xl px-3 mx-auto">
        <div className="flex items-center gap-0">
          <div
            ref={firstChildRef}
            className={`${isOverflowingState ? "" : ""
              } flex overflow-auto gap-3 whitespace-nowrap dark:bg-none  py-3 pl-0.5 pr-2`}
          >
            {filterMenuOptions.map((option) => (
              <PopoverMenu
                key={option.id}
                isActive={option.isActive}
                name={option.displayName}
                contextSetter={option.contextSetter}
                defaultValue={option.defaultValue}
                props={option.component}
              />
            ))}
          </div>
          {isOverflowingState && (
            <div className="bordergradient self-stretch mr-2.5 border-r"></div>
          )}
          <SortMenu />
        </div>
        {/* <div className="grid items-center grid-cols-8 gap-4">
      <div className="max-w-fit md:col-span-7 relative col-span-6">
      <div className="flex gap-3 overflow-auto whitespace-nowrap px-0.5 py-3">
      <div className="bg-gradient-to-l from-white/0 to-white absolute inset-y-0 left-0 w-8"></div>
      <div className="bg-gradient-to-r from-white/0 to-white absolute inset-y-0 right-0 w-8"></div>
      <PopoverMenu name="Semester" props={<SemesterMenu />} />
      <PopoverMenu name="Gender" props={<GenderMenu />} />
      <PopoverMenu name="Price" props={<PriceMenu />} />
      <PopoverMenu name={"Bathroom"} />
      <PopoverMenu name={"Max Roommates"} />
      <PopoverMenu name={"Move In"} />
      <PopoverMenu name={"Move Out"} />
      <PopoverMenu name={"Building Type"} />
      <PopoverMenu name={"Pets"} />
      <PopoverMenu name={"Parking"} />
      <PopoverMenu name={"Appliances"} />
      <PopoverMenu name={"Furniture"} />
      </div>
      </div>
      <div className="md:col-span-1 flex justify-end col-span-2">
      <SortMenu className="" />
      </div>
    </div> */}
      </div>
    </div>
  );
}
