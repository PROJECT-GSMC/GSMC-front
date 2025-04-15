interface MinusProps {
  className: string;
}

export const Minus = ({ className }: MinusProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={`${className} transition-colors duration-200`}
    >
      <path
        d="M5.40039 12H18.5997"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
