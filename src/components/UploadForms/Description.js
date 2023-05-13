import { useState } from "react";

export default function Description() {
  const [description, setDescription] = useState("");

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
        onChange={(e) => setDescription(e.target.value.slice(0, 500))}
        maxLength="500"
        rows="5"
        name="description"
        className="w-full px-4 py-2 border border-gray-400 rounded-md"
        placeholder="What qualities does your place have? Are the roommates interesting? What do they study? Is it nice and clean? Is there a certain culture in the house? What floor are you on? All the technical details are listed in this form, so this is your spot to clarify anything."
        required
      ></textarea>
      <p className="text-sm text-right text-gray-600">
        {500 - description.length} characters remaining
      </p>
    </>
  );
}
