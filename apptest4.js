"use strict";
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

let brand2 = [
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

let menu2 = [
  { entry_number: 1, id: "AA01", cost: 300, name: "辛味チキン" },
  { entry_number: 2, id: "AA02", cost: 400, name: "アロスティチーニ" },
  { entry_number: 3, id: "AA04", cost: 300, name: "ポップコーンシュリンプ" },
  { entry_number: 4, id: "AA05", cost: 400, name: "エスカルゴのオーブン焼き" },
  { entry_number: 5, id: "AA07", cost: 400, name: "チェリソー（辛味ソーセージ）" },
  { entry_number: 6, id: "AA10", cost: 400, name: "ムール貝のガーリック焼き" },
  { entry_number: 7, id: "AA12", cost: 300, name: "ほうれん草のくたくた" },
  { entry_number: 8, id: "AA13", cost: 200, name: "爽やかにんじんサラダ" },
  { entry_number: 9, id: "AA15", cost: 300, name: "カチッとポテト" },
  { entry_number: 10, id: "AA16", cost: 400, name: "プロシュート" },
  { entry_number: 11, id: "AA18", cost: 350, name: "煉獄のたまご" },
  { entry_number: 12, id: "AA19", cost: 300, name: "ブロッコリーのくたくた" },
  { entry_number: 13, id: "AA20", cost: 300, name: "バッファローモッツァレラ" },
  { entry_number: 14, id: "AA25", cost: 400, name: "柔らか青豆とペコリーノの温サラダ" },
  { entry_number: 15, id: "AA26", cost: 400, name: "イタリア風もつ煮込み" },
  { entry_number: 16, id: "AA52", cost: 800, name: "アロスティチーニWサイズ" },
  { entry_number: 17, id: "AA70", cost: 600, name: "バッファローモッツァレラWサイズ" }
];



// 一覧表示
app.get("/pokemon2", (req, res) => {
  res.render('pokemon2', {data: pokemon2} );
});

// 追加実行
app.post("/pokemon2", (req, res) => {
  let newdata = { id: req.body.id, type1: req.body.type1, type2: req.body.type2, name: req.body.name, kind: req.body.kind };
  pokemon2.push(newdata);
  res.redirect('/pokemon2');
});

// 詳細表示
app.get("/pokemon2/:number", (req, res) => {
  res.render('pokemon2_detail', {id: req.params.number, data: pokemon2[req.params.number]});
});

// 更新実行 (本来はPUTだが、ブラウザ制限のためPOSTで代用しURLは詳細と同じにする)
app.post("/pokemon2/:number", (req, res) => {
  const num = req.params.number;
  if (req.body._method === 'DELETE') { // 削除の場合
    pokemon2.splice(num, 1);
  } else { // 更新の場合
    pokemon2[num] = { ...pokemon2[num], ...req.body };
  }
  res.redirect('/pokemon2');
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
