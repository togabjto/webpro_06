const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

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
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement ='';
  if( num==1 ) cpu = 'ぐー';
  else if( num==2 ) cpu = 'ちょき';
  else cpu = 'ぱー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  if( hand=='ぐー'){
    if( cpu=='ぐー') {judgement ='あいこ';}
    else if( cpu='ちょき') {judgement='かち';  win += 1;} // 買った時だけふやす
    else {judgement='負け';}}
    
  else if( hand=='ちょき'){
    if( cpu=='ぐー') {judgement ='負け';}
    else if( cpu='ちょき') {judgement='あいこ';}
    else {judgement='かち';  win += 1;} } // 買った時だけふやす
      
  else if( hand=='ぱー'){
    if( cpu=='ぐー') {judgement ='かち';  win += 1;}  // 買った時だけふやす
    else if( cpu='ちょき') {judgement='負け';}
    else {judgement='あいこ';}}
  
  else judgement = 'command not hand';
  //if( hand!='ぐー','ちょき','ぱー') judgement = 'command not hand';

  

  total += 1;
  const display = {  // 変数動いてるかチェック
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});


app.get("/select", (req, res) => {

  let cup = req.query.cup;
  let judgement ;//直しました！
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  
  if( num==1 ) cpu = '右';
  else if( num==2 ) cpu = '左';
  else cpu ='真ん中';

  if(cpu==cup) judgement='🎉💎congrdatulation🎁✨';
  else judgement=cpu;
  res.render('select', { judgement: judgement });
  console.log(`判定結果: ${cup}`);
})
//-------------------
app.get("/pokemon", (req, res) => {
  let name = req.query.name;
  let judgement ;//直しました！


  if( name=='ピカチュウ')
    {judgement ='電気ネズミポケモン';}
    
  else if( name=='ヒトカゲ')
    {judgement ='トカゲポケモン';}

  else if( name=='フシギダネ')
    {judgement ='たねポケモン';}

  else if( name=='ゼニガメ')
    {judgement ='かめのこポケモン';}
  
  else judgement = 'ケツバン';

  console.log(`ユーザーが選んだのは: ${name}`);
  console.log(`CPUが選んだのは: ${judgement}`);

  res.render('pokemon', { judgement: judgement });

})

app.listen(8080, () => console.log("Example app listening on port 8080!"));


