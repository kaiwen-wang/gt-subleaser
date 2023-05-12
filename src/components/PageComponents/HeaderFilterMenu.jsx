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
  let { priceDisplayValue } = useContext(AppContext);
  let { maxRoommates, setMaxRoommates } = useContext(AppContext);
  let { moveIn, setMoveIn } = useContext(AppContext);
  let { moveOut, setMoveOut } = useContext(AppContext);

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
  ];

  return (
    <div className=" border-t">
      <div className="sm:px-8 xl:px-12 3xl:max-w-screen-3xl px-6 mx-auto">
        <div className="flex items-center gap-4">
          <div className="flex gap-3 overflow-auto whitespace-nowrap dark:bg-none bg-gradient-to-l from-gray-500/5 to-white py-3 pl-0.5 pr-2">
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
