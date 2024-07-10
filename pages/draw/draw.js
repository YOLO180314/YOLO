Page({
  
  
})


const CryptoJS = require('crypto-js');

// 生成随机的8位字符串作为nonce
function generateNonce() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var nonce = '';
    for (let i = 0; i < 8; i++) {
        nonce += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return nonce;
}
// 计算URL中的canonical_query_string 当该项只有 key 时，转换公式为 url_encode(key) + “=” 的形式。
function generateCanonicalQueryString1(url) {
  var canonicalQueryString = '';
  const queryString = url.split('?')[1]; // 获取查询字符串部分
  
  if (queryString) {
  // 解析查询字符串成键值对数组
  const paramsArray = queryString.split('&').map(pair => pair.split('='));
  
    // 对键值对数组按照键名进行排序
    paramsArray.sort((a, b) => {
        return a[0] < b[0] ? -1 : 1;
    });
    
    // 构建规范化的查询字符串
    canonicalQueryString = paramsArray.map(([key, value]) => {
        return value !== undefined ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : `${encodeURIComponent(key)}=`;
    }).join('&');
  }
  
  return canonicalQueryString;
  }

  //当该项是 key=value 的形式时，转换公式为 url_encode(key) + “=” + url_encode(value) 的形式。
  //将每一项转换后，以 key 按照字典顺序（ ASCII 码由小到大）排序，并使用 & 符号连接起来，生成相应的 canonical_query_string 。
function generateCanonicalQueryString2(url) {
  var canonicalQueryString = '';
  const queryString = url.split('?')[1]; // 获取查询字符串部分

  if (queryString) {
      // 解析查询字符串成键值对数组
      const paramsArray = queryString.split('&')
          .map(pair => {
              const [key, value] = pair.split('=');
              return [decodeURIComponent(key), decodeURIComponent(value || '')];
          });
      
      // 对键值对数组按照键名进行排序
      paramsArray.sort((a, b) => {
          return a[0] < b[0] ? -1 : 1;
      });
      
      // 构建规范化的查询字符串
      canonicalQueryString = paramsArray.map(([key, value]) => {
          return value !== undefined ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : `${encodeURIComponent(key)}=`;
      }).join('&');
  }
  
  return canonicalQueryString;
}

// 计算签名signature
function calculateSignature1(url, app_id, app_key, timestamp, nonce,URI) {
  // 构建signed_headers_string
  const signed_headers_string = `x-ai-gateway-app-id:${app_id}\n`
                              + `x-ai-gateway-timestamp:${timestamp}\n`
                              + `x-ai-gateway-nonce:${nonce}`;

  // 计算canonical_query_string
  const canonical_query_string = generateCanonicalQueryString1(url);

  // 构建signing_string
  const signing_string = `POST\n${URI}\n${canonical_query_string}\n${app_id}\n${timestamp}\n${signed_headers_string}`;

  // 计算 HMAC-SHA256 哈希值
const hash = CryptoJS.HmacSHA256(signing_string, app_key);

// 将结果转换为 Base64 编码
const base64Signature = CryptoJS.enc.Base64.stringify(hash);

  const signature = base64Signature;
  
  return signature;
}

// 计算签名signature
function calculateSignature2(url, app_id, app_key, timestamp, nonce,URI) {
  // 构建signed_headers_string
  const signed_headers_string = `x-ai-gateway-app-id:${app_id}\n`
                              + `x-ai-gateway-timestamp:${timestamp}\n`
                              + `x-ai-gateway-nonce:${nonce}`;

  // 计算canonical_query_string
  const canonical_query_string = generateCanonicalQueryString2(url);

  // 构建signing_string
  const signing_string = `GET\n${URI}\n${canonical_query_string}\n${app_id}\n${timestamp}\n${signed_headers_string}`;

  // 计算 HMAC-SHA256 哈希值
const hash = CryptoJS.HmacSHA256(signing_string, app_key);

// 将结果转换为 Base64 编码
const base64Signature = CryptoJS.enc.Base64.stringify(hash);

  const signature = base64Signature;
  
  return signature;
}

// 发送POST请求提交作画任务
function submitArtTask(url, app_id, app_key, dataId, prompt, initImages, imageType, styleConfig, height, width, seed, cfgScale, denoisingStrength, ctrlNetStrength, steps, negativePrompt, imageFormat) {
  var nonce=generateNonce();
  var timestamp = Math.floor(Date.now() / 1000); // 当前时间的时间戳，单位秒
  var signature = calculateSignature1(url1, app_id, app_key, timestamp, nonce,URI1);

  // 构建请求头
  var headers = {
    'Content-Type': 'application/json',
    'X-AI-GATEWAY-APP-ID': app_id,
    'X-AI-GATEWAY-TIMESTAMP': timestamp,
    'X-AI-GATEWAY-NONCE': nonce,
    'X-AI-GATEWAY-SIGNED-HEADERS': 'x-ai-gateway-app-id;x-ai-gateway-timestamp;x-ai-gateway-nonce',
    'X-AI-GATEWAY-SIGNATURE': signature,
  };

    // 构建请求体
    const requestData = {
        dataId: dataId,
        businessCode: 'pc',
        prompt: prompt || '',
        initImages: initImages || '',
        imageType: imageType || 1,
        styleConfig: styleConfig,
        height: height || 512,
        width: width || 512,
        seed: seed || -1,
        cfgScale: cfgScale || 7,
        denoisingStrength: denoisingStrength || 0.1,
        ctrlNetStrength: ctrlNetStrength || 0.5,
        steps: steps || 20,
        negativePrompt: negativePrompt || '',
        imageFormat: imageFormat || 'JPEG',
    };
    // 发送请求
    wx.request({
        url: url,
        method: 'POST',
        header: headers,
        data: requestData,
        success: function (res) {
            console.log('提交作画任务成功', res.data);
            queryTaskStatus(res.data.result.task_id);
        },
        fail: function (error) {
            console.error('提交作画任务失败', error);
            // 处理请求失败
        }
    });
}

// 查询作画任务状态的函数
function queryTaskStatus(taskId) {
  // 构建完整的请求 URL
var fullUrl = url2 + '?task_id=' + taskId;

// 添加必要的签名信息和头部信息
var nonce = generateNonce();
var timestamp = Math.floor(Date.now() / 1000);
var signature = calculateSignature2(fullUrl, app_id, app_key, timestamp, nonce, URI2);

// 发起请求
wx.request({
  url: fullUrl,
  method: 'GET',
  header: {
    'X-AI-GATEWAY-APP-ID': app_id,
    'X-AI-GATEWAY-TIMESTAMP': timestamp,
    'X-AI-GATEWAY-NONCE': nonce,
    'X-AI-GATEWAY-SIGNED-HEADERS': 'x-ai-gateway-app-id;x-ai-gateway-timestamp;x-ai-gateway-nonce',
    'X-AI-GATEWAY-SIGNATURE': signature,
  },
  success: function(res) {
    console.log('查询作画任务成功', res.data);
    var result = res.data.result;
  },
  fail: function(error) {
    console.error('查询作画任务失败', error);
    // 处理请求失败的情况
  }
});


    }

const url1 = 'https://api-ai.vivo.com.cn/api/v1/task_submit';
const url2 = 'https://api-ai.vivo.com.cn/api/v1/task_progress';
const app_id = '3035858207';
const app_key = 'CVHYGGCJxROxRQAY';
const dataId = 'wxf0a0b22d358cf4c3'; // 替换为实际的请求唯一ID
const prompt = '我好难过'; // 可选，图片描述
const styleConfig = '55c682d5eeca50d4806fd1cba3628781'; // 替换为实际的风格模板ID
const URI1 ='/api/v1/task_submit';
const URI2='/api/v1/task_progress';

submitArtTask(url1, app_id, app_key, dataId, prompt, '', 1, styleConfig, 512, 512, -1, 7, 0.1, 0.5, 20, '', 'JPEG')