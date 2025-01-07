"use strict";
const express = require("express");
const app = express();//



app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log( req.query );
  const num1 = Number( req.query.num1 );
  const num2 = Number( req.query.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log( req.body );
  const num1 = Number( req.body.num1 );
  const num2 = Number( req.body.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

// これより下はBBS関係



let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える
let nextId = 1; // 次の投稿ID


// 新しい投稿を取得する
app.post("/read", (req, res) => {
  const start = Number(req.body.start);
  console.log("read -> " + start);
  if (start === 0) res.json({ messages: bbs });
  else res.json({ messages: bbs.slice(start) });
});

// 新しい投稿を追加する
app.post("/post", (req, res) => {
  const name = req.body.name || "匿名";
  const message = req.body.message || "";
  console.log([name, message]);

  const newPost = { id: nextId++, name, message };
  bbs.push(newPost);
  res.json({ number: bbs.length });
});

// 全投稿を取得する（GETリクエスト）
app.get("/bbs", (req, res) => {
  console.log("GET /BBS");
  res.json(bbs);
});

// 特定の投稿を取得する
app.get("/bbs/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("GET /BBS/" + id);
  const post = bbs.find((p) => p.id === id);
  if (post) res.json(post);
  else res.status(404).json({ error: "投稿が見つかりません。" });
});

// 特定の投稿を更新する
app.put("/bbs/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("PUT /BBS/" + id);

  const post = bbs.find((p) => p.id === id);
  if (post) {
    post.name = req.body.name || post.name;
    post.message = req.body.message || post.message;
    res.json(post);
  } else {
    res.status(404).json({ error: "投稿が見つかりません。" });
  }
});

// 特定の投稿を削除する
app.delete("/bbs/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("DELETE /BBS/" + id);

  const index = bbs.findIndex((p) => p.id === id);
  if (index !== -1) {
    const deletedPost = bbs.splice(index, 1);
    res.json(deletedPost[0]);
  } else {
    res.status(404).json({ error: "投稿が見つかりません。" });
  }
});

let savedValue = null; // ラジオボタンで選択された値を保存する変数

// POSTリクエストで値を保存
//app.post('/save', (req, res) => {
  //  const { value } = req.body; // クライアントから送られた値を取得
    //if (!value) {
      //  return res.status(400).json({ error: "値が送られていません。" });
    //}

    //savedValue = value; // 値を保存
    //console.log("保存された値:", savedValue);
    //res.json({ savedValue }); // 保存された値をクライアントに返す
//});

// 値を取得するためのGETエンドポイント
app.get('/get_saved_value', (req, res) => {
    res.json({ savedValue }); // 現在保存されている値を返す
});

let total = 0; // 数値の合計を保存する変数

// POSTリクエストで値を保存し合計を更新
app.post('/save', (req, res) => {
    const { value } = req.body; // クライアントから送られた値を取得
    if (!value || isNaN(value)) {
        return res.status(400).json({ error: "数値が送られていません。" });
    }

    const numValue = Number(value); // 数値型に変換
    total += numValue; // 合計値を更新
    console.log("現在の合計:", total);
    res.json({ total }); // 合計値をクライアントに返す
});


app.post('/update_total', (req, res) => {
  const value = Number(req.body.value); // クライアントから送られた値
  if (!isNaN(value)) {
      total += value; // 合計値を更新
      res.json({ success: true, total });
  } else {
      res.status(400).json({ success: false, error: "Invalid value" });
  }
});


// 合計値を取得するエンドポイント
app.get('/get_total', (req, res) => {
  console.log(req.method); // リクエストメソッドをログに出力して使用
  res.json({ total });     // サーバー上の total をクライアントに返す.
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));