import { useSelector } from "react-redux";

import classes from "./ProfileImg.module.css";

const ProfileImg = ({ profilePicBase64, className, charecterClassName, children }) => {
  const userObj = useSelector(state => state.login.userObject);
  const divClasses = classes["profile-photo"] + (className ? " " + className : "");
  const spanClasses = classes["profile-photo__empty"] + (charecterClassName ? " " + charecterClassName : "");

  const profilePic = profilePicBase64 ? profilePicBase64 : userObj ? (userObj["Image"] ? userObj["Image"] : null) : null;
  return (
    <div className={divClasses}>
      {profilePic ? <img src={profilePic} className={classes["profile-photo__img"]} alt="Profile pic" /> : null}
      {children}
      <span className={spanClasses}>{userObj["UserName"] ? userObj["UserName"][0] : ""}</span>
    </div>
  );
};

export default ProfileImg;
