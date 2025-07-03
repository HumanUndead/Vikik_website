import React, {Component} from 'react';
import {Platform, Alert} from 'react-native';

/**
 * init class API
 * @param opt
 * @returns {KensoftApi}
 * @constructor
 */
function KensoftApi(opt) {
  if (!(this instanceof KensoftApi)) {
    return new KensoftApi(opt);
  }
  opt = opt || {};
  this.classVersion = '1.0.0';
  this._setDefaultsOptions(opt);
}

/**
 * Default option
 * @param opt
 * @private
 */
KensoftApi.prototype._setDefaultsOptions = async function (opt) {
  this.url = opt.url;
  this.logo = opt.logo;
  this.tags = null;
  this.categories = null;

  this.questioncategories = null;
};

KensoftApi.prototype.getNewHomePage = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/NewHomePage?' + requestUrl;
  
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.searchSuggestions = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/searchsuggestions?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};
KensoftApi.prototype.barcodeSearch = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/barcodesearch?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};
KensoftApi.prototype.getCategoryProducts = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }
  var requestUrl = this.url + '/services/CategoryProductsGet?' + requestUrl;

  console.log(requestUrl, ' getCTEGORY');
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.CitiesGet = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + 'services/CitiesGet?' + requestUrl;
  //requestUrl = this.url + 'services/CitiesGet?' + requestUrl;
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};
KensoftApi.prototype.getAddress = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/useraddressesget?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.GetUser = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/GetUser?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.getUserOrders = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/UserOrdersGet?' + requestUrl;
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.getOrderDetails = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/UserOrderGet?' + requestUrl;
  console.log('getOrderDetails', requestUrl);
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.CouponClaim = function (data, callback) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/CouponClaim?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    if (callback) callback(data);
    return data;
  });
};

KensoftApi.prototype.cartCheckout = function (data, callback) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/CartCheckout?';

  console.log('cartCheckout : ', requestUrl + JSON.stringify(data));
  return this._requestPost(requestUrl, data, response => {}).then(function (
    data,
  ) {
    if (callback) callback(data);
    return data;
  });
};

KensoftApi.prototype.checkCoupon = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/CheckCoupon?' + requestUrl;
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.addAddress = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/UserAddressSave/?' + requestUrl;
  console.log(requestUrl);
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};
KensoftApi.prototype.loginTajje = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/login?'; //+ requestUrl;
  console.log('=========ssssadasca===========================');
  console.log(requestUrl);
  console.log('====================================');
  return this._requestPost(requestUrl, data, res => {}).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.registerUser = function (data) {
  console.log(data);
  var requestData = '';

  var requestUrl = this.url + '/services/RegisterUser';

  return this._requestPost(requestUrl, data, res => {}).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.EmailLogin = function (data) {
  var requestUrl = this.url;
  if (data) {
    requestUrl = this.url + '/services/EmailLogin?';
    //requestUrl = requestUrl + this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }
  return this._requestPost(requestUrl, data, res => {}).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.EmailRegister = function (data) {
  var requestUrl = this.url;
  if (data) {
    requestUrl = this.url + '/services/EmailRegister?';
  } else {
    requestUrl = 'parent=0';
  }
  return this._requestPost(requestUrl, data, res => {}).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.getCategoryBrandProducts = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/CategoryProductsGet?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};
/**
 * Get list of categories
 */
KensoftApi.prototype.getCategories = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/categoriesGet?' + requestUrl;
  console.log({requestUrl});
  return this._request(requestUrl).then(function (data) {
    // this.categories = data;
    return data;
  });
};
KensoftApi.prototype.getRelatedProducts = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/CategoryProductsGet?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    // this.categories = data;
    return data;
  });
};

KensoftApi.prototype.getProduct = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/ProductGet?' + requestUrl;
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.getUserPoints = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/GetUserPoints?' + requestUrl;
  console.log(requestUrl);
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.getSpecValues = function (data) {
  var requestUrl = this.join(data, '&');
  var requestUrl = this.url + '/services/SpecsGet?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.reviewsByProductId = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/ProductReviewsGet?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.sendReview = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  } else {
    requestUrl = 'parent=0';
  }

  var requestUrl = this.url + '/services/ProductReviewAdd?' + requestUrl;

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.removeAddress = function (data) {
  var requestUrl = '';
  if (data) {
    requestUrl = this.join(data, '&');
  }
  var requestUrl = this.url + '/services/RemoveUserAddress?' + requestUrl;
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.getCommunication = function (data, callback) {
  var requestUrl = this.url + '/services/MessagingGetCommunication?';
  requestUrl += this.join(data, '&');
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};
KensoftApi.prototype.SendMessage = function (data, callback) {
  var requestUrl = this.url + '/services/MessagingSend?';
  requestUrl += this.join(data, '&');
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};
KensoftApi.prototype.getMessageSessions = function (data, callback) {
  var requestUrl = this.url + '/services/GetMessageSessions?';
  requestUrl += this.join(data, '&');
  console.log(requestUrl, ' getMessageSessions');
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};
KensoftApi.prototype.GetMinAllowed = function (data, callback) {
  var requestUrl = this.url + 'services/GetMinAllowed?';
  requestUrl += this.join(data, '&');
  console.log('GetMinAllowed', requestUrl);
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.MessageImageUpload = function (data, callback) {
  var requestUrl = this.url + '/services/MessageImageUpload?';
  // requestUrl += this.join(data, '&');
  return this._requestPost(requestUrl, data).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.hideCommunication = function (data, callback) {
  var requestUrl = this.url + '/services/HideCommunication?';
  requestUrl += this.join(data, '&');
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};
KensoftApi.prototype.AddEntitySession = function (data, callback) {
  var requestUrl = this.url + '/services/AddEntitySession?';
  requestUrl += this.join(data, '&');
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};
KensoftApi.prototype.getCommunication = function (data, callback) {
  var requestUrl = this.url + '/services/GetCommunication?';
  requestUrl += this.join(data, '&');
  console.log({requestUrl});
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};
KensoftApi.prototype.SetUserToken = function (data, callback) {
  var requestUrl = this.url + '/services/SetUserToken?';
  requestUrl += this.join(data, '&');
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

/**
 * Request to the server,
 * You fixed: https://gist.github.com/pranavrajs/66bccee3f8ba100742a1273db6f587af
 * @param url
 * @param callback
 * @returns {axios.Promise}
 * @private
 */
KensoftApi.prototype._request = function (url, callback) {
  var self = this;
  return fetch(url)
    .then(response => response.text()) // Convert to text instead of res.json()
    .then(text => {
      // if (Platform.OS === 'android') {
      //   //text = text.replace(/\r?\n/g, "").replace(/[\u0080-\uFFFF]/g, ""); // If android , I've removed unwanted chars.
      // }
      return text;
    })
    .then(response => JSON.parse(response))

    .catch((error, data) => {})
    .then(responseData => {
      // if (typeof callback == 'function') {
      //   callback();
      // }
      return responseData;
    })
    .catch(error => {});
};
/**
 * Post to the server
 * @param url
 * @param data
 * @param callback
 * @returns {axios.Promise}
 * @private
 */
KensoftApi.prototype._requestPost = function (url, data, callback) {
  var self = this;
  var params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // 'X-CSRFToken':  cookie.load('csrftoken')
    },
    credentials: 'same-origin',
    mode: 'same-origin',
    body: JSON.stringify(data),
  };
  return fetch(url, params)
    .then(response => response.json())

    .catch((error, data) => {})
    .then(responseData => {
      if (typeof callback == 'function') {
        callback();
      }
      return responseData;
    })
    .catch(error => {});
};

/**
 * Get default logo from Wordpress
 * @returns {logo|{height, width, marginLeft}|{marginBottom, marginTop, height, width, alignSelf}|boolean|{width, height, resizeMode, marginTop, marginBottom, marginLeft}|{resizeMode, height, marginTop, marginRight, marginBottom, marginLeft}|*}
 */

KensoftApi.prototype.join = function (obj, separator) {
  var arr = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] != null) arr.push(key + '=' + obj[key]);
    }
  }
  return arr.join(separator);
};

/**
 * Get posts listing
 * @param data
 * @param callback
 * @returns {axios.Promise}
 */

/**
 * Get posts listing
 * @param data
 * @param callback
 * @returns {axios.Promise}
 */

KensoftApi.prototype.pushRegister = function (data) {
  var requestUrl = this.url + '/services/SetUserToken?';
  requestUrl = requestUrl + this.join(data, '&');

  console.log(requestUrl, ' : pushRegister');
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};
KensoftApi.prototype.facebookLogin = function (data, postdata, callback) {
  var requestUrl = this.url + '/services/facebookLogin?';
  requestUrl += '&' + this.join(data, '&');
  return this._request(requestUrl, callback).then(res => {
    if (callback) callback(res);
  });
};
KensoftApi.prototype.GetOffersList = function (data, postdata, callback) {
  var requestUrl = this.url + '/services/GetNotificationList?';
  requestUrl += this.join(data, '&');
  return this._request(requestUrl, callback).then(res => {
    return res;
  });
};

KensoftApi.prototype.getFacebookUser = function (data, postdata, callback) {
  var requestUrl = this.url + '/services/getFacebookUser?';
  requestUrl += '&' + this.join(data, '&');
  return this._request(requestUrl, callback).then(res => {
    if (callback) callback(res);
  });
};

KensoftApi.prototype.editUser = function (data) {
  var requestUrl = this.url + '/services/UpdateUserInfo?';
  requestUrl = requestUrl + this.join(data, '&');
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.IsProductsAvailable = function (data) {
  var requestUrl = this.url + '/services/IsProductsAvailable?';
  requestUrl = requestUrl + this.join(data, '&');

  console.log(requestUrl);
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.getNonceRegister = function () {
  const requestUrl =
    this.url + '/api/get_nonce/?controller=user&method=register';

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.getNonce = function () {
  const requestUrl =
    this.url + '/api/get_nonce/?controller=user&method=generate_auth_cookie';

  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.request = function (requestUrl) {
  return this._request(requestUrl).then(function (data) {
    return data;
  });
};

KensoftApi.prototype.register = async function (
  $email,
  $password,
  $name,
  $phone,
) {
  const data = await this.getNonceRegister();

  if (typeof data.status != 'undefined' && data.status == 'ok') {
    const nonce = data.nonce;

    const requestUrl =
      this.url +
      '/services/RegisterUser?' +
      '&email=' +
      $email +
      '&gender=' +
      $gender +
      '&password=' +
      $password +
      '&name=' +
      $name +
      '&phone=' +
      $phone;

    return this._request(requestUrl);
  }
};

export default KensoftApi;
