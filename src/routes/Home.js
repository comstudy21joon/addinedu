import { authService, dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import Message from "./Message";

function Home({ userObj }) {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  // async function getMsgList() {
  //   const dbMsg = await dbService.collection("messages").get();
  //   dbMsg.forEach((doc) => {
  //     // 이전 msgs에 새로운 데이터를 삽입한다.
  //     var rowData = doc.data();
  //     rowData.id = doc.id;
  //     setMesgs(function (prev) {
  //       return [rowData, ...prev];
  //     });
  //   });
  // }

  useEffect(() => {
    //getMsgList();
    // 실시간으로 갱신되도록 변경하기
    // 이벤트 핸들러 사용 - .get() 대신 .onSnapshot() 으로 대체
    dbService.collection("messages").onSnapshot((snapshot) => {
      const newMsgs = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setMsgs(newMsgs);
    });
  }, []);

  async function onSubmit(event) {
    event.preventDefault();
    var newData = {
      text: msg,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorEmail: userObj.email,
    };
    await dbService.collection("messages").add(newData);
    setMsg("");
  }

  function onChange(event) {
    event.preventDefault();
    setMsg(event.target.value);
  }

  return (
    <div>
      <h3>Home page</h3>
      <form onSubmit={onSubmit}>
        <input
          value={msg}
          onChange={onChange}
          type="text"
          placeholder="무슨 생각을 하고 있나요?"
          maxLength={120}
        />
        <input type="submit" value="기록하기" />
      </form>
      {/* msgs.map()을 이용해서 목록으로 출력하라. 또는 for문도 가능 */}
      <div>
        <h4>메세지 목록</h4>
        <ul>
          {msgs.map((msg) => {
            return <Message key={msg.id} msg={msg} userObj={userObj}></Message>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Home;
