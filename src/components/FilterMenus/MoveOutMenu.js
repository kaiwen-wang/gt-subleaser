import { AppContext } from "/src/components/AppState.js";
import { getCurrentDate } from "@/utils/date";
import { useContext, useEffect } from "react";

export default function MoveOutMenu() {
  let { moveOut, setMoveOut } = useContext(AppContext);

  return (
    <>
      <span className="flex items-center">
        <span className="text-sm font-medium text-gray-900">Move Out Date</span>
      </span>
      <span className="block mb-2 text-sm text-gray-500">
        Last day you'll stay
      </span>

      <input
        className="w-full p-2 border border-gray-400 rounded"
        type="date"
        min={getCurrentDate()}
        value={moveOut}
        onChange={(e) => {
          setMoveOut(e.target.value);
        }}
      />
    </>
  );
}
