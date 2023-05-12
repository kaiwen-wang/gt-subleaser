import Image from "next/image";
import { useEffect, useState } from "react";

export default function ApplianceSelect({ imgsrc, name, setList, list, selectedDefault }) {
  const [selected, setSelected] = useState(selectedDefault);

  const toggleActive = () => {
    if (list === undefined) {
      setList([name]);
    } else if (list.includes(name)) {
      setList(list.filter((item) => item !== name));
    } else {
      setList([...list, name]);
    }
    setSelected(!selected);
  };

  const classes = `cursor-pointer rounded-md px-3 pb-2 pt-3 outline outline-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${selected ? "bg-gray-100 outline-gray-800" : "hover:bg-gray-100"
    }`;

  return (
    <div className={classes} tabIndex={0} onClick={toggleActive}>
      <Image src={imgsrc} alt={name} width="24" height="24" className="" />
      <p>{name}</p>
    </div>
  );
}
