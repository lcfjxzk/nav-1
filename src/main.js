const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");

// console.log("x");
// console.log(x);

const xObject = JSON.parse(x); //把字符串转化为对象。与JSON.stringify对应，JSON.stringify可以把对象转化为字符串。

// console.log("xObject");
// console.log(xObject);

const hashMap = xObject || [
  { logo: "G", url: "https://www.github.com" },
  { logo: "S", url: "https://www.stackoverflow.com" }
]; //如果xObject存在，就用xObject对象，如果xObject不存在，就用后面的[{},{}]对象。

const simplifyUrl = url => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //将"/.*"替换为空值---->正则表达式
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>    
      <div class="site">
        <div class="logo">${node.logo[0]}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>    
  </li> 
      `).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", e => {
      e.stopPropagation();
      //JS阻止冒泡,再点击close图标，不会再跳转页面。
      console.log(hashMap);
      hashMap.splice(index, 1); //在WebStorm里面是(index, deleteCount:1)，WebStorm的自动功能，在每一个参数前面加上一个注释。比如deleteCount。
      //在index这里删除一个。
      render(); //重新渲染hashMap.
    });
  });
};
//console.log($);
render();
$(".addButton").on("click", () => {
  //console.log(1);
  let url = window.prompt("请问你要添加的网址是啥？");
  if (url.indexOf("http") !== 0) {
    //如果url的第一个字符不等于'http'
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({ logo: simplifyUrl(url)[0], logoType: "text", url: url });

  render();
});

window.onbeforeunload = () => {
  //console.log("页面要关闭了");
  const string = JSON.stringify(hashMap); //JSON.stringify可以把一个对象转化为字符串。
  // console.log(typeof hashMap); //可以看到hashMap的类型是一个对象
  // console.log(hashMap);
  // console.log(typeof string);
  // console.log(string); //长得像数组的字符串。
  window.localStorage.setItem("x", string); //localStorage只能存字符串，不能存对象。window.localStorage是一个全局变量。在本地存储里面设置一个x，它的值就是string
}; //当关闭页面的时候，把当前hashMap存到x里面。

$(document).on("keypress", e => {
  // console.log(e.key);
  // const key = e.key
  const { key } = e; //上一句的简写。
  for (let i = 0; i < hashMap.length; i++) {
    //按下标遍历hashMap
    if (hashMap[i].logo.toLowerCase() === key) {
      //如果hashMap表里面的第i个logo的小写===key
      window.open(hashMap[i].url); //就打开下标i对应的url
    }
  }
});
