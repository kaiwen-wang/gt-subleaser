// Layout for
export function ContainerLayout({ children, smallContainer }) {
  return (
    <div
      className={`relative mx-auto ${
        smallContainer
          ? "md:max-w-4xl lg:max-w-5xl xl:max-w-6xl px-4"
          : "px-3 sm:px-8 xl:px-12 3xl:max-w-screen-3xl "
      }`}
    >
      {children}
    </div>
  );
}
