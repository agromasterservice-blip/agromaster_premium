export function BrandLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-9 h-9 text-[9px]",
    md: "w-12 h-12 text-[11px]",
    lg: "w-20 h-20 text-[14px]"
  };

  return (
    <div
      className={`${sizes[size]} shrink-0 rounded-full bg-ocean flex flex-col items-center justify-center text-white font-extrabold leading-tight tracking-tight text-center`}
    >
      <span>AGM</span>
    </div>
  );
}
