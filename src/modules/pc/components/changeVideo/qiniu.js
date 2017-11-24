const plupload = new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = 'https://cdn.staticfile.org/plupload/2.1.9/plupload.full.min.js';

  script.onload = function () {
    resolve(true);
  };

  script.onerror = function () {
    reject(new Error('引用失败').message);
  };
  document.body.appendChild(script);
});

const qiniu = new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src =
    'https://cdn.staticfile.org/qiniu-js-sdk/1.0.14-beta/qiniu.min.js';

  script.onload = function () {
    resolve(true);
  };

  script.onerror = function () {
    reject(new Error('引用失败').message);
  };

  document.body.appendChild(script);
});

export default Promise.all([plupload, qiniu]);
