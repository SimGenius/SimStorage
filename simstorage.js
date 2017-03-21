/**
 * Created by SimGenius on 2017/3/20.
 */
"use strict";
var simStorage = (function () {

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function writeRawToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    function getRawFromLocalStorage(key) {
        return localStorage.getItem(key);
    }

    function deleteFromLocalStorage(key) {
        localStorage.removeItem(key);
    }


    /**
     * Append an object to an array in LocalStorage.
     * @param key [string]: the key of this object in LocalStorage.
     * @param value [object, array]: the object/array to append.
     * @param convert [boolean, optional]: convert object to array when value with this key in LocalStorage is object.
     */
    var append = function(key, value, convert) {
        convert = convert === undefined ? false : convert;

        var valueStr = getRawFromLocalStorage(key) + '';
        var valuePrefix = valueStr.substring(0, 1);
        var valueContent = valueStr.substring(2);

        var array=[];

        if (valuePrefix === 'A') {
            array = JSON.parse(valueContent);

        } else if (valuePrefix === 'O') {
            if (convert === true) {
                var oldObj = JSON.parse(valueContent);
                array.push(oldObj);
            } else {
                console.error("SimStorage: cannot append to an object value, to convert object to array, set convert=true ↓");
                console.error('key: ' + key + ' ↓');
                console.error(value);
            }
        } else {
            console.error("SimStorage: cannot append to a non-array value ↓");
            console.error('key: ' + key + ' ↓');
            console.error(value);
        }

        if (isArray(value)) {
            for (var i = 0; i < value.length; i++) {
                array.push(value[i]);
            }
        } else {
            array.push(value);
        }
        writeRawToLocalStorage(key, 'A:' + JSON.stringify(array));
    };

    /**
     * delete data
     * @param key [string]: the key of this object in LocalStorage.
     */
    var deleteItem = function (key) {
        deleteFromLocalStorage(key);
    };


    /**
     * get data from LocalStorage.
     * @param key [string]: the key of this object in LocalStorage.
     * @returns {*} will automatically convert to the original type when writing.
     */
    var get = function (key) {
        var valueStr = getRawFromLocalStorage(key) + '';
        var valuePrefix = valueStr.substring(0, 1);
        var valueContent = valueStr.substring(2);
        switch (valuePrefix) {
            case 'A':
            case 'O':
                return JSON.parse(valueContent);
            case 'N':
                return Number(valueContent);
            case 'B':
                return valueContent === 't';
            case 'S':
                return valueContent;
        }
    };


    /**
     * write data to LocalStorage.
     * @param key [string]: the key of this object writing to LocalStorage.
     * @param value [object, array, number, string, boolean]: the value to write.
     * @param rewrite [optional, boolean]: default false, if exist this key, you can only write this value when rewrite === true.
     */
    var put = function (key, value, rewrite) {
        rewrite = rewrite === undefined ? false : rewrite;

        if (getRawFromLocalStorage(key) && !rewrite) {
            throw new Error('\"' + key + '\" already exist and cannot rewrite. Set rewrite true to rewrite data');
        }

        switch (typeof value) {
            case "object":
                if (isArray(value)) {
                    writeRawToLocalStorage(key, 'A:' + JSON.stringify(value));
                } else {
                    writeRawToLocalStorage(key, 'O:' + JSON.stringify(value));
                }
                break;
            case "number":
                writeRawToLocalStorage(key, 'N:' + value);
                break;
            case "string":
                writeRawToLocalStorage(key, 'S:' + value);
                break;
            case "boolean":
                writeRawToLocalStorage(key, 'B:' + value ? 't' : 'f');
                break;
            default:
                console.error("SimStorage: unsupported type ↓");
                console.error('key: ' + key + ' ↓');
                console.error(value);
        }
    };

    /**
     * update data in LocalStorage
     * @param key [string]: the key of this object to update in LocalStorage.
     * @param value [object, array, number, string, boolean]: the value to update.
     */
    var update = function (key, value) {

        if (!getRawFromLocalStorage(key)) {
            throw new Error('\"' + key + '\" doesn\'t exist so cannot update. ↓');
        }else {
            switch (typeof value) {
                case "object":
                    if (isArray(value)) {
                        writeRawToLocalStorage(key, 'A:' + JSON.stringify(value));
                    } else {
                        writeRawToLocalStorage(key, 'O:' + JSON.stringify(value));
                    }
                    break;
                case "number":
                    writeRawToLocalStorage(key, 'N:' + value);
                    break;
                case "string":
                    writeRawToLocalStorage(key, 'S:' + value);
                    break;
                case "boolean":
                    writeRawToLocalStorage(key, 'B:' + value ? 't' : 'f');
                    break;
                default:
                    console.error("SimStorage: unsupported type ↓");
                    console.error('key: ' + key + ' ↓');
                    console.error(value);
            }
        }


    };


    return {
        get: get,
        put: put,
        update: update,
        deleteItem: deleteItem,
        append: append
    }


})();

