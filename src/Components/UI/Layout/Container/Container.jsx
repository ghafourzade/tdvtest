import classes from "./Container.module.css";

const Container = ({ className, children, ...props }) => {
  const containerClasses = classes["container"] + (className ? " " + className : "");
  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

export default Container;
