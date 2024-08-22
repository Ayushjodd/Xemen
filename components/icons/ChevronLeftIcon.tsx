export default function ChevronLeftIcon({
  className,
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}
