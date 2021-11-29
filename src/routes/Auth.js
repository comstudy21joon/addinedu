import { authService, firebaseInstance } from "fbase";
import { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = function (event) {
    // event.tartget 구조분해
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      //setEmail(event.target.value);
      setEmail(value);
    } else if (name === "password") {
      //setPassword(event.target.value);
      setPassword(value);
    }
  };

  const onSubmit = async function (event) {
    event.preventDefault();

    try {
      var data;
      if (event.target.id === "loginForm") {
        // 로그인 체크
        // 흐름제어. (Promise, Async)
        data = await authService.signInWithEmailAndPassword(email, password);
      } else if (event.target.id === "joinUsForm") {
        // 회원 가입
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      }
      // 저장 결과 data
      console.log(data);
    } catch (error) {
      console.log("error!");
      setError(error.message);
    }
  };

  const onSnsLogin = async function (event) {
    // console.log(event.target.name);
    // fbase.js에  firebase 객체를 사용하도록 설정 필요하다.
    var provider;
    if (event.target.name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (event.target.name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div>
      <h3>Auth page</h3>
      <p style={{ color: "red" }}>{error}</p>
      <h4>로그인</h4>
      <form id="loginForm" onSubmit={onSubmit}>
        <input type="email" name="email" value={email} onChange={onChange} />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <input type="submit" value="Login" />
      </form>
      <div>
        <button name="google" onClick={onSnsLogin}>
          Google Login
        </button>
        <br />
        <button name="github" onClick={onSnsLogin}>
          GitHub Login
        </button>
      </div>
      <hr />
      <h4>회원가입</h4>
      <form id="joinUsForm" onSubmit={onSubmit}>
        사용자 이메일 :{" "}
        <input
          type="email"
          name="email"
          value={email}
          placeholder="이메일 입력"
          onChange={onChange}
        />
        <br />
        비밀번호 :{" "}
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <br />
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
}
