const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let pokemon = [
  { id:1, type:"JE01", name:"東京駅", change:"総武本線，中央線，etc", passengers:403831, distance:0 },
  { id:2, type:"JE02", name:"八丁堀駅", change:"日比谷線", passengers:31071, distance:1.2 },
  { id:3, type:"JE05", name:"新木場駅", change:"有楽町線，りんかい線", passengers:67206, distance:7.4 },
  { id:4, type:"JE07", name:"舞浜駅", change:"舞浜リゾートライン", passengers:76156,distance:12.7 },
  { id:5, type:"JE12", name:"新習志野駅", change:"", passengers:11655, distance:28.3 },
  { id:6, type:"JE17", name:"千葉みなと駅", change:"千葉都市モノレール", passengers:16602, distance:39.0 },
  { id:7, type:"JE18", name:"蘇我駅", change:"内房線，外房線", passengers:31328, distance:43.0 },
];

let pokemon2 = [
  // 御三家
  { id: 1, type1: "くさ", type2: "ひこう", name: "モクロー", kind: "くさばね" },
  { id: 2, type1: "くさ", type2: "ひこう", name: "フクスロー", kind: "はばね" },
  { id: 3, type1: "くさ", type2: "ゴースト", name: "ジュナイパー", kind: "やばね" },
  { id: 4, type1: "ほのお", type2: "", name: "ニャビー", kind: "ひねこ" },
  { id: 5, type1: "ほのお", type2: "", name: "ニャヒート", kind: "ひねこ" },
  { id: 6, type1: "ほのお", type2: "あく", name: "ガオガエン", kind: "ヒール" },
  { id: 7, type1: "みず", type2: "", name: "アシマリ", kind: "あしか" },
  { id: 8, type1: "みず", type2: "", name: "オシャマリ", kind: "アイドル" },
  { id: 9, type1: "みず", type2: "フェアリー", name: "アシレーヌ", kind: "ソリスト" },

  // 序盤のポケモン
  { id: 10, type1: "ノーマル", type2: "ひこう", name: "ツツケラ", kind: "きつつき" },
  { id: 11, type1: "ノーマル", type2: "ひこう", name: "ケララッパ", kind: "らっぱどり" },
  { id: 12, type1: "ノーマル", type2: "ひこう", name: "ドデカバシ", kind: "おおはし" },
  { id: 13, type1: "ノーマル", type2: "", name: "ヤングース", kind: "はりこみ" },
  { id: 14, type1: "ノーマル", type2: "", name: "デカグース", kind: "はりこみ" },
  { id: 15, type1: "むし", type2: "", name: "アゴジムシ", kind: "ようちゅう" },
  { id: 16, type1: "むし", type2: "でんき", name: "デンヂムシ", kind: "バッテリー" },
  { id: 17, type1: "むし", type2: "でんき", name: "クワガノン", kind: "くわがた" },

  // その他のポケモン（一部）
  { id: 18, type1: "むし", type2: "フェアリー", name: "アブリー", kind: "ツリアブ" },
  { id: 19, type1: "むし", type2: "フェアリー", name: "アブリボン", kind: "ツリアブ" },
  { id: 20, type1: "いわ", type2: "", name: "イワンコ", kind: "こいぬ" },
  { id: 21, type1: "いわ", type2: "", name: "ルガルガン（まひるのすがた）", kind: "オオカミ" },
  { id: 22, type1: "いわ", type2: "", name: "ルガルガン（まよなかのすがた）", kind: "オオカミ" },
  // { id: 104, type1: "いわ", type2: "", name: "ルガルガン（たそがれのすがた）", kind: "オオカミ" }, // ※ウルトラサン・ムーンで追加
  { id: 23, type1: "みず", type2: "", name: "ヨワシ（たんどくのすがた）", kind: "こざかな" },
  { id: 24, type1: "みず", type2: "", name: "ヨワシ（むれのすがた）", kind: "おおうお" },
  { id: 25, type1: "じめん", type2: "", name: "ドロバンコ", kind: "うさぎうま" },
  { id: 26, type1: "じめん", type2: "", name: "バンバドロ", kind: "ばんば" },
];

let Brand = [
  // 御三家
  { entry_number: 1, id: "2340", region: "Japan", name: "極楽湯ホールディングス", buy: 1 },
  { entry_number: 2, id: "4911", region: "Japan", name: "資生堂", buy: 1 },
  { entry_number: 3, id: "7453", region: "Japan", name: "良品計画", buy: 1 },
  { entry_number: 4, id: "9432", region: "Japan", name: "NTT", buy: 1 },
  { entry_number: 5, id: "AMZN", region: "USA", name: "アマゾン・ドット・コム", buy: 1 },
  { entry_number: 6, id: "TSLA", region: "USA", name: "テスラ", buy: 1 },
  { entry_number: 7, id: "ADBE", region: "USA", name: "アドビ", buy: 1 },
  { entry_number: 8, id: "NVDA", region: "USA", name: "エヌビディア", buy: 1 },
  { entry_number: 9, id: "INTC", region: "USA", name: "インテル", buy: 1 },
  ];

let menu = [
  { id: "AA01", cost: 300, name: "辛味チキン" },
  { id: "AA02", cost: 400, name: "アロスティチーニ" },
  { id: "AA04", cost: 300, name: "ポップコーンシュリンプ" },
  { id: "AA05", cost: 400, name: "エスカルゴのオーブン焼き" },
  { id: "AA07", cost: 400, name: "チェリソー（辛味ソーセージ）" }, // ※価格は参考
  { id: "AA10", cost: 400, name: "ムール貝のガーリック焼き" }, // ※価格は参考
  { id: "AA12", cost: 300, name: "ほうれん草のくたくた" }, // ※価格は参考
  { id: "AA13", cost: 200, name: "爽やかにんじんサラダ" }, // ※価格は参考
  { id: "AA15", cost: 300, name: "カチッとポテト" }, // ※価格は参考
  { id: "AA16", cost: 400, name: "プロシュート" }, // ※価格は参考
  { id: "AA18", cost: 350, name: "煉獄のたまご" }, // ※価格は参考
  { id: "AA19", cost: 300, name: "ブロッコリーのくたくた" }, // ※価格は参考
  { id: "AA20", cost: 300, name: "バッファローモッツァレラ" }, // ※価格は参考
  { id: "AA25", cost: 400, name: "柔らか青豆とペコリーノの温サラダ" }, // ※価格は参考
  { id: "AA26", cost: 400, name: "イタリア風もつ煮込み" }, // ※価格は参考
  { id: "AA52", cost: 800, name: "アロスティチーニWサイズ" }, // AA02の倍額として算出
  { id: "AA70", cost: 600, name: "バッファローモッツァレラWサイズ" }  // AA20の倍額として算出
];

app.get("/pokemon", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db1_pokemon', { data: pokemon });
});

app.get("/pokemon_add", (req, res) => {
  let id = req.query.id;
  let type1 = req.query.type1;
  let type2 = req.query.type2;
  let name = req.query.name;
  let newdata = { id: id, type1: type1, type2: type2, name: name };
  pokemon.push( newdata );
  res.redirect('/public/pokemon_add.html');
});

app.get("/pokemon2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('pokemon2', {data: pokemon2} );
});

// Create
app.get("/pokemon2/create", (req, res) => {
  res.redirect('/public/pokemon2_new.html');
});

// Read
app.get("/pokemon2/:number", (req, res) => {
  const number = req.params.number;
  const detail = pokemon2[ number ];

  // ★追加：データが存在しない場合は一覧ページに戻す⭐️
  if (detail === undefined) {
    console.log("エラー: 指定された番号のデータが見つかりません");
    return res.redirect('/pokemon2');
  }

  res.render('pokemon2_detail', {id: number, data: detail} );
});
// Delete
app.get("/pokemon2/delete/:number", (req, res) => {
  const number = req.params.number;
  const detail = pokemon2[number];

  if (detail === undefined) {
    return res.redirect('/pokemon2');
  }
  // 本来は削除の確認ページを表示する
  res.render('pokemon2_delete', { id: number, data: detail });
});
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
app.post("/pokemon2/delete/:number", (req, res) => {
  pokemon2.splice( req.params.number, 1 );
  res.redirect('/pokemon2' );
});

// Create
app.post("/pokemon2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = pokemon2.length + 1;
  const type1 = req.body.type1;
  const type2 = req.body.type2;
  const name = req.body.name;
  const kind = req.body.kind;
  pokemon2.push( { id: id, type1: type1, type2: type2,name: name, kind: kind } );
  console.log( pokemon2 );
  res.render('pokemon2', {data: pokemon2} );
});

// Edit
app.get("/pokemon2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = pokemon2[ number ];
  res.render('pokemon2_edit', {id: number, data: detail} );
});

// Update
app.post("/pokemon2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
// ★追加：データが存在しない場合は処理を中断して一覧に戻す⭐️
  if (pokemon2[number] === undefined) {
    console.log("エラー: 更新しようとしたデータが見つかりません");
    return res.redirect('/pokemon2');
  }
  pokemon2[req.params.number].type1 = req.body.type1;
  pokemon2[req.params.number].type2 = req.body.type2;
  pokemon2[req.params.number].name = req.body.name;
  pokemon2[req.params.number].change = req.body.change;
  pokemon2[req.params.number].passengers = req.body.passengers;
  pokemon2[req.params.number].distance = req.body.distance;
  console.log( pokemon2 );
  res.redirect('/pokemon2' );
});



app.get("/menu", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('dbtest', { data: menu });
});

app.get("/menu_add", (req, res) => {
  let id = req.query.id;
  let cost = req.query.cost;
  let name = req.query.name;
  let newdata = { id: id, cost: cost, name: name };
  menu.push( newdata );
  res.redirect('/public/menu_add.html');
});



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

app.get("/omikuji1", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.send( '今日の運勢は' + luck + 'です' );
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';

  res.render( 'omikuji2', {result:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  let judgement = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  judgement = '勝ち';
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

app.listen(8080, () => console.log("Example app listening on port 8080!"));
