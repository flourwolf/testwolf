import {
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot
} from "./firebase.js";

const roomInput = document.getElementById("roomId");
const statusText = document.getElementById("status");
const phaseText = document.getElementById("phase");
const joinButton = document.getElementById("joinButton");
const dayButton = document.getElementById("dayButton");
const nightButton = document.getElementById("nightButton");

let roomRef = null;
let unsubscribe = null;

function setStatus(message) {
  statusText.textContent = message;
}

function showError(action, error) {
  console.error(action, error);
  const detail = error?.code || error?.message || "詳細不明";
  setStatus(`${action}に失敗しました：${detail}`);
}

// 部屋に接続する
joinButton.addEventListener("click", async () => {
  const roomId = roomInput.value.trim();

  if (!roomId) {
    setStatus("部屋番号を入力してください。");
    roomInput.focus();
    return;
  }

  // 前の部屋の変更通知を解除する
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }

  roomRef = doc(db, "rooms", roomId);
  setStatus(`部屋「${roomId}」に接続しています...`);
  joinButton.disabled = true;

  try {
    // 既存の部屋を上書きしない。存在しない場合だけ初期データを作る。
    const roomSnapshot = await getDoc(roomRef);
    if (!roomSnapshot.exists()) {
      await setDoc(roomRef, {
        phase: "day",
        day: 1
      });
    }

    // 部屋データが更新されるたび、画面の表示を更新する
    unsubscribe = onSnapshot(
      roomRef,
      (snapshot) => {
        if (!snapshot.exists()) {
          phaseText.textContent = "部屋データがありません";
          return;
        }

        const data = snapshot.data();
        const phaseLabel = data.phase === "day"
          ? "昼"
          : data.phase === "night"
            ? "夜"
            : (data.phase || "不明");
        const day = Number.isFinite(data.day) ? data.day : 1;

        phaseText.textContent = `${day}日目：${phaseLabel}`;
        setStatus(`部屋「${roomId}」に接続中です。`);
      },
      (error) => showError("リアルタイム受信", error)
    );
  } catch (error) {
    roomRef = null;
    showError("部屋への接続", error);
  } finally {
    joinButton.disabled = false;
  }
});

async function changePhase(phase) {
  if (!roomRef) {
    setStatus("先に部屋に接続してください。");
    return;
  }

  try {
    await updateDoc(roomRef, { phase });
    // 画面表示は onSnapshot が更新する
  } catch (error) {
    showError("フェーズの変更", error);
  }
}

dayButton.addEventListener("click", () => changePhase("day"));
nightButton.addEventListener("click", () => changePhase("night"));

setStatus("JavaScriptを読み込みました。部屋に接続してください。");
console.log("game.js 読み込み成功");
