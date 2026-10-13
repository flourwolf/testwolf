import { initializeApp } from
  "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";

import { getFirestore } from
  "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

// Firebaseコンソールで取得した設定
const firebaseConfig = {
  apiKey: "AIzaSyBedSic94anZQTk0TC62Pfar_v-FlhI3xg",
  authDomain: "coyote-b7688.firebaseapp.com",
  projectId: "coyote-b7688",
  storageBucket: "coyote-b7688.firebasestorage.app",
  messagingSenderId: "465242376592",
  appId: "1:465242376592:web:0cf0ca64e94bbd81410b15",
  measurementId: "G-4WC9E8V4CZ"
};

// Firebaseを初期化
const app = initializeApp(firebaseConfig);

// Firestoreを利用する準備
export const db = getFirestore(app);
