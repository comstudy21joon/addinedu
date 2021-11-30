import { dbService } from "fbase";
import { useState } from "react";

export default function Message({ msg, userObj }) {
  const [editing, setEditing] = useState(false);
  const [newMsg, setNewMsg] = useState(msg.text);

  async function onDelClick(objId) {
    console.log("home objId =>", objId);
    // 삭제하기 구현...
    //const data = await dbService.collection("messages").doc(objId).delete();
    const data = await dbService.doc(`messages/${objId}`).delete();
    console.log(data);
  }

  return (
    <li>
      <span style={{ display: "inline-block", width: "400px" }}>
        {editing ? (
          <input
            type="text"
            value={newMsg}
            onChange={function (event) {
              setEditing(event.target.value);
            }}
          />
        ) : (
          <>
            {msg.text}({msg.creatorEmail})
          </>
        )}
      </span>
      {userObj.uid === msg.creatorId ? (
        <>
          <button
            onClick={function (event) {
              console.log("수정기능 >>>", msg.id);
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
