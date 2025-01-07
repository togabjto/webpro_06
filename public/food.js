"use strict";

let number=0;
const bbs = document.querySelector('#bbs');


document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿a
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );

                    bbs.appendChild( cover );
                }
            })
        }
    });
});

document.querySelector('#check').addEventListener('click', () => {
    // ラジオボタンの値を取得
    const selected = document.querySelector('input[name="team"]:checked');
    if (!selected) {
        console.log("どれか一つ選んでください！");
        return;
    }

    const value = Number(selected.value); // 数値型に変換
    console.log("選択された値:", value);

    // サーバーに値を送信して合計を更新
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
            const bbsDiv = document.querySelector('#bbs');
            bbsDiv.textContent = `現在の合計: ${data.total}`;
        })
        .catch((error) => {
            console.error("エラー:", error);
            alert("エラーが発生しました");
        });
});
