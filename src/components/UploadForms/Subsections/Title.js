import { useState } from "react";
import { FormContext } from "/src/components/FormState";
import { useContext } from "react";

export default function Title({ daReffy }) {
  let { formTitle: title, setFormTitle: setTitle } = useContext(FormContext);

  return (
    <>
      <label
        htmlFor="title"
        className="block mb-2 text-lg font-medium"
        id="title"
      >
        Title
      </label>
      <input
        ref={daReffy}
        type="text"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value.slice(0, 50))}
        maxLength="50"
        className="w-full px-4 py-2 border border-gray-400 rounded-md"
        placeholder="A title goes here"
        required
      />
      <p className="text-sm text-right text-gray-600">
        {50 - title.length} characters remaining
      </p>
    </>
  );
}
