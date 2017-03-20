#SimStorage

 - Introduce
 - Features
 - Usage
 - API Guide
 
##Introduce
SimStorage is a pure javascript LocalStorage Operating library.

##Features
 - put
 - get
 - update
 - delete
 - append

As you know, LocalStorage can only store string-typed data, you need to use `JSON.parse()` or `JSON.stringify()` to convert an object to JSON string and store it to LocalStorage.

In SimStorage you can save your object or array data directly to LocalStorage by `simStorage.put(key,obj)`, and get this object directly by `simStorage.get(key)`, it will automatically save data with the type and get data with the type. ^_^ 

SimStorage support following types: `string, object, array, boolean, number`


##Usage

###save data no rewriting

`simStorage.put(key, value)`
or
`simStorage.put(key, value, false)`

When LocalStorage already has a value with this key, new data will not write to LocalStorage.

###save data rewriting

`simStorage.put(key, value, true)`

When LocalStorage already has a value with this key, new data will replace the old value in LocalStorage.

###get data with original type

`simStorage.put(key, value, true)`

###update data

`simStorage.update(key, value)`

Make sure this key exists in LocalStorage, or SimStorage will give an error.

###delete data

`simStorage.delete(key)`

###append an object to an existing object or array

don't convert existing object to array: 

`simStorage.append(key, value)`
or
`simStorage.append(key, value, false)` 

convert existing object to array:
 
`simStorage.append(key, value, true)`

##API GUIDE

###put(key, value\[, rewrite])

key \[string]: the key of the object to write to LocalStorage.

value \[object, array, number, string, boolean]: the value to write.

rewrite \[optional, boolean]: default false, if exist this key, you can only write this value when rewrite === true.

###get(key)

key \[string]: the key of the object to get in LocalStorage.

return: will automatically convert to the original type when writing.

###update(key, value)

key \[string]: the key of the object to update in LocalStorage.

value \[object, array, number, string, boolean]: the value to update.

###delete(key)

key \[string]: the key of the object to delete in LocalStorage.

###append(key, value\[, convert])

key \[string]: the key of the object to append in LocalStorage.

value \[object, array]: the object/array to append.

convert \[boolean, optional]: convert object to array when value with this key in LocalStorage is object.