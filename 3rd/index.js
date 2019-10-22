/*
    # Argクラスの機能要件
    - Argクラスでは
        1. コンストラクタの第一引数にコマンドライン引数の定義を受け取る。
        2. 第２引数にコマンドライン引数を受け取る。
        3. コマンドライン引数の定義は下記の通り
            - ロギングをするかどうか。
            - ポート番号
            - ディレクトリ
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
