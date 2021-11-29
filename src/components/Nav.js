import { Link } from "react-router-dom";

function Nav() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/edit">EditProfile</Link>
      </li>
    </ul>
  );
}

export default Nav;
