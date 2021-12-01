import { dbService, storageService } from "fbase";
import { useState } from "react";

export default function Message({ msg, userObj }) {
  const [editing, setEditing] = useState(false);
  const [newMsg, setNewMsg] = useState(msg.text);

  async function onDelClick(objId) {
    console.log("home objId =>", objId);
    // 삭제하기 구현...
    //const data = await dbService.collection("messages").doc(objId).delete();
    // fireStore에서 데이터 삭제
    await dbService.doc(`messages/${objId}`).delete();
    // storage에서 파일 삭제
    if (msg.imgUrl !== "") {
      // refFromURL() <-- downloadURL을 이용해서 삭제
      await storageService.refFromURL(msg.imgUrl).delete();
    }
  }

  return (
    <li>
      <span style={{ display: "inline-block", width: "400px" }}>
        {editing ? (
          <input
            type="text"
            value={newMsg}
            onChange={function (event) {
              setNewMsg(event.target.value);
            }}
          />
        ) : (
          <>
            {msg.text}({msg.creatorEmail})
          </>
        )}
        {
          // 목록에 사진 보여지는 부분
          msg.imgUrl && <img src={msg.imgUrl} width="120" />
        }
      </span>
      {userObj.uid === msg.creatorId ? (
        <>
          <button
            onClick={function (event) {
              setEditing(!editing);
              if (editing) {
                // newMsg를 db에 반영하기
                dbService.doc(`messages/${msg.id}`).update({ text: newMsg });
              }
            }}
          >
            {editing ? "수정완료" : "수정"}
          </button>
          <button
            onClick={function (event) {
              onDelClick(msg.id);
            }}
          >
            삭제
          </button>
        </>
      ) : (
        <></>
      )}
    </li>
  );
}
