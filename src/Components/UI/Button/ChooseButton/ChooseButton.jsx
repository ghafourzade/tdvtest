import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import classes from "./ChooseButton.module.css";

const ChooseButton = ({ icon, title, desc, className, children, onClick }) => {
  const chooseBtnAreaClasses = classes["choose-btn"] + (className ? " " + className : "");
  return (
    <div className={chooseBtnAreaClasses}>
      <div className={classes["choose-btn__header"]}>
        <FontAwesomeIcon icon={icon} className={classes["choose-btn__icon"]} />
        <h2 className={classes["choose-btn__title"]}>{title}</h2>
      </div>
      <p className={classes["choose-btn__desc"]}>{desc}</p>
      {children}
      <Button className={classes["choose-btn__btn"]} onClick={onClick}>
        شرکت در آزمون
      </Button>
    </div>
  );
};

export default ChooseButton;
