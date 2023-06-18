import { AppContext } from "/src/components/AppState.js";
import { useContext } from "react";
import { Slider } from "/src/components/Menus/Filters/Slider";

export default function MaxRoommatesMenu() {
  let { maxRoommates, setMaxRoommates } = useContext(AppContext);

  return (
    <>
      <span className="flex items-center">
        <span className="text-sm font-medium text-gray-900">Total Rooms</span>
      </span>
      <span className="block mb-2 text-sm text-gray-500">
        This many rooms or less
      </span>

      {/* <Slider /> */}

      <input
        className="w-full p-1 border border-gray-400 rounded"
        type="number"
        min="1"
        value={maxRoommates}
        onChange={(e) => {
          if (e.target.value < 0) {
            setMaxRoommates(0);
          } else {
            setMaxRoommates(e.target.value);
          }
        }}
      ></input>
    </>
  );
}
