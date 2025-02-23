"use strict";


document.querySelector('#check').addEventListener('click', () => {//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
    // ラジオボタンの値を取得
    const selected = document.querySelector('input[name="team"]:checked');
    if (!selected) {
        console.log("どれか一つ選んでください！");
        return;
    }

    const value = Number(selected.value); // 数値型に変換 url
    console.log("選択された値:", value);

    // サーバーに値を送信して合計を更新//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
    const params = {
        method: "POST",
        body: `value=${value}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    
    fetch('/save', params)
        .then((response) => {
            if (!response.ok) {
                throw new Error('サーバーへの送信に失敗しました');
            }
            return response.json();
        })
        .then((data) => {
            console.log("サーバーからの応答:", data);
            const cost = document.querySelector('#cost');
            cost.textContent = `現在の合計: ${data.total}`;
            cost.className = 'cost';
            return response.json();
        })
});
