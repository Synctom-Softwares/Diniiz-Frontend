import { cn } from "../../../lib/utils";

const MainButton = ({ children, radius = "rounded-4xl", onClick, className = "", ...props }) => {
  return (
    <button
      className={cn(`bg-primary hover:scale-105 text-white font-medium py-2 px-2 ${radius} shadow-md shadow-gray-400 ${className}`)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default MainButton;