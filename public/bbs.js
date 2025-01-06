"use strict";

let number = 0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name=' + name + '&message=' + message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log(params);
    const url = "/post";
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then((response) => {
        console.log(response);
        document.querySelector('#message').value = "";
    });
});


document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",     //⭐️投稿ボタン押した時に動く関数設定
        body:  '',          //形式を設定し，投稿数をリクエスト
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
        let value = response.number;            //⭐️接続数取得
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,          //⭐️ここの数字が欲しい
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";                //⭐️新しい登校を取得するエンドポイント
            fetch( url, params )                //⭐️送信
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;         //⭐️投稿数更新
                for( let mes of response.messages ) {       //⭐️一個ずつ処理
                    console.log( mes );  // 表示する投稿      
                    cover.className = 'cover';               //⭐️新しい投稿を表示するためのdiv
                    let cover = document.createElement('div');
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;         //⭐️名前表示
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;       //⭐️登校内容表示
                    cover.appendChild( number );//⭐️
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );
                    

                    bbs.appendChild( cover );               //⭐️掲示板に追加
                }
            })
        }
    });
});

// 以下、app.get, app.put, app.deleteを活用

document.querySelector('#get-button').addEventListener('click', () => {
    const id = document.querySelector('#id').value; // 特定のIDを取得
    const url = `/bbs/${id}`; // GETエンドポイントにアクセス
    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then((response) => {
        console.log(`GET Response:`, response); // レスポンスをコンソールに出力
    });
});

document.querySelector('#update-button').addEventListener('click', () => {
    const id = document.querySelector('#id').value; // 更新するIDを取得
    const newMessage = document.querySelector('#new-message').value; // 新しいメッセージ
    const params = {
        method: "PUT",
        body: `message=${newMessage}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = `/bbs/${id}`; // PUTエンドポイントにアクセス
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then((response) => {
        console.log(`PUT Response:`, response); // 更新後のレスポンスを表示
    });
});

document.querySelector('#delete-button').addEventListener('click', () => {
    const id = document.querySelector('#id').value; // 削除するIDを取得
    const url = `/bbs/${id}`; // DELETEエンドポイントにアクセス
    const params = {
        method: "DELETE"
    };
    fetch(url, params)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then((response) => {
        console.log(`DELETE Response:`, response); // 削除後のレスポンスを表示
    });
});



document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",     //⭐️投稿ボタン押した時に動く関数設定
        body:  '',          //形式を設定し，投稿数をリクエスト
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
        let value = response.number;            //⭐️接続数取得
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,          //⭐️ここの数字が欲しい
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";                //⭐️新しい登校を取得するエンドポイント
            fetch( url, params )                //⭐️送信
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;         //⭐️投稿数更新
                for( let mes of response.messages ) {       //⭐️一個ずつ処理
                    console.log( mes );  // 表示する投稿      
                    cover.className = 'cover';               //⭐️新しい投稿を表示するためのdiv
                    let cover = document.createElement('div');
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;         //⭐️名前表示
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;       //⭐️登校内容表示
                    cover.appendChild( number );//⭐️
                    cover.appendChild( name_area );
                    cover.appendChild( mes_area );
                    

                    bbs.appendChild( cover );               //⭐️掲示板に追加
                }
            })
        }
    });
});