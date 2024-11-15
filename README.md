# webpro_06
2024/10/29
## このプログラムについて
## ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/select.ejs | 選ぶゲームを表示するプログラム
view/pokemon.ejs | ポケモン図鑑を表示するプログラム

```javascript
console.log("hello");
```
## ポケモン図鑑の機能
入力したポケモンの説明を表示する．
対応するポケモンはヒトカゲ，ゼニガメ，フシギダネ，ピカチュウ．


## ポケモン図鑑を使う手順
1. app5.jsを起動する(https://github.com/togabjto/webpro_06/blob/main/app5.js)

1. webブラウザでlocalhost:8080/public/pokemon.ejsにアクセスする(https://github.com/togabjto/webpro_06/blob/main/views/pokemon.ejs)

1. ポケモンの名前を入力


## ポケモン図鑑を実装する手順
```mermaid
graph TD;
    Start["開始"] --> CheckName{"どのポケモン？"}
    
    CheckName -- ピカチュウ --> Pikachu["'電気ネズミポケモン'"]
    CheckName -- ヒトカゲ --> Hitokage["'トカゲポケモン'"]
    CheckName -- フシギダネ --> Fushigidane["'たねポケモン'"]
    CheckName -- ゼニガメ --> Zenigame["'かめのこポケモン'"]
    CheckName -- それ以外 --> Else["'ケツバン'"]
    
    Pikachu --> Render["終了"]
    Hitokage --> Render
    Fushigidane --> Render
    Zenigame --> Render
    Else --> Render

```

## 選ぶゲームの機能
あたりのかっこを選ぶ．
画面に表示されるかっこのうちあたりのものを右，真ん中，左から選ぶ．

## 選ぶゲームをする手順
1. app5.jsを起動する(https://github.com/togabjto/webpro_06/blob/main/app5.js)

2. webブラウザでlocalhost:8080/public/select.ejsにアクセスする(https://github.com/togabjto/webpro_06/blob/main/views/select.ejs)

1. 右，真ん中，左から選ぶ

## 選ぶゲームを実装する手順
```mermaid
graph TD;
    Start["開始"]--> RandomNum["1 から 3 の乱数を生成"]

    RandomNum -->|1| Right["cpu = '右'"]
    RandomNum -->|2| Left["cpu = '左'"]
    RandomNum -->|3| Center["cpu = '真ん中'"]
    
    Right --> CheckMatch["cpu と hand を比較"]
    Left --> CheckMatch
    Center --> CheckMatch

    CheckMatch -- 一致する --> Match["'congrdatulation'"]
    CheckMatch -- 一致しない --> NoMatch["cpuの値"]

    Match --> Render["終了"]
    NoMatch --> Render
```