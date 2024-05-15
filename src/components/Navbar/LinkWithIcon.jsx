import { NavLink } from "react-router-dom";
import "./LinkWithIcon.css";

function LinkWithIcon({ emoji, title, link, sidebar }) {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align_center sidebar_link" : "align_center"}
    >
      {title}
      <img src={emoji} alt="home" className="link_emoji" />
    </NavLink>
  );
}

export default LinkWithIcon;
