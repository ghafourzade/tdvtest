import classes from "./Select.module.css";

const Select = ({ children, className, ...props }) => {
  const selectClasses = classes["select"] + (className ? " " + className : "");
  return (
    <select className={selectClasses} {...props}>
      {children}
    </select>
  );
};

export default Select;
