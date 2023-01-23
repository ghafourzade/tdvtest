import classes from "./Card.module.css";

const Card = ({ children, className }) => {
  const cardClasses = (className ? className + " " : "") + classes.card;
  return <div className={cardClasses}>{children}</div>;
};

export default Card;
