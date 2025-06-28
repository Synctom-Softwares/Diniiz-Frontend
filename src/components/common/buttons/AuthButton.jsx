const AuthButton = ({ children, radius = "rounded-lg", onClick, className = "", ...props }) => {
  return (
    <button
      className={`bg-[#6640ff] hover:scale-105 text-white font-medium py-2 px-6 ${radius} shadow-md shadow-gray-400  ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default AuthButton;