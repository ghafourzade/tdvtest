import classes from "./Input.module.css";

const Input = ({ className, valid, touched, ...props }) => {
  touched = touched !== undefined && touched !== null ? touched : false;
  valid = valid !== undefined && valid !== null ? valid : false;
  const validationClasses = touched && !valid ? classes["invalid"] : touched && valid ? classes["valid"] : null;
  const inputClasses = (className ? className + " " : "") + (validationClasses ? validationClasses + " " : "") + classes["input"];
  return <input className={inputClasses} {...props} />;
};

export default Input;
