import { Link } from "react-router-dom";
import { authService } from "fbase";

function Nav({ isLoggedIn }) {
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
      <li>
        {isLoggedIn ? (
          <button
            onClick={function (event) {
              authService.signOut(); // 파이어베이스 로그아웃 처리
            }}
          >
            Logout
          </button>
        ) : (
          <>로그인 되어있지 않음</>
        )}
      </li>
    </ul>
  );
}

export default Nav;
