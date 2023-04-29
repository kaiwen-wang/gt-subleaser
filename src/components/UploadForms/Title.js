
import { useState } from "react";

export default function Title() {
  const [title, setTitle] = useState("");

  return (
    <>
      <label
        htmlFor="title"
        className="mb-2 block  text-lg font-medium"
        id="title"
      >
        Title
      </label>
      <input
        type="text"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value.slice(0, 50))}
        maxLength="50"
        className="w-full rounded-md border px-4  py-2 border-gray-400"
        placeholder="A title goes here"
        required
      />
      <p className="text-right text-sm text-gray-600">
        {50 - title.length} characters remaining
      </p>

    </>
  )
}