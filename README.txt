人狼ゲーム Firebase 接続テスト版

同梱ファイル:
- index.html
- firebase.js
- game.js

設置方法:
1. この3ファイルを GitHub リポジトリの同じフォルダ（現在の testwolf の index.html がある場所）に置き換えてください。
2. GitHub にコミット・プッシュし、GitHub Pages に反映させます。
3. 公開ページを開き、「部屋に接続」を押します。
4. 同じ部屋番号を別のブラウザでも開き、「昼にする」「夜にする」を試してください。

注意:
- Firebase Console で Cloud Firestore Database が作成済みである必要があります。
- Firestore のセキュリティルールが読み書きを拒否している場合は接続できません。コンソールに出るエラーコードを確認してください。
- このサンプルは学習用です。現状は認証やGM権限がないため、部屋番号を知る人はフェーズを変更できます。本番ゲームに使う前にアクセス制御を実装してください。
- Firebaseのブラウザ向け設定値（firebaseConfig）はアプリの識別情報です。Firestoreの保護はAPIキーを隠すのではなく、適切なSecurity Rulesや認証で行います。
