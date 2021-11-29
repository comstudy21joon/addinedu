import { authService } from "fbase";

function Home() {
  return (
    <div>
      <h3>Home page</h3>
      <button
        onClick={function (event) {
          authService.signOut(); // 파이어베이스 로그아웃 처리
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
