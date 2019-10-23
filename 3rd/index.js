/*
    # Argクラスの機能要件
    - Argクラスでは
        1. コンストラクタの第一引数にコマンドライン引数の定義を受け取る。
        2. 第２引数にコマンドライン引数を受け取る。
        3. コマンドライン引数の定義は下記の通り
            - ロギングをするかどうか。
            - ポート番号
            - ディレクトリ

    ## リファクタリング要件

    ### 背景
    2ndまで書いてコミットして、このまま強引に機能拡張することもできるが、やがて大きくなりすぎて修正できなくなる気がする、、、

    ### What?
    - スキーマ要素をパースするなんらかの方法
    - コマンド引数をパースして本来の文字列型にする機能
    - 呼び出し元に本来の型で値を返すgetXXXメソッドがいる
    
    多くの異なる引数タイプに対して同じようなメソッド、、、これはクラスだと筆者は直感したらしい。

    ※ 直感するというと訳がわからないが、１つのクラスの中に複数の機能が混在している状態は分離する必要があるなーと。

    ### How to?
    - 変更が壊れてしまっていないことを保障するため、テスト駆動開発でリファクタリングを行う。
    - typeScriptを導入して、継承可能なクラス(インターフェース)を記述できるようにする。
    - Boolean, Integer, String それぞれの型のコマンド引数を保持できるクラスを作る、そのクラスは ArgumentMarshaler インターフェースを継承し、setStringメソッドを実装する。また、getXXXメソッド(XXXは型名)を実装する。
    - 不要になったメソッドは削除する。
    - 一度全ての検証処理を一つのメソッドに移して、例外をスローする処理と、エラーメッセージをセットする処理を通常のロジックから分離する。
    - 不要になったメソッドは削除する。
    - スローする例外のクラスを作成し、エラーコードと渡された引数に応じて適切なエラーメッセージを返す実装を行う。
    - 不要になったメソッドは削除する。

*/
$().ready(() => {
    let input = $("#input");
    let output = $("#output");
    let btn = $("#third");
    btn.on("click", () => {
        let argsText = input.val();
        let _args = argsText.split(",");
        try {
            let arg = new Arg("l, p#, d*", _args);
            let logging = arg.getBoolean("l");
            let port = arg.getInt("p");
            let directory = arg.getString("d");
            output.html(report(logging, port, directory));
        } catch(e) {
            console.log( e.message );
        }
    });
});

let secound = (args, result) => {
    let argsText = args.val();
    let _args = argsText.split(",");
    let arg = new Arg("l, p#, d*", _args);
    let logging = arg.getBoolean("l");
    let port = arg.getInt("p");
    let directory = arg.getString("d");
    result.html(report(logging, port, directory));
}

let report = (logging, port, directory) => {
    let results = [
        "ログをとる: " + logging, 
        "ポート番号: " + port, 
        "ディレクトリ: " + directory
    ];
    return results.join("/");
};

let Arg = class {
    constructor(schema, args) {

    }

    getBoolean(arg) {
        return true;
    }

    getInt(arg) {
        return 2;
    }

    getString(arg) {
        return "a";
    }
}
