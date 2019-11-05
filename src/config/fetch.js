import { baseUrl } from './env'
import Global from './global'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	if (window.fetch && method == 'fetch') {
//		console.log(data);
		let datastring = ''
		for (var item in data) {
			var temp = JSON.stringify(data[item]);
			if (data[item] != null && data[item].constructor == String) temp = data[item];
			console.log(temp);
			datastring += item+'='+temp.replace(/\\"/g, '"').replace(/\\/g, '\\g').replace(/;/g, '\\:').replace(/\+/g, '\\j')+';'
		}
		console.log('datastring: '+datastring);
		let _headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		})
		if (Global.islogin == true) {
			_headers = new Headers({
				'Content-Type': 'application/x-www-form-urlencoded',
				'Authorization': 'Bearer '+Global.token,
			})
		}
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: _headers,
			mode: "cors",
			cache: "force-cache",
//			body: datastring,
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: datastring
			})
		}

		console.log(requestConfig);
		try {
			const response = await fetch(url, requestConfig);
			const data = await response.json();
//			console.log(data);
//			console.log(response);
//			console.log(typeof data);
//			console.log("response_end");
			response.data = JSON.parse(data);
			console.log('response:');
			console.log(response);
			return response;
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}