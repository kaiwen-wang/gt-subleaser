import { AppContext } from "/src/components/AppState.js";
import { useContext } from "react";

export default function GenderMenu() {
  let { genderPreference, setGenderPreference } = useContext(AppContext);

  return (
    <>
      <span className="flex items-center">
        <span className="text-sm font-medium text-gray-900">Your Gender</span>
      </span>
      <span className="mb-2 block text-sm text-gray-500">
        Show gender-specific subleases
      </span>

      <select
        className="mt-1 w-full rounded border p-1 border-gray-400"
        onChange={(e) => {
          setGenderPreference(e.target.value);
        }}
        value={genderPreference}
      >
        <option value="not-important">Not Important</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>
    </>
  );
}
