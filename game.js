import { db } from "./firebase.js";

import {
  db,
  doc,
  setDoc,
  updateDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";


let roomRef = null;
let unsubscribe = null;

const phaseText = document.getElementById("phase");

// 部屋に接続する
document.getElementById("joinButton").onclick = async () => {
  const roomId = document.getElementById("roomId").value.trim();

  if (!roomId) {
    alert("部屋番号を入力してください");
    return;
  }

  if (unsubscribe) unsubscribe();

  roomRef = doc(db, "rooms", roomId);

  try {
    // 部屋がなければ初期データを作る
    await setDoc(roomRef, {
      phase: "day",
      day: 1
    }, { merge: true });

    // データの変更を自動で受け取る
    unsubscribe = onSnapshot(roomRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        phaseText.textContent =
          `${data.day}日目：${data.phase === "day" ? "昼" : "夜"}`;
      }
    });
  } catch (error) {
    console.error(error);
    alert("接続に失敗しました。設定や権限を確認してください。");
  }
};

// 昼にする
document.getElementById("dayButton").onclick = async () => {
  if (!roomRef) return alert("先に部屋に接続してください");

  try {
    await updateDoc(roomRef, { phase: "day" });
  } catch (error) {
    console.error(error);
    alert("変更できませんでした");
  }
};

// 夜にする
document.getElementById("nightButton").onclick = async () => {
  if (!roomRef) return alert("先に部屋に接続してください");

  try {
    await updateDoc(roomRef, { phase: "night" });
  } catch (error) {
    console.error(error);
    alert("変更できませんでした");
  }
};

document.getElementById("status").textContent =
  "JavaScriptは正常に読み込まれました！";
console.log("game.js 読み込み成功");
