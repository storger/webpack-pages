import '../_common/core.min.js'
import '../_common/common.js'
console.log(Config);
Http.get('/5b1a157502cb10260775e2ba/baseElement/login',{username:'admin'}).done(res => {
	console.log(res);
});

console.log(Tools.dateFormat());
Msg.error('5325');