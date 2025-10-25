"use strict";
const express = require("express");
const app = express();


app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));



app.get("/janken", (req, res) => {
  let hand = Number(req.query.hand);
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let player = '';
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';

  if( hand==1 ) player = 'グー';
  else if( hand==2 ) player = 'チョキ';
  else if( hand==3 ) player = 'パー';
  else player = 'null';

  if( num==hand ) judgement = 'あいこ'
  else if ( (num+1==hand) || (num+1==hand+3) ) judgement = 'まけ';
  else if ( (num-1==hand) || (num-1==hand+3) ) judgement = 'かち';
  else judgement = 'error'


  console.log("ok");



  win += 1;
  total += 1;
  const display = {
    your: player,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'jankentest', display );
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
