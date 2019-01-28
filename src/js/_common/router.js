export default class Router {
	constructor(OPTIONS) {
		let _this = this;
		this.routes = OPTIONS.routes; // 路由配置
		this.index = OPTIONS.index || 'home'; // 默认页
		this.route = { // 路由元信息
			name: '',
			path: '',
		}
		this.afterEach = OPTIONS.afterEach || function (route) {}; // 路由切换成功后回调
		window.addEventListener("hashchange", _this.debounce(function (e) {
			_this.reload();
		}));

		this.reload.call(this); // 首页加载
	}
	push(name, params) {
		window.location.hash = name;
	}
	reload() {
		let _this = this;
		let hash = window.location.hash;
		let value = hash.replace('#', '');
		let path = _this.routes[value];
		if (path) {
			_this.route.name = value;
			_this.route.path = path;

			_this.afterEach(_this.route);

			_this.index = value;

		} else {
			window.location.hash = _this.index;
		}
	}
	debounce(fn, delay = 100) {
		let timer;
		return function () {
			let th = this;
			let args = arguments;
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => {
				timer = null;
				fn.apply(th, args);
			}, delay);
		};
	}
}