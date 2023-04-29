import { useTheme } from "next-themes";
import { MoonIcon } from "@heroicons/react/24/solid";
import { SunIcon } from "@heroicons/react/20/solid";

export default function Toggle() {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    if (!document.documentElement.classList.contains("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  let iconClasses =
    "p-2.5 hover:bg-gray-200 rounded-full outline outline-0 bordershadow-scale-600 outline-gray-200";

  return theme === "dark" ? (
    <button className={iconClasses} onClick={toggle}>
      <SunIcon className="h-6 w-6" />
    </button>
  ) : (
    <button className={iconClasses} onClick={toggle}>
      <MoonIcon className="h-6 w-6" />
    </button>
  );
}
