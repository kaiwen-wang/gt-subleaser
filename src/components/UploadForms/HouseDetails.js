import React, { useState, useEffect } from "react";
import { FormContext } from "/src/components/FormState";
import { useContext } from "react";

export default function HouseDetails({
  circleColors,
  setCircleColorsFunction,
  daReffy,
}) {
  // const [privateBathroom, setPrivateBathroom] = useState(false);

  const {
    formTotalBedrooms: totalBedrooms,
    setFormTotalBedrooms: setTotalBedrooms,
  } = useContext(FormContext);
  const { formFreeBedrooms: freeRooms, setFormFreeBedrooms: setFreeRooms } =
    useContext(FormContext);
  const {
    formTotalBathrooms: totalBathrooms,
    setFormTotalBathrooms: setTotalBathrooms,
  } = useContext(FormContext);
  const {
    formFreeBathrooms: freeBathrooms,
    setFormFreeBathrooms: setFreeBathrooms,
  } = useContext(FormContext);

  // useEffect(() => {
  //   setPrivateBathroom(
  //     totalBathrooms >= totalBedrooms && totalBedrooms > 0 && totalBathrooms > 0
  //   );
  // }, [totalBathrooms, totalBedrooms]);

  useEffect(() => {
    if (totalBedrooms - freeRooms >= 0 && freeRooms >= 0) {
      circleColors = new Array(totalBedrooms - freeRooms).fill("M");
      let freeCircleColors = new Array(freeRooms).fill("O");

      circleColors = circleColors.concat(freeCircleColors);
      setCircleColorsFunction(circleColors);
    }
  }, [totalBedrooms, freeRooms]);

  const handleCircleClick = (index) => {
    const newColors = [...circleColors];
    circleColors[index] === "M" ? (newColors[index] = "F") : "";
    circleColors[index] === "F" ? (newColors[index] = "M") : "";
    setCircleColorsFunction(newColors);
  };

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="total_bedrooms"
            className="block mb-2 text-lg font-medium"
          >
            Total Bedrooms
          </label>
          <input
            ref={daReffy}
            value={totalBedrooms}
            type="number"
            id="total_bedrooms"
            name="total_bedrooms"
            className="w-full p-2 border border-gray-400 rounded"
            min="1"
            max="20"
            required
            onWheel={(e) => e.target.blur()}
            onChange={(e) => {
              // if target value is less than 0 then set it to 0
              if (parseInt(e.target.value) < 0) {
                setTotalBedrooms(0);
                // change the value of the input
                e.target.value = 0;
              } else if (parseInt(e.target.value) > 20) {
                // if target value is greater than 20 then set it to 20
                setTotalBedrooms(20);
                // change the value of the input
                e.target.value = 20;
              } else {
                setTotalBedrooms(parseInt(e.target.value));
              }

              // change value of free rooms input html if it is becoming greater than total bedrooms
              if (parseInt(e.target.value) < freeRooms) {
                setFreeRooms(parseInt(e.target.value));
                document.getElementById("free_bedrooms").value = e.target.value;
              }
            }}
          />
        </div>
        <div>
          <label
            htmlFor="total_bedrooms"
            className="block mb-2 text-lg font-medium"
          >
            Free Rooms
          </label>
          <input
            type="number"
            value={freeRooms}
            id="free_bedrooms"
            name="free_bedrooms"
            className="w-full p-2 border border-gray-400 rounded"
            min={1}
            max={totalBedrooms}
            required
            onWheel={(e) => e.target.blur()}
            onChange={(e) => {
              if (parseInt(e.target.value) < 1) {
                // stop the user from entering a num less 1
                setFreeRooms(1);
                // change the value of the input
                e.target.value = 1;
              } else if (parseInt(e.target.value) > totalBedrooms) {
                // stop the user from entering a number greater than total bedrooms
                setFreeRooms(totalBedrooms);
                // change the value of the input
                e.target.value = totalBedrooms;
              } else {
                setFreeRooms(parseInt(e.target.value));
              }
            }}
          />
        </div>
      </div>

      <label
        htmlFor="total_bedrooms"
        className="block mt-4 text-lg font-medium"
      >
        Roommate Demographics
      </label>
      <span>
        Click circles to choose roommate gender for the sublease. Empty circle
        means free room.
      </span>
      <div className="mt-2">
        <div className="box-border flex h-12 p-2 py-2 space-x-2 overflow-hidden overflow-x-auto border border-gray-400 rounded">
          {circleColors.map((color, index) => (
            <div
              key={index}
              className={` h-8 w-8 select-none shrink-0 rounded-full flex items-center justify-center text-white font-semibold ${
                color === "O" ? "border-2 border-black" : ``
              } ${color === "M" ? "bg-blue-500 " : ""} ${
                color === "F" ? "bg-pink-500 " : ""
              }`}
              onClick={() => handleCircleClick(index)}
            >
              {color === "M" ? "M" : ""}
              {color === "F" ? "F" : ""}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block mt-4 mb-2 text-lg font-medium"
            id="total_bathrooms"
          >
            Total Bathrooms
          </label>
          <input
            value={totalBathrooms}
            type="number"
            id="total_bathrooms"
            name="total_bathrooms"
            className="w-full p-2 border border-gray-400 rounded"
            min="1"
            // step="0.5"
            max="20"
            required
            onWheel={(e) => e.target.blur()}
            onChange={(e) => setTotalBathrooms(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label
            className="block mt-4 mb-2 text-lg font-medium"
            id="total_bathrooms"
          >
            Free Bathrooms
          </label>
          <input
            value={freeBathrooms}
            type="number"
            id="free_bathrooms"
            name="free_bathrooms"
            className="w-full p-2 border border-gray-400 rounded"
            min="1"
            // step="0.5"
            max={totalBathrooms}
            required
            onWheel={(e) => e.target.blur()}
            onChange={(e) => setFreeBathrooms(parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* <div className="flex items-center mt-1 mb-2">
        <input
          type="checkbox"
          id="private_bathroom"
          name="private_bathroom"
          className="mr-2"
          checked={privateBathroom}
          onChange={(e) => setPrivateBathroom(e.target.checked)}
        />
        <label htmlFor="private_bathroom" className="text-lg">
          Subleaser has their own bathroom
        </label>
      </div> */}
      {/* <span>If total bathrooms is at least total rooms, we assume each person has a private bathroom. If some people in the house must share but the subleaser still has a private bathroom, please check this box.</span> */}

      <div className="mt-4">
        <label
          className="block text-lg font-medium"
          htmlFor="gender_preference"
        >
          Gender Preference
        </label>
        For example, some apartments are women only and some are men only.
        {/* <div className="grid grid-cols-3 gap-3 mt-2">
          <div className=" flex items-center h-10 gap-2 p-2 border border-gray-400 rounded">
            <div className="bordershadow-scale-600 text-fuchsia-800 flex items-center justify-center w-6 h-6 font-mono text-xs font-medium rounded-sm">
              A
            </div>
            Not Important
          </div>
          <div className=" flex items-center h-10 gap-2 p-2 border border-gray-400 rounded">
            <div className="bordershadow-scale-600 text-fuchsia-800 flex items-center justify-center w-6 h-6 font-mono text-xs font-medium rounded-sm">
              B
            </div>
            Female
          </div>
          <div className=" flex items-center h-10 gap-2 p-2 border border-gray-400 rounded">
            <div className="bordershadow-scale-600 text-fuchsia-800 flex items-center justify-center w-6 h-6 font-mono text-xs font-medium rounded-sm">
              C
            </div>
            Male
          </div>
        </div> */}
        <select
          id="gender_preference"
          name="gender_preference"
          className="w-full p-2 mt-1 border border-gray-400 rounded"
        >
          <option value="not-important">Not Important</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>
    </div>
  );
}
