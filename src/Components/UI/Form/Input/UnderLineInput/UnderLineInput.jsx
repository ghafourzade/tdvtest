import classes from "./UnderLineInput.module.css";

const UnderLineInput = ({ className, ...props }) => {
  const divClasses = classes["underline-input"] + (className ? " " + className : "");
  return (
    <div className={divClasses}>
      <input className={classes["underline-input__input"]} {...props} />
      <span className={classes["underline"]}></span>
    </div>
  );
};

export default UnderLineInput;
