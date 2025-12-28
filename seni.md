```mermaid
graph TD;
    %% ノード定義
    List[一覧<br>GET<br>/menu2]
    New[新規登録<br>GET<br>/menu2/create]
    NewProc[新規登録処理<br>POST<br>/menu2/add]
    Detail[詳細表示<br>GET<br>/menu2/:id]
    Edit[編集<br>GET<br>/menu2/edit/:id]
    UpdateProc[更新処理<br>POST<br>/menu2/update]
    DelConfirm[削除確認<br>GET<br>/menu2/delete/:id]
    DelProc[削除処理<br>POST<br>/menu2/delete/:id]

    %% 新規登録フロー（左側）
    List --> New
    New --> List
    New --> NewProc
    NewProc --> New
    NewProc --> List

    %% 詳細・編集フロー（中央）
    List --> Detail
    Detail --> Edit
    Edit --> UpdateProc
    UpdateProc --> List

    %% 削除フロー（右側）
    Detail --> DelConfirm
    DelConfirm --> DelProc
    DelProc --> List
```

