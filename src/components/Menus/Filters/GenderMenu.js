import { AppContext } from "/src/components/AppState.js";
import { useContext } from "react";

export default function GenderMenu() {
  let { genderPreference, setGenderPreference } = useContext(AppContext);

  return (
    <>
      <span className="flex items-center">
        <span className="text-sm font-medium text-gray-900">Your Gender</span>
      </span>
      <span className="block mb-2 text-sm text-gray-500">
        Show gender-specific subleases
      </span>

      <select
        className="w-full p-1 mt-1 border border-gray-400 rounded"
        onChange={(e) => {
          setGenderPreference(e.target.value);
        }}
        value={genderPreference ? genderPreference : "not-important"}
      >
        <option value="not-important">Not Important</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>
    </>
  );
}
