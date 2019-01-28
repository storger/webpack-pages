const Noty = require('noty');
exports.default = {
	success:(msg)=> {
		new Noty({
			type:'success',
			text: msg,
			timeout:1000,
		}).show();
	},
	warning:(msg)=> {
		new Noty({
			type:'warning',
			text: msg,
			timeout:1000,
		}).show();
	},
	info:(msg)=> {
		new Noty({
			type:'info',
			text: msg,
			timeout:1000,
		}).show();
	},
	error:(msg)=> {
		new Noty({
			type:'error',
			text: msg,
			timeout:1000,
		}).show();
	},
	alert:(msg)=> {
		new Noty({
			type:'alert',
			text: msg,
			timeout:1000,
		}).show();
	}
}