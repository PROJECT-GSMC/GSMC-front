interface CheckedProps {
  isChecked: boolean;
}

const Checked = ({ isChecked }: CheckedProps) => {
  return (
    <svg
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.75 3H5.25C4.00736 3 3 4.00736 3 5.25V18.75C3 19.9926 4.00736 21 5.25 21H18.75C19.9926 21 21 19.9926 21 18.75V5.25C21 4.00736 19.9926 3 18.75 3Z"
        fill={isChecked ? "#5E97FC" : "none"}
        stroke="#5E97FC"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 8.25L10.2 15.75L7.5 12.75"
        fill="none"
        stroke={isChecked ? "white" : "black"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Checked;
