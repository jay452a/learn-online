if (process.env.NODE_ENV !== 'development') {
  document.write(
    '<script src="/static/header/jquery-3.2.1.min.js" type="text/javascript"></script>'
  );
  let parseDom = function (arg) {
    var objE = document.createElement('div');
    objE.innerHTML = arg;
    return objE.childNodes;
  };
  let headcss = ['bootstrap', 'main'];
  document.head.insertBefore(
    parseDom(
      '<link rel="stylesheet" type="text/css" href="/static/header/' +
        headcss[0] +
        '.css">'
    )[0],
    document.getElementsByTagName('title')[0]
  );
  document.head.insertBefore(
    parseDom(
      '<link rel="stylesheet" type="text/css" href="/static/header/' +
        headcss[1] +
        '.css">'
    )[0],
    document.getElementsByTagName('title')[0]
  );

  let v = new Date().getTime();
  let headUrl = 'http://res.beta.ums86.com/6/js/com/header.js?v=' + v;
  let s = window.location.href;
  if (s.indexOf('flaginfo.cn') > -1) {
    headUrl = 'http://res.flaginfo.cn/6/js/com/header.js?v=' + v;
  }
  if (s.indexOf('.demo.') > -1) {
    headUrl = 'http://res.demo.ums86.com/6/js/com/header.js?v=' + v;
  }
  if (s.indexOf('.test.') > -1) {
    headUrl = 'http://res.test.ums86.com/6/js/com/header.js?v=' + v;
  }
  if (s.indexOf('.ums86.') > -1) {
    headUrl = 'https://res.ums86.com/6/js/com/header.js?v=' + v;
  }
  let code = '<script src=' + headUrl + '></script>';
  let headContainer = document.createElement('div');
  headContainer.setAttribute('id', 'headContainer');
  headContainer.setAttribute('menuid', '100000');
  document.body.insertBefore(headContainer, document.getElementById('app'));
  document.write(code);
  document.write(
    '<script src="/static/header/bootstrap.js" type="text/javascript"></script>'
  );

  window.onload = function () {
    document.onclick = function (e) {
      let logoutDom = document.getElementById('sso_logout_btn');
      e = e || window.event;
      let target = e.target || e.srcElement;
      if (target === logoutDom) {
        e.preventDefault();
        e.stopPropagation();
        let logoutArr = decodeURIComponent(logoutDom.href).split(
          'sso/logout'
        )[0];
        window.location.href = logoutArr + 'api/pc/personManage/sso/logout';
        return false;
      }
    };
  };
}
