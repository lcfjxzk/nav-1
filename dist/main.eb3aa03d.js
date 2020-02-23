// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $(".siteList");
var $lastLi = $siteList.find("li.last");
var x = localStorage.getItem("x"); // console.log("x");
// console.log(x);

var xObject = JSON.parse(x); //把字符串转化为对象。与JSON.stringify对应，JSON.stringify可以把对象转化为字符串。
// console.log("xObject");
// console.log(xObject);

var hashMap = xObject || [{
  logo: "A",
  url: "https://www.acfun.cn"
}, {
  logo: "B",
  url: "https://www.bilibili.com"
}]; //如果xObject存在，就用xObject对象，如果xObject不存在，就用后面的[{},{}]对象。

var simplifyUrl = function simplifyUrl(url) {
  return url.replace("https://", "").replace("http://", "").replace("www.", "").replace(/\/.*/, ""); //将"/.*"替换为空值---->正则表达式
};

var render = function render() {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>    \n      <div class=\"site\">\n        <div class=\"logo\">".concat(node.logo[0], "</div>\n        <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n        <div class=\"close\">\n          <svg class=\"icon\">\n            <use xlink:href=\"#icon-close\"></use>\n          </svg>\n        </div>\n      </div>    \n  </li> \n      ")).insertBefore($lastLi);
    $li.on("click", function () {
      window.open(node.url);
    });
    $li.on("click", ".close", function (e) {
      e.stopPropagation(); //JS阻止冒泡,再点击close图标，不会再跳转页面。

      console.log(hashMap);
      hashMap.splice(index, 1); //在WebStorm里面是(index, deleteCount:1)，WebStorm的自动功能，在每一个参数前面加上一个注释。比如deleteCount。
      //在index这里删除一个。

      render(); //重新渲染hashMap.
    });
  });
}; //console.log($);


render();
$(".addButton").on("click", function () {
  //console.log(1);
  var url = window.prompt("请问你要添加的网址是啥？");

  if (url.indexOf("http") !== 0) {
    //如果url的第一个字符不等于'http'
    url = "https://" + url;
  }

  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0],
    logoType: "text",
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  //console.log("页面要关闭了");
  var string = JSON.stringify(hashMap); //JSON.stringify可以把一个对象转化为字符串。
  // console.log(typeof hashMap); //可以看到hashMap的类型是一个对象
  // console.log(hashMap);
  // console.log(typeof string);
  // console.log(string); //长得像数组的字符串。

  window.localStorage.setItem("x", string); //localStorage只能存字符串，不能存对象。window.localStorage是一个全局变量。在本地存储里面设置一个x，它的值就是string
}; //当关闭页面的时候，把当前hashMap存到x里面。


$(document).on("keypress", function (e) {
  // console.log(e.key);
  // const key = e.key
  var key = e.key; //上一句的简写。

  for (var i = 0; i < hashMap.length; i++) {
    //按下标遍历hashMap
    if (hashMap[i].logo.toLowerCase() === key) {
      //如果hashMap表里面的第i个logo的小写===key
      window.open(hashMap[i].url); //就打开下标i对应的url
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.eb3aa03d.js.map