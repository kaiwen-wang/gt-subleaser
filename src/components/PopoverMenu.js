import { useState } from "react";
import { Popover } from "@headlessui/react";
import { usePopper } from "react-popper";

import { BsFillCaretDownFill } from "react-icons/bs";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function PopoverMenu({
  props,
  name,
  isActive,
  contextSetter,
  defaultValue,
}) {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let [arrowElement, setArrowElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: "arrow", options: { element: arrowElement, padding: 8 } },
    ],
  });

  return (
    <Popover>
      <Popover.Button
        ref={setReferenceElement}
        className={`
                ui-open:text-opacity-20 ${
                  isActive ? "bg-gray-200/80" : "bg-white "
                }
                 bordershadow-scale-600 group inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium outline outline-0 outline-gray-200 text-gray-700 hover:bg-gray-100`}
      >
        <span className="whitespace-nowrap">{name}</span>
        {isActive ? (
          <div className="relative flex items-center pl-1 pr-[1.13rem] ">
            <XMarkIcon
              className={`
        absolute left-0 ml-1 w-7 shrink-0 rounded px-1 py-1 hover:bg-gray-300`}
              onClick={(e) => {
                e.preventDefault();
                contextSetter(defaultValue);
              }}
            />
          </div>
        ) : (
          <BsFillCaretDownFill
            className={`
                   ml-2 h-2 w-2  group-hover:text-opacity-80`}
            aria-hidden="true"
          />
        )}
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        style={{ ...styles.popper }}
        {...attributes.popper}
        className="absolute left-0 z-10 mt-2 px-4"
      >
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
          <div className="p-4 bg-gray-50">
            <div className="flow-root rounded-md px-2 py-2 transition hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
              {props}
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
