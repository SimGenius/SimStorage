# SimStorage

 - 介绍
 - 功能
 - 用法
 - 参数介绍
 
## 介绍
SimStorage是一个用纯JavaScript实现的LocalStorage操作库.

## 功能
 - put
 - get
 - update
 - delete
 - append

众所周知，LocalStorage只能存string类型的数据，你需要使用 `JSON.parse()` 或者 `JSON.stringify()` 来将你要存储的array或者数组转换成string来存储。

使用SimStorage你可以直接使用 `simStorage.put(key,obj)` 存储你的object或者array类型的数据，并且当你使用 `simStorage.get(key)` 获取该条数据的时候，数据类型还会自动还原成原来在存储时候的数据类型，无需转换。^_^

SimStorage支持以下数据类型： `string, object, array, boolean, number`


## 用法

### 存储数据（不覆盖）

`simStorage.put(key, value)`
或
`simStorage.put(key, value, false)`

当LocalStorage已经存在key为该key的值时，新的数据将不会被写入。

### 存储数据（覆盖）

`simStorage.put(key, value, true)`

当LocalStorage已经存在key为该key的值时，新的数据将会写入并覆盖原有数据。

### 获取数据并保持原来的类型

`simStorage.put(key, value, true)`

### 更新数据

`simStorage.update(key, value)`

确保LocalStorage中存在key为该key的值，否则将报错。

### 删除数据

`simStorage.delete(key)`

### 向LocalStorage中已有的数据中追加数据

如果LocalStorage中的已有数据是array类型，那么添加数据将顺利进行。

如果LocalStorage中的已有数据是object类型，不允许将其转换成数组后追加数据：

`simStorage.append(key, value)`
或
`simStorage.append(key, value, false)` 

允许将其转换成数组后追加数据：
 
`simStorage.append(key, value, true)`

## 参数介绍

### put(key, value\[, rewrite])

key \[string]: 将要写入LocalStorage的数据的key。

value \[object, array, number, string, boolean]: 将要写入的数据。

rewrite \[可选, boolean]: 默认false, 如果LocalStorage已经存在该key, 你只能将rewrite设定为true后覆盖数据写入.

### get(key)

key \[string]: 将要从LocalStorage中读取的数据的key。

return: 将自动转换成存储数据时的类型。

### update(key, value)

key \[string]: 将要更新的LocalStorage中的数据的key。

value \[object, array, number, string, boolean]: 将要更新的数据。

### delete(key)

key \[string]: 将要删除的LocalStorage中的数据的key。

### append(key, value\[, convert])

key \[string]: 将要追加的LocalStorage中的数据的key。

value \[object, array]: 将要追加的数据。

convert \[可选, boolean]: 当要追加的LocalStorage中的数据为object类型是，是否允许将其转换成array后继续追加。