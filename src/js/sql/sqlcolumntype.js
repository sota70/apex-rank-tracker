"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlColumnType = void 0;
/**
 * データベースのテーブルのコロンの種類
 * * 現在は2種類しかないが、必要に応じて増やす予定
 */
var SqlColumnType;
(function (SqlColumnType) {
    SqlColumnType["STRING"] = "text";
    SqlColumnType["INTEGER"] = "integer";
})(SqlColumnType = exports.SqlColumnType || (exports.SqlColumnType = {}));
