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
    let btn = $("#secound");
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

class ErrorCode {
    static OK = "OK";
    static MISSING_STRING = "MISSING_STRING";
    static MISSING_INTEGER = "MISSING_INTEGER";
    static INVALID_INTEGER = "INVALID_INTEGER";
    static UNEXPECTED_ARGUMRNT = "UNEXPECTED_ARGUMRNT";
}

let Arg = class {
    _schema = "";
    _args = [];
    valid = false;
    unexpectedArguments = [];
    // 連想配列
    booleanArgs = [];
    intArgs = [];
    stringArgs = [];
    argsFound = [];
    currentArgument = 0;
    errorArgumentId = '¥0';
    errorzparameter = "TITL";
    errorCode = ErrorCode.OK;
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
        try {
            this.parseArgments();
        } catch (e) {

        }
        
        return this.valid;
    }

    parseSchema() {
        let schemas = this._schema.split(",");
        schemas.forEach(s => {
            /*
            スキーマの末尾がなし or # or *でなければ、次のエラーをthrowする
            不正な文字 xxx が次の書式に含まれています。
            */
           
            /*
            if(スキーマがBooleanなら)) {
                booleanArgsにスキーマをセットする。
            } else if (スキーマがintなら) {
                intArgsにスキーマをセットする。
            } else if (スキーマがstringなら) {
                stringArgsにスキーマをセットする。
            }
            */
        });
    }

    parseArgments() {
        this._args.forEach(arg => {
            this.parseArgument(arg);
        });
    }

    parseArgument(arg) {
        /*
        入力されたコマンドライン引数が正しく動作する文字列か検証する。
        検証した結果、正しくない場合は エラーコードを errorCode に設定し、例外をthrowする。
        */
        
        /*

        if(arg が booleanArgs にセットされているコマンドなら)) {
            booleanArgs に arg をセットする。
        } else if (arg が intArgs にセットされているコマンドなら) {
            intArgs に argをセットする。
        } else if (arg が stringArgs にセットされているコマンドなら) {
            stringArgs に argをセットする。
        }
        */
    }

    getBoolean(arg) {
        // booleanArgsから値を取得する
        return true;
    }

    getInt(arg) {
        return 2;
    }

    getString(arg) {
        return "a";
    }

    getErrorMessage() {
        switch(errorCode) {
            case ErrorCode.OK:
                break;
            case ErrorCode.MISSING_STRING:
                // 次の引数のために文字列引数を返せません。xxx を返す。
                break;
            case ErrorCode.MISSING_INTEGER:
                // 引数 xxx には整数が指定されるべきですが(ry を返す。
                break;
            case ErrorCode.INVALID_INTEGER:
                // 次のパラメーター xxx が見つかりません。
                break;
            case ErrorCode.UNEXPECTED_ARGUMRNT:
                return unexpectedArgumentsMessage();
            default:

        }
    }

    unexpectedArgumentsMessage() {
        // unexpectedArgumentsMessageで設定したコマンド引数は想定外です。を返す。
    }
}
