import firebase from "firebase/app";

// 인증키는 .env파일에 숨겨두고 github에 공개되지 않도록 설정해야한다.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "bitcamp2021.firebaseapp.com",
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "bitcamp2021.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-XQG3Z86C4K",
};

// export default를 사용하면 하나의 모듈만 넘겨준다.
export default firebase.initializeApp(firebaseConfig);
