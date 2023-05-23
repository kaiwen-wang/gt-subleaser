import { getCurrentDate, getOffsetDate } from "@/utils/date.js";
import { useState } from "react";

export default function Timing() {
  const [moveInDate, setMoveInDate] = useState(getCurrentDate());

  let minMoveInDate = getOffsetDate();
  let maxMoveInDate = getOffsetDate(1);

  const handleMoveInChange = (event) => {
    let inputValue = event.target.value;

    // Check if the input value is within the min and max range
    if (inputValue < minMoveInDate) {
      inputValue = minMoveInDate;
    } else if (inputValue > maxMoveInDate) {
      inputValue = maxMoveInDate;
    }

    setMoveInDate(inputValue);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className=" sm:grid-cols-2 grid grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="move_in"
            className="block mb-2 text-lg font-medium"
            id="move_in"
          >
            Earliest Move-in
          </label>
          <input
            type="date"
            name="move_in"
            className="w-full p-2 border border-gray-400 rounded"
            min={minMoveInDate}
            // max is currentDate plus one year
            max={maxMoveInDate}
            onChange={handleMoveInChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="move_out"
            className="block mb-2 text-lg font-medium"
            id="move_out"
          >
            Latest Move-out
          </label>
          <input
            type="date"
            name="move_out"
            className="w-full p-2 border border-gray-400 rounded"
            // minimum move out day is the day after move-in. not sure why anyone would sublease a single day though lol
            min={moveInDate}
            // max date is moveInDate plus 2 year
            max={getOffsetDate(2, 0, 0, moveInDate)}
            required
          />
        </div>
      </div>
    </div>
  );
}
