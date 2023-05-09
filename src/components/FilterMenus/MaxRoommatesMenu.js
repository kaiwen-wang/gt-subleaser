import { AppContext } from "/src/components/AppState.js";
import { useContext } from "react";

export default function MaxRoommatesMenu() {
  let { maxRoommates, setMaxRoommates } = useContext(AppContext);

  return (
    <>
      <span className="flex items-center">
        <span className="text-sm font-medium text-gray-900">Max Roommates</span>
      </span>
      <span className="block mb-2 text-sm text-gray-500">
        Maximum total rooms in house
      </span>

      <input
        className="w-full p-1 border border-gray-400 rounded"
        type="number"
        min="1"
        value={maxRoommates}
        onChange={(e) => {
          if (e.target.value === "") {
            setMaxRoommates(0);
          } else {
            setMaxRoommates(e.target.value);
          }
        }}
      ></input>
    </>
  );
}
