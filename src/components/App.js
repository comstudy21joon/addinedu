//import AppRouter from "./Router";
import AppRouter from "components/Router";
import { useEffect, useState } from "react";

import { authService, dbService, storageService } from "fbase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  // 사용자 정보 저장
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      //console.log(user);
      if (user) {
        setIsLoggedIn(user);
        //console.log("uid =>", user.uid); // test@comstudy.com : vAFlhWtsJqObk9bBVXDFKtW2BMd2
        //console.log(user.email);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  return (
    <div>
      <h1>안부 묻기</h1>
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
    </div>
  );
}

export default App;
