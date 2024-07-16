const util = require('../../utils/util.js');
const db = wx.cloud.database();
const collection = db.collection('items');

const src = "../../image/img/情绪创作/book.png";
const url1 = 'https://api-ai.vivo.com.cn/api/v1/task_submit';
const url2 = 'https://api-ai.vivo.com.cn/api/v1/task_progress';
const app_id = '3035858207';
const app_key = 'CVHYGGCJxROxRQAY';
const dataId = 'wxf0a0b22d358cf4c3'; // 替换为实际的请求唯一ID
const styleConfig = '55c682d5eeca50d4806fd1cba3628781'; // 替换为实际的风格模板ID
const URI1 = '/api/v1/task_submit';
const URI2 = '/api/v1/task_progress';

const CryptoJS = require('crypto-js');

// 生成随机的8位字符串作为nonce
function generateNonce() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let nonce = '';
  for (let i = 0; i < 8; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return nonce;
}

// 计算URL中的canonical_query_string 当该项只有 key 时，转换公式为 url_encode(key) + “=” 的形式。
function generateCanonicalQueryString1(url) {
  let canonicalQueryString = '';
  const queryString = url.split('?')[1]; // 获取查询字符串部分
  
  if (queryString) {
    // 解析查询字符串成键值对数组
    const paramsArray = queryString.split('&').map(pair => pair.split('='));
    
    // 对键值对数组按照键名进行排序
    paramsArray.sort((a, b) => a[0] < b[0] ? -1 : 1);
    
    // 构建规范化的查询字符串
    canonicalQueryString = paramsArray.map(([key, value]) => {
      return value !== undefined ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : `${encodeURIComponent(key)}=`;
    }).join('&');
  }
  
  return canonicalQueryString;
}

// 当该项是 key=value 的形式时，转换公式为 url_encode(key) + “=” + url_encode(value) 的形式。
function generateCanonicalQueryString2(url) {
  let canonicalQueryString = '';
  const queryString = url.split('?')[1]; // 获取查询字符串部分

  if (queryString) {
    // 解析查询字符串成键值对数组
    const paramsArray = queryString.split('&').map(pair => {
      const [key, value] = pair.split('=');
      return [decodeURIComponent(key), decodeURIComponent(value || '')];
    });
    
    // 对键值对数组按照键名进行排序
    paramsArray.sort((a, b) => a[0] < b[0] ? -1 : 1);
    
    // 构建规范化的查询字符串
    canonicalQueryString = paramsArray.map(([key, value]) => {
      return value !== undefined ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}` : `${encodeURIComponent(key)}=`;
    }).join('&');
  }
  
  return canonicalQueryString;
}

// 计算签名signature 提交作画
function calculateSignature1(url, app_id, app_key, timestamp, nonce, URI) {
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

  return base64Signature;
}

// 计算签名signature 查询作画
function calculateSignature2(url, app_id, app_key, timestamp, nonce, URI) {
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

  return base64Signature;
}

Page({
  data: {
    items: [],
    prompt: '', // 存储输入框的值
    TIME: '', // 新增一个 TIME 属性
  },
  onLoad: function () {
    const TIME = util.formatTime(new Date());
    console.log(TIME);
    this.setData({
      TIME: TIME  
    });
    // 从数据库中读取 items
    this.loadItemsFromDatabase();
  },
  handleBack: function() {
    wx.navigateBack({
      delta: 1  
    });
  },
  inputChange: function (e) {
    this.setData({
      prompt: e.detail.value,
    });
  },
  loadItemsFromDatabase: function() {
    collection.get({
      success: (res) => {
        console.log('数据库读取成功', res.data);
        if (res.data && res.data.length > 0) {
          this.setData({
            items: res.data.map(item => ({
              src: item.src,
              time: item.time,
              src2: item.src2
            }))
          });
        } else {
          console.log('没有数据');
        }
      },
      fail: (err) => {
        console.error('数据库读取失败', err);
      }
    });
  },

  // 点击发送按钮触发，更新时间并处理提交逻辑
  submitForm: function() {
    const TIME = this.data.TIME; // 获取页面中的 TIME 值
    const prompt = this.data.prompt;

    // 提交作画任务
    this.submitArtTask(url1, app_id, app_key, dataId, prompt, '', 1, styleConfig, 512, 512, -1, 7, 0.1, 0.5, 20, '', 'JPEG'); // 传递 this
  },

  // 发送POST请求提交作画任务
  submitArtTask: function(url, app_id, app_key, dataId, prompt, initImages, imageType, styleConfig, height, width, seed, cfgScale, denoisingStrength, ctrlNetStrength, steps, negativePrompt, imageFormat) {
    const nonce = generateNonce();
    const timestamp = Math.floor(Date.now() / 1000); // 当前时间的时间戳，单位秒
    const signature = calculateSignature1(url, app_id, app_key, timestamp, nonce, URI1);

    // 构建请求头
    const headers = {
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
      success: (res) => {
        console.log('提交作画任务成功', res.data);
        this.queryTaskStatus(res.data.result.task_id);  // 使用箭头函数，确保 this 上下文正确
      },
      fail: (error) => {
        console.error('提交作画任务失败', error);
        // 处理请求失败
      }
    });
  },

  queryTaskStatus: function(taskId) {
    const that = this; // 保存 Page 实例的引用
    const fullUrl = url2 + '?task_id=' + taskId;

    // 添加必要的签名信息和头部信息
    const nonce = generateNonce();
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = calculateSignature2(fullUrl, app_id, app_key, timestamp, nonce, URI2);

    // 定义轮询的时间间隔
    const interval = 2000; // 2秒
    const maxRetries = 30; // 最大尝试次数
    let retries = 0;

    function checkStatus() {
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
        success: (res) => {
          const result = res.data.result;
          if (!result.finished) { // 修改判断条件
            // 如果任务未完成，则继续轮询
            if (retries < maxRetries) {
              retries++;
              wx.showToast({
                title: '请耐心等待....',
                icon: 'loading',
                mask: true
              });
              setTimeout(checkStatus, interval); // 重新调用checkStatus进行轮询
            } else {
              wx.hideToast();
              wx.showToast({
                title: '任务超时，请重试。',
                icon: 'none',
              });
            }
          } else {
            console.log('查询作画任务成功', res.data);
            wx.hideToast();
            // 获取作画结果的图片URL
            const imageUrl = result.images_url[0]; // 只取第一个图片的URL
            const TIME = util.formatTime(new Date()); // 格式化时间

            collection.add({
              data: {
                prompt: that.data.prompt,
                time: TIME,
                src: src,
                src2: imageUrl
              },
              success: (res) => {  // 使用箭头函数，确保 this 上下文正确
                console.log('数据保存成功', res);
                that.setData({
                  prompt: '', // 清空输入框内容
                });
                that.loadItemsFromDatabase();
              },
              fail: (err) => {
                console.error('数据保存失败', err);
              }
            });
          }
        },
        fail: (error) => {  // 使用箭头函数，确保 this 上下文正确
          console.error('查询作画任务失败', error);
          wx.hideToast();
        }
      });
    }

    checkStatus(); // 启动轮询
  }
});
