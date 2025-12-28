
```mermaid
sequenceDiagram
  autonumber
  Webブラウザ ->> Webサーバ: Webページの取得
  Webサーバ ->> Webブラウザ:HTML,JS,CSS
  Webブラウザ ->> pokemon2クライアント:起動
  pokemon2クライアント ->> pokemon2サーバ:Post(書き込み)
  pokemon2サーバ ->> pokemon2クライアント:全書き込み数
  pokemon2クライアント ->> pokemon2サーバ:Read(読み込み)
  pokemon2サーバ ->> pokemon2クライアント:掲示データ
  pokemon2クライアント ->> pokemon2サーバ:Check(新規チェック)
  pokemon2サーバ ->> pokemon2クライアント:全書き込み数
```
