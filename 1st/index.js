/*
    # Argクラスの機能要件
    - Argクラスでは
        1. コンストラクタの第一引数にコマンドライン引数の定義を受け取る。
        2. 第２引数にコマンドライン引数を受け取る。
        3. コマンドライン引数の定義は下記の通り
            - ロギングをするかどうか。
*/
$().ready(() => {
    let input = $("#input");
    let output = $("#output");
    let btn = $("#first");
    btn.on("click", () => {
        let argsText = input.val();
        let _args = argsText.split(",");
        try {
            let arg = new Arg("l", _args);
            let logging = arg.getBoolean("l");
            output.html("ログをとる: " + logging);
        } catch(e) {
            console.log( e.message );
        }
    });
});

let Arg = class {
    _schema = "";
    _args = [];
    valid = false;
    unexpectedArguments = [];
    constructor(schema, args) {
        this._schema = schema;
        this._args = args;
        this.valid = this.parse();
    }

    isValid() {
        return this.valid;
    }

    parse() {
        this.parseSchema();
        this.parseArgments();
        return this.unexpectedArguments.length === 0;
    }

    parseSchema() {
        let schemas = this._schema.split(",");
        schemas.forEach(s => {
            // コマンドライン引数の定義をセットする
        });
    }

    parseArgments() {
        this._args.forEach(arg => {
            this.parseArgument(arg);
        });
    }

    parseArgument(arg) {
        // 入力されたコマンドライン引数が正しく動作する文字列か検証する。
        // 例: unexpectedArguments.push("引数にmは使用できません。");
        // 例: unexpectedArguments.push("true または falseを入力してください。");
        // 入力されたコマンドライン引数を正しくセットする
    }

    getBoolean(arg) {
        return true;
    }
}