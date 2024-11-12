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
## ポケモン図鑑を実装する手順
1. app5.jsを起動する

2. webブラウザでlocalhost:8080/public/pokemon.htmlにアクセスする

1. ポケモンの名前を入力

1. pokemonルートにアクセス

1. 入力されたポケモンに応じた解説を返す(対応していないポケモンが入力されたらケツバンと返す)




```mermaid
graph TD;
    Start["/pokemon ルートにアクセス"] --> CheckName{"どのポケモン？"}
    
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
## 選ぶゲームを実装する手順
1. app5.jsを起動する

2. webブラウザでlocalhost:8080/public/select.htmlにアクセスする

1. 右，真ん中，左から選ぶ

1. selectルートにアクセス

1. 入力された選択が合ってたらcongratulation(外れたら答え)
```mermaid
graph TD;
    Start["/select ルートにアクセス"]--> RandomNum["1 から 3 の乱数を生成"]

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