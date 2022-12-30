import classes from "./Row.module.css";

const Row = ({className, children, ...props}) => {
  const rowClasses = classes["row"] + (className ? " " + className : "")
  return <div className={rowClasses} {...props}>{children}</div>
}

export default Row;