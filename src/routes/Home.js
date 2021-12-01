import { authService, dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";

function Home({ userObj }) {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [imgSrcResult, setImgSrcResult] = useState("");

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
    //------------------------------------------------------------
    // 실행 순서 1)storage에 저장 => 2) fireStore에 저장
    // 파일 이름 중복방지를 위해 고유한 식별자를 만든다. 1)timestamp 사용 2) UUID 라이브러리 이용
    // npm install uuid
    // storage에 user별로 폴더를 따로따로 생성해서 이미지를 저장한다.
    let imgUrl = "";
    if (imgSrcResult !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(imgSrcResult, "data_url");
      imgUrl = await response.ref.getDownloadURL();
    }
    // 이미지 업로드 후 data 기록
    var newData = {
      text: msg,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      creatorEmail: userObj.email,
      imgUrl: imgUrl,
    };
    await dbService.collection("messages").add(newData);
    setMsg("");
    onClearImgSrcResult(null);
  }

  function onChange(event) {
    event.preventDefault();
    setMsg(event.target.value);
  }

  function onFileChange(event) {
    const inputFile = event.target.files[0];
    const fileReader = new FileReader();
    // 파일을 다 읽어 들이면 실행 되는 부분
    fileReader.onloadend = function (fileLoadEvent) {
      setImgSrcResult(fileLoadEvent.target.result);
    };
    // 파일 읽기 시작
    fileReader.readAsDataURL(inputFile);
  }

  function onClearImgSrcResult(event) {
    setImgSrcResult("");
    document.querySelector("#file").value = "";
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
        <input type="file" id="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="기록하기" />
      </form>
      <div>
        선택 사진 미리보기 :
        {imgSrcResult ? (
          <>
            <img width="120" src={imgSrcResult} id="prev_image" />
            <button onClick={onClearImgSrcResult}>CLEAR</button>
          </>
        ) : (
          ""
        )}
      </div>
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
