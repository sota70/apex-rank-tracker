"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlCommandConverter = void 0;
var SqlCommandConverter = /** @class */ (function () {
    function SqlCommandConverter(data) {
        this.data = data;
    }
    SqlCommandConverter.prototype.convertIntoInsertCommand = function () {
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
    SqlCommandConverter.prototype.convertIntoUpdateCommand = function () {
        var rowStrings = '';
        this.data.forEach(function (value, key) {
            rowStrings += key + " = '" + value + "',";
        });
        return rowStrings.slice(0, -1);
    };
    SqlCommandConverter.convertConditionIntoCommand = function (conditions) {
        var keyStrings = 'WHERE ';
        conditions.forEach(function (value, key) {
            keyStrings += key + " = '" + value + "' AND ";
        });
        return keyStrings.slice(0, -5);
    };
    SqlCommandConverter.convertColumnIntoCommand = function (columns) {
        var rowStrings = '';
        columns.forEach(function (value, key) {
            rowStrings += key + " " + value + ",";
        });
        return rowStrings.slice(0, -1);
    };
    return SqlCommandConverter;
}());
exports.SqlCommandConverter = SqlCommandConverter;
