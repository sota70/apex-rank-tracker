"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlCommandBuilder = void 0;
var SqlCommandBuilder = /** @class */ (function () {
    function SqlCommandBuilder(data) {
        this.data = data;
    }
    SqlCommandBuilder.prototype.buildInsertCommand = function () {
        var columnStrings = '';
        var inputStrings = '';
        this.data.forEach(function (value, key) {
            columnStrings += key + ",";
            inputStrings += "'" + value + "',";
        });
        var adjustedColumnStrings = columnStrings.slice(0, -1);
        var adjustedInputStrings = inputStrings.slice(0, -1);
        return "(" + adjustedColumnStrings + ") VALUES (" + adjustedInputStrings + ")";
    };
    SqlCommandBuilder.prototype.buildUpdateCommand = function () {
        var rowStrings = '';
        this.data.forEach(function (value, key) {
            rowStrings += key + " = '" + value + "',";
        });
        return rowStrings.slice(0, -1);
    };
    SqlCommandBuilder.buildConditionCommand = function (conditions) {
        var keyStrings = 'WHERE ';
        conditions.forEach(function (value, key) {
            keyStrings += key + " = '" + value + "' AND ";
        });
        return keyStrings.slice(0, -5);
    };
    SqlCommandBuilder.buildColumnsCommand = function (columns) {
        var rowStrings = '';
        columns.forEach(function (value, key) {
            rowStrings += key + " " + value + ",";
        });
        return rowStrings.slice(0, -1);
    };
    return SqlCommandBuilder;
}());
exports.SqlCommandBuilder = SqlCommandBuilder;
