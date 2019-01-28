exports.default = {
	dateFormat:(date=new Date(),format = 'yyyy-MM-dd hh:mm:ss') => {
		date = new Date(date);
		/*日期字典*/
		var map = {
			M: date.getMonth() + 1, //月份
			d: date.getDate(), //日
			h: date.getHours(), //小时
			m: date.getMinutes(), //分
			s: date.getSeconds(), //秒
			q: Math.floor((date.getMonth() + 3) / 3), //季度
			S: date.getMilliseconds() //毫秒
		};
		/*正则替换*/
		format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
			var v = map[t];
			if (v !== undefined) {
				if (all.length > 1) {
					v = '0' + v;
					v = v.substr(v.length - 2);
				}
				return v;
			} else if (t === 'y') {
				return (date.getFullYear() + '').substr(4 - all.length);
			}
			return all;
		});
		/*返回自身*/
		return format;
	},
	parseQueryString:(url = window.location.href) => {
		if (url.lastIndexOf("?") == -1) {
			return {};
		}
		var search = url.substring(url.lastIndexOf("?") + 1);
		if (!search) {
			return {};
		}
		return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
	}
}