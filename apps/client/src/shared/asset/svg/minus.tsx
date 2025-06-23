interface MinusProps {
  className: string;
}

export const Minus = ({ className }: MinusProps) => {
  return (
    <svg
      className={`${className} transition-colors duration-200`}
      fill="none"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.40039 12H18.5997"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
