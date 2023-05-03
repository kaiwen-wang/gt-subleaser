import GenderMenu from "../FilterMenus/GenderMenu";
import MaxRoommatesMenu from "../FilterMenus/MaxRoommatesMenu";
import MoveInMenu from "../FilterMenus/MoveInMenu";
import PriceMenu from "../FilterMenus/PriceMenu";
import SemesterMenu from "../FilterMenus/SemesterMenu";
import PressAnimationButton from "../PressAnimationButton";
import { AppContext } from "/src/components/AppState.js";
import MoveOutMenu from "@/components/FilterMenus/MoveOutMenu";
import UserIcon from "@/components/PageComponents/UserIcon";
import SortMenu from "@/components/SortMenu";
import { useContext } from "react";
import PopoverMenu from "src/components/PopoverMenu.js";

export default function HeaderfilterMenu() {
  let { genderPreference, setGenderPreference } = useContext(AppContext);
  let { maxPrice, setMaxPrice } = useContext(AppContext);
  let { maxTopPrice } = useContext(AppContext);
  let { maxRoommates, setMaxRoommates } = useContext(AppContext);
  let { moveIn, setMoveIn } = useContext(AppContext);
  let { moveOut, setMoveOut } = useContext(AppContext);

  const filterMenuOptions = [
    {
      id: "gender",
      isActive: genderPreference !== null,
      displayName:
        genderPreference !== null
          ? genderPreference
              .replaceAll("-", " ")
              .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
          : "Your Gender",
      contextSetter: setGenderPreference,
      defaultValue: null,
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
      isActive: maxRoommates !== null,
      displayName:
        maxRoommates !== null ? "Roommates: " + maxRoommates : "Max Roommates",
      contextSetter: setMaxRoommates,
      defaultValue: null,
      component: <MaxRoommatesMenu />,
    },
    {
      id: "moveIn",
      isActive: moveIn !== null,
      displayName: moveIn !== null ? `In: ${moveIn}` : "Move In",
      contextSetter: setMoveIn,
      defaultValue: null,
      component: <MoveInMenu />,
    },
    {
      id: "moveOut",
      isActive: moveOut !== null,
      displayName: moveOut !== null ? `Out: ${moveOut}` : "Move Out",
      contextSetter: setMoveOut,
      defaultValue: null,
      component: <MoveOutMenu />,
    },
  ];

  return (
    <div className="mx-auto border-t px-6 sm:px-8 xl:px-12 3xl:max-w-screen-3xl">
      <div className="flex items-center gap-4">
        <div className="flex gap-3 overflow-auto whitespace-nowrap bg-gradient-to-l from-gray-500/5 to-white py-3 pl-0.5 pr-2">
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
        <SortMenu />
      </div>
      {/* <div className="grid grid-cols-8 items-center gap-4">
      <div className="relative col-span-6 max-w-fit md:col-span-7">
        <div className="flex gap-3 overflow-auto whitespace-nowrap px-0.5 py-3">
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-l from-white/0 to-white"></div>
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-white/0 to-white"></div>
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
      <div className="col-span-2 flex justify-end md:col-span-1">
        <SortMenu className="" />
      </div>
    </div> */}
    </div>
  );
}
