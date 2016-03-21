
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var aqiData = {};
function $(name){
	return document.getElementById(name);
}
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var city = $("aqi-city-input").value;
  var value = $("aqi-value-input").value;
  var reg = /^([\u4e00-\u9fa5]+)|([a-zA-Z]+)$/;
  var re = /^\d+$/;
  if(!city){
    alert('城市名称不能为空');
    city.value = '';
    city.focus();
    return false;
  }else if(!reg.test(city)){
    alert('城市名称必须中英文字符');
    city.value = '';
    city.focus();
    return false;
  }
  if(!value){
    alert('空气质量指数不能为空');
    value.value = '';
    value.focus();
    return false;
  }else if(!re.test(value)){
    alert('空气质量指数必须为整数');
    value.value = '';
    value.focus();
    return false;
  }
  aqiData[city] = value;
  return aqiData;
}

/* 渲染aqi-table表格*/
function renderAqiList() {
  var table = $("aqi-table");
  table.innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
  var arr = [];
  for (var key in aqiData) 
  {
   arr.push('<tr><td>'+key+'</td><td>'+aqiData[key]+'</td><td><button onclick="delBtnHandle(this)">删除</button></td></tr>');
  }
  table.innerHTML = arr.join('');
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
*/
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
*/
function delBtnHandle(_this) {
  var aa = _this.parentNode.parentNode.firstChild.innerHTML;
  _this.parentNode.parentNode.remove();

 
  for (var key in aqiData) 
  {
    if(key == aa){
       delete aqiData[key];
    }  
  }
}

function init() {   
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  $("add-btn").addEventListener('click',function(){
    addBtnHandle();
  })   
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
