import classes from "./Button.module.css";

const Button = ({ children, className, ...props }) => {
  const btnClasses = (className ? className + " " : "") + classes["button"];
  return (
    <button className={btnClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
