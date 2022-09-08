import Card from "../../UI/Card/Card";
import Input from "../../UI/Form/Input/Input/Input";

import classes from "./Profile.module.css";

const Profile = () => {
  return (
    <Card className={classes["profile-card"]}>
      <form className={classes["card__inner"]}>
        <div className={classes["profile-photo"]}>
          <span className={classes["profile-photo__empty"]}>A</span>
        </div>
        <label>نام</label>
        <Input />
        <label>جنسیت</label>
        <Input />
        <label>سن</label>
        <Input />
      </form>
    </Card>
  );
};

export default Profile;
