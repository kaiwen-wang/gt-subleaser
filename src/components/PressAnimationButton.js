import React, { useRef } from "react";
// import "./PressAnimationButton.css";

const PressAnimationButton = () => {
  const buttonRef = useRef();
  const overlayRef = useRef();

  const handleMouseDown = (event) => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const x = event.clientX - buttonRect.left;
    const y = event.clientY - buttonRect.top;

    overlayRef.current.style.left = `${x}px`;
    overlayRef.current.style.top = `${y}px`;
    overlayRef.current.style.opacity = 1;
    overlayRef.current.style.animation = "buttonPress 0.5s linear";
  };

  const handleMouseUp = () => {
    overlayRef.current.style.animation = "";
    setTimeout(() => {
      overlayRef.current.style.opacity = 0;
    }, 100);
  };

  return (
    <button
      ref={buttonRef}
      className="relative overflow-hidden rounded px-4 py-2 text-white bg-blue-500"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      Press me
      <span
        ref={overlayRef}
        className="pointer-events-none absolute h-full w-full opacity-0 bg-gray-500"
      ></span>
    </button>
  );
};

export default PressAnimationButton;
