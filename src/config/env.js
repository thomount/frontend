/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 * 
 */
//let baseUrl = 'https://web-ErrorCode400.app.secoder.net'; 
let baseUrl = 'http://183.172.140.134:8000'; 

let routerMode = 'hash';
let baseImgPath = '/img/';

if (process.env.NODE_ENV == 'development') {
//	baseUrl = '';
//    baseImgPath = '/img/';
}else{
//	baseUrl = '//elm.cangdu.org';
//    baseImgPath = '//elm.cangdu.org/img/';
}

export {
	baseUrl,
	routerMode,
	baseImgPath
}