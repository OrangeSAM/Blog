var new_array=arr.filter(callback(element,index,array),thisarg)
element 当前在数组中处理的元素
index 正在处理元素在数组中的索引
array 调用了filter的数组
thisarg 执行callback时的用于this的值

callback 用来测试数组的每个元素的函数。调用时使用参数（element index array）
返回true表示保留该元素，false则不保留。

filter会把返回truede 元素放到一个新数组中，不会改变原数组

数组中搜索
var fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];
function filterItems(query) {
  return fruits.filter(function(el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  })
}
 
console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange']

数组中的筛选
var arr = [  { id: 15 },  { id: -1 },  { id: 0 },  { id: 3 },  { id: 12.2 },  { },  { id: null },{ id: NaN },{ id: 'undefined' }
];
var invalidEntries = 0;
 
function isNumber(obj) {
  return obj !== undefined && typeof(obj) === 'number' && !isNaN(obj);
}
function filterByID(item) {
  if (isNumber(item.id) && item.id !== 0) {
    return true;
  } 
  invalidEntries++;
  return false; 
}
var arrByID = arr.filter(filterByID);
 
console.log('Filtered Array\n', arrByID); 
// Filtered Array
// [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]
console.log('Number of Invalid Entries = ', invalidEntries); 
// Number of Invalid Entries = 5

