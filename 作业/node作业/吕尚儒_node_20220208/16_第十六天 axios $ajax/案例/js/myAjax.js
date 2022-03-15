(function (win) {
  function myAjax ({ url = "/", method = "GET", data = {}, dataType = "json", contentType = "queryStr", withCredentials = false, success = function (data) { console.log(data) }, timeout = 0, context = window, requestHeader = {}, error = function (err) { console.error(err) } }) {
    let xhr
    //如果设置dataType为 jsonp 说明此次请求为jsonp 请求方式 直接调用jsonp封装函数
    //同时 return false 终止后续 XMLHttpRequest 创建以及ajax请求发送
    if (dataType.toLowerCase() === 'jsonp') {
      jsonpPakeage({
        url, data, success
      })
      return false
    }

    const contentTypeMap = {
      'json': 'application/json',
      'form': 'multipart/form-data',
      'text': 'text/plain',
      'queryStr': 'application/x-www-form-urlencoded'
    }



    if ('XMLHttpRequest' in window) {
      xhr = new XMLHttpRequest()
    } else {
      //IE8 以下
      xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
    }





    method = method.toUpperCase()


    xhr.responseType = dataType// text json blob buffer
    xhr.withCredentials = withCredentials //请求是否带上cookie等 请求头信息




    //区别 GET POST
    if (method === 'GET') {
      //请求数据需要以queryString的形式拼接到URL上 send 方法传参 null
      url = '?' + fromatQueryString(data)
      data = null
    }

    if (contentType === 'json') {
      //如果设置  content-type 为 application/json 发送的数据需要是 字符串化的 json对象
      data = JSON.stringify(data)
    }

    if (contentType === 'queryStr') {
      data = fromatQueryString(data)
    }

    xhr.open(method, url, true)
    //如果开启了withCredentials 可以设置自定义请求头
    if (xhr.withCredentials) {
      Object.entries(requestHeader).map(([key, value]) => {
        xhr.setRequestHeader(key, value)
      })
    }

    let reqHeaderCt = contentTypeMap[contentType];
    if (!(contentType === 'form')) {
      //如果请求的content-type 是multipart 不设置requestHeader 浏览器根据请求内容自动识别
      xhr.setRequestHeader('content-type', reqHeaderCt)
    }

    xhr.send(data)

    //timeout 值单位 ms
    if (timeout !== 0) {
      let time = setTimeout(function () {
        //中断请求
        xhr.abort()
        clearTimeout(time)
      }, timeout)
    }


    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status <= 299)) {
        let responseData = xhr.response // "{a:1,b:2}"
        if (xhr.responseType === 'json' && isJSON(responseData)) {
          responseData = JSON.parse(responseData)
        }
        success.call(context, responseData)
      }
    }
    xhr.onerror = function (err) {
      error(err)
    }

    function isJSON (str) {
      if (!str) {
        return false;
      }
      try {
        JSON.parse(str)
        return true;
      } catch (err) {
        return false;
      }
    }

    function fromatQueryString (data) {
      return Object.entries(data).map(([key, value]) => {
        return `${key}=${value}`
      }).join('&')
    }


    function jsonpPakeage ({ url, data, success }) {
      //随机生成一个回调函数名称 fn+时间戳
      let callbackName = `fn${Date.now()}`
      //创建script标签
      let script = document.createElement('script')
      //解析data为 key=value&key=value queryString
      //'?a=1&b=2&callback=fn321341241254'
      let requestQuery = '?' + Object.entries(data).map(([key, value]) => {
        return `${key}=${value}`
      }).join('&') + `&callback=${callbackName}`
      //设置src url 拼接 query参数  http://127.0.0.1:3002/jsonp?a=1&b=2&callback=fn321341241254
      script.src = url + requestQuery
      //script标签添加到head标签内
      document.querySelector('head').appendChild(script)

      //给window全局对象挂一个临时回调函数 fn1604583878744
      window[callbackName] = function (data) {
        data = isJSON(data) && data || data
        //二次传递参数数据给success
        success(data)
        //数据拿到传递给success之后 window上的临时fn函数属性和 script标签就没用了
        //成功回调执行之后 删掉window上的对应临时函数
        delete window[callbackName]
        document.querySelector('head').removeChild(script)
      }
    }

  }
  win.ajax = myAjax
})(window)
