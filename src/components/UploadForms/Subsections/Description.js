import { useState } from "react";
import { AppContext } from "/src/components/AppState";
import { useContext } from "react";
export default function Description() {
  let { formDescription: description, setFormDescription: setDescription } =
    useContext(AppContext);

  return (
    <>
      <label
        htmlFor="description"
        className=" block mb-2 text-lg font-medium"
        id="description"
      >
        Description
      </label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
        maxLength="1000"
        rows="7"
        name="description"
        className="w-full px-4 py-2 border border-gray-400 rounded-md"
        placeholder="What qualities does your place have? What are your roommates like? Is there a certain culture in the house? What floor are you on? All the technical details are listed in this form, so this is your spot to clarify anything."
        required
      ></textarea>
      <p className="text-sm text-right text-gray-600">
        {1000 - description.length} characters remaining
      </p>
    </>
  );
}
